import { useStore } from 'vuex';


export default () => {
  const store = useStore();

  const updateModalStatus = (status: boolean) => {
    store.dispatch('changeEventModalStatus', status);
  }
  return { updateModalStatus }
}