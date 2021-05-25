<template>
  <TransitionRoot :show="open" >

    <!-- Sliding sidebar -->
    <TransitionChild
      enter="transition ease-in-out duration-300 transform"
      enter-from="-translate-x-full"
      enter-to="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leave-from="translate-x-0"
      leave-to="-translate-x-full"
    >
      <div >
        <Calendar />
      </div>
    </TransitionChild>
  </TransitionRoot>
</template>

<script>
import { defineComponent, computed } from "vue";
import { TransitionChild, TransitionRoot } from "@headlessui/vue";
import Calendar from "@/components/sidebar/calendar.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    TransitionChild,
    TransitionRoot,
    Calendar,
  },
  setup() {
    const store = useStore();
    const open = computed(() => store.state.isOpenSideBar);
    return {
      store,
      open,
    };
  },
});
</script>

<style scoped>
</style>