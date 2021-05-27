import { MomentInput } from 'moment';
import { useStore } from 'vuex';


export default () => {
  const store = useStore();

  const incrementTheMonth = (date: MomentInput, num: number) => {
    store.dispatch('calendar/incrementTheMonth', { date, num })
  }

  const decrementTheMonth = (date: MomentInput, num: number) => {
    store.dispatch('calendar/decrementTheMonth', { date, num });
  }

  const getDaysInMonth = (date: MomentInput) => {
    store.dispatch('calendar/getDaysInMonth', { date });
  }

  const updateCurrentDate = (date: MomentInput) => {
    store.dispatch('calendar/updateCurrentDate', { date });
  }
  return { incrementTheMonth, decrementTheMonth, getDaysInMonth, updateCurrentDate }
}