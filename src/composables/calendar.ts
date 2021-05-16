import moment, { MomentInput } from 'moment';
import { useStore } from 'vuex';


export default () => {
  const store = useStore();

  const incrementTheMonth = (date: MomentInput, num: number) => {
    store.dispatch('incrementTheMonth', { date, num })
  }

  const decrementTheMonth = (date: MomentInput, num: number) => {
    store.dispatch('decrementTheMonth', { date, num });
  }

  const getDaysInMonth = (date: MomentInput) => {
    store.dispatch('getDaysInMonth', { date });
  }

  const updateCurrentDate = (date: MomentInput) => {
    store.dispatch('updateCurrentDate', { date });
  }
  return { incrementTheMonth, decrementTheMonth, getDaysInMonth, updateCurrentDate }
}