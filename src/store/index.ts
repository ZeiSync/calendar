import moment from 'moment';
import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: {
    calendar: {
      namespaced: true,
      state: () => ({
        daysInMonth: [],
        monthAndYear: moment().format("MMMM, YYYY"),
        currentDate: moment(),
        isOpenSideBar: true,
        isOpenEventModal: false,
        events: [],
      }),
      getters: {
        currentDate(state) {
          return state.currentDate;
        },
      },
      mutations: {
        updateDaysInMonth(state, days) {
          state.daysInMonth = days;
        },
        updateCurrentDate(state, date) {
          state.currentDate = date;
        },
        updateSideBarStatus(state, status) {
          state.isOpenSideBar = status;
        },
        updateMonthAndYear(state, date) {
          state.monthAndYear = date;
        },
        updateEventModalStatus(state, status) {
          state.isOpenEventModal = status
        }

      },
      actions: {
        incrementTheMonth({ commit }, { date, num }) {
          commit('updateMonthAndYear', moment(date).add(num, 'month').format("MMMM, YYYY"));
        },
        decrementTheMonth({ commit }, { date, num }) {
          commit('updateMonthAndYear', moment(date).subtract(num, 'month').format("MMMM, YYYY"));
        },
        getDaysInMonth({ commit, rootGetters }, { date }) {
          const firstDateOfMonth = moment(date).startOf('month');
          const endDateOfMonth = moment(date).endOf('month');
          const days = [...Array.from(
            Array(endDateOfMonth.date()).keys(),
            (day) => {
              return {
                day: day + 1,
                month: moment(date).month() + 1,
                year: moment(date).year(),
                isPer: false,
                isNext: false,
                events: [],
              }
            }
          )];

          for (let i = 1; i < firstDateOfMonth.day(); i++) {
            days.unshift({
              day: moment(date).subtract(i, 'day').date(),
              month: moment(date).month(),
              year: moment(date).subtract(1, 'month').year(),
              isPer: true,
              isNext: false,
              events: []
            })
          }

          const daysInMonth: any[] = [
            ...days,
            ...Array.from(
              Array(42 - days.length).keys(),
              (day) => {
                return {
                  day: day + 1,
                  month: moment(date).add(2, 'month').month(),
                  year: moment(date).add(1, 'month').year(),
                  isPer: false,
                  isNext: true,
                  events: [],
                }
              }
            )
          ];
          const userEvents = rootGetters['auth/getUserEvents'];
          if (userEvents && userEvents.length > 0) {
            // check event is in range of daysInMonth
            const startRange = moment(`${daysInMonth[0].day}-${daysInMonth[0].month}-${daysInMonth[0].year}`, 'DD-MM-YYYY');
            const endRange = moment(`${daysInMonth[daysInMonth.length - 1].day}-${daysInMonth[daysInMonth.length - 1].month}-${daysInMonth[daysInMonth.length - 1].year}`, 'DD-MM-YYYY');

            const eventFiltered = userEvents.filter((event: any) => {
              if (moment(event.date).isSameOrAfter(startRange) && moment(event.date).isSameOrBefore(endRange)) {
                return true;
              }
              return false;
            });

            // optimine this 
            eventFiltered.forEach((event: any) => {
              const date: number[] = moment(event.date).toArray();
              daysInMonth.forEach((day: any, idx: number) => {
                if (day.year === date[0] && day.month === date[1] + 1 && day.day === date[2]) {
                  daysInMonth[idx].events.push({ ...event, time: moment(event.date).format('HH:mm'), detail: moment(event.date).format('LLL') });
                }
              })
            });
          }
          commit('updateDaysInMonth', daysInMonth);
        },
        updateCurrentDate({ commit, getters, dispatch }, { date }) {
          const month = moment(getters.monthAndYear).month();
          const year = moment(getters.monthAndYear).year();
          if (moment([year, date.month]).diff([year, month], "month", true) > 0) {
            dispatch('incrementTheMonth', { date: getters.monthAndYear, num: 1 });
          }
          if (moment([year, date.month]).diff([year, month], "month", true) < 0) {
            dispatch('decrementTheMonth', { date: getters.monthAndYear, num: 1 });
          }

          commit('updateCurrentDate', moment(`${date.day}-${date.month + 1}-${year}`, "DD-MM-YYYY"))
        },
        changeSideBarStatus({ commit }, status) {
          commit('updateSideBarStatus', status);
        },
        changeEventModalStatus({ commit }, status) {
          commit('updateEventModalStatus', status);
        }
      },
    },
    auth: {
      namespaced: true,
      state: () => ({
        isLogin: localStorage.getItem('token') !== null,
        token: "",
        user: ""
      }),
      getters: {
        getUserToken(state) {
          return state.token;
        },
        getUser(state) {
          return state.user;
        },
        getUserEvents(state) {
          return state.user.events;
        }
      },
      mutations: {
        updateToken(state, newToken) {
          state.token = newToken
        },
        updateUser(state, user) {
          state.user = user;
        },
        updateUserEvents(state, userEvents) {
          state.user.events = userEvents;
        },
        updateLoginStatus(state, status) {
          state.isLogin = status;
        }
      },
      actions: {
        login({ commit }, { token, user }) {
          commit('updateToken', token.accessToken);
          commit('updateUser', user);
          commit('updateLoginStatus', true);
        },
        logout({ commit }) {
          localStorage.removeItem("token")
          commit('updateToken', "");
          commit('updateUser', "");
          commit('updateLoginStatus', false);
        },
        updateUserEvents({ commit }, userEvents) {
          commit('updateUserEvents', userEvents.events);
        }
      }
    }
  },
  plugins: [createPersistedState({
    paths: ['auth']
  })]
})
