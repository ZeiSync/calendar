import moment from 'moment';
import { createStore } from 'vuex';

export default createStore({
  state: {
    daysInMonth: [],
    monthAndYear: moment().format("MMMM, YYYY"),
    currentDate: moment(),
  },
  getters: {
    currentDate(state) {
      return state.currentDate;
    }
  },
  mutations: {
    updateDaysInMonth(state, days) {
      state.daysInMonth = days;
    },
    updateCurrentDate(state, date) {
      state.currentDate = date;
    }
  },
  actions: {
    incrementTheMonth({ commit }, { date, num }) {
      commit(this.state.monthAndYear = moment(date).add(num, 'month').format("MMMM, YYYY"));
    },
    decrementTheMonth({ commit }, { date, num }) {
      commit(this.state.monthAndYear = moment(date).subtract(num, 'month').format("MMMM, YYYY"));
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
            isPer: false,
            isNext: false
          }
        }
      )];

      for (let i = 1; i < firstDateOfMonth.day(); i++) {
        days.unshift({
          day: moment(date).subtract(i, 'day').date(),
          month: moment(date).subtract(1, 'month').month(),
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
  },
  modules: {
  }
})
