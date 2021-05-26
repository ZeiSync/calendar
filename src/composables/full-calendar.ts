import { useStore } from 'vuex';
import moment from 'moment';

interface IEvent {
  title: string,
  date: string,
  hour: string,
  minute: string,
  description: string,
}

export default () => {
  const store = useStore();

  const updateModalStatus = (status: boolean): void => {
    store.dispatch('calendar/changeEventModalStatus', status);
  }


  const submitModal = (event: IEvent): void => {
    const { title, date, hour, minute, description } = event;

    if (!title.trim().length || !description.trim().length) {
      return;
    }

    store.dispatch('addUserEvent', {
      title,
      date: moment(moment(`${date} ${hour}:${minute}:00`, 'DD-MM-YYYY HH:mm:ss')).toISOString(),
      description
    })
  }
  return { updateModalStatus, submitModal }
}