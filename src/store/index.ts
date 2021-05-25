import moment from 'moment';
import { createStore } from 'vuex';

export default createStore({
  state: {
    daysInMonth: [],
    monthAndYear: moment().format("MMMM, YYYY"),
    currentDate: moment(),
    isOpenSideBar: true,
    isOpenEventModal: false,
    eventData: {},
  },
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
    getDaysInMonth({ commit }, { date }) {
      const firstDateOfMonth = moment(date).startOf('month');
      const endDateOfMonth = moment(date).endOf('month');
      const days = [...Array.from(
        Array(endDateOfMonth.date()).keys(),
        (day) => {
          return {
            day: day + 1,
            month: moment(date).month(),
            year: moment(date).year(),
            isPer: false,
            isNext: false
          }
        }
      )];

      for (let i = 1; i < firstDateOfMonth.day(); i++) {
        days.unshift({
          day: moment(date).subtract(i, 'day').date(),
          month: moment(date).subtract(1, 'month').month(),
          year: moment(date).subtract(1, 'month').year(),
          isPer: true,
          isNext: false
        })
      }

      commit('updateDaysInMonth', [
        ...days,
        ...Array.from(
          Array(42 - days.length).keys(),
          (day) => {
            return {
              day: day + 1,
              month: moment(date).add(1, 'month').month(),
              year: moment(date).add(1, 'month').year(),
              isPer: false,
              isNext: true
            }
          }
        )
      ]);
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
  modules: {
  }
})
