import { useStore } from 'vuex';
import moment from 'moment';
import api from '../api/index';
import { useRouter } from 'vue-router';
interface IEvent {
  title: string,
  date: string,
  hour: string,
  minute: string,
  description: string,
}

export default () => {
  const store = useStore();
  const router = useRouter();

  const updateModalStatus = (status: boolean): void => {
    store.dispatch('calendar/changeEventModalStatus', status);
  }


  const submitModal = async (event: IEvent) => {
    const { title, date, hour, minute, description } = event;

    if (!title.trim().length || !description.trim().length) {
      return;
    }

    const data = await api.postEvent(title, moment(moment(`${date} ${hour}:${minute}:00`, 'DD-MM-YYYY HH:mm:ss')).toISOString(true), description);
    store.dispatch('auth/updateUserEvents', data);
    store.dispatch('calendar/changeEventModalStatus', false);
    store.dispatch('calendar/getDaysInMonth', { date: store.state.calendar.monthAndYear });
  }


  const deleteEvent = async (id: any) => {
    // if can check is this objectId, cuz i using mongodb
    const data = await api.deleteEvent(id);
    console.log(data);
    store.dispatch('auth/updateUserEvents', data);
    store.dispatch('calendar/getDaysInMonth', { date: store.state.calendar.monthAndYear });
  }
  return { updateModalStatus, submitModal, deleteEvent }
}