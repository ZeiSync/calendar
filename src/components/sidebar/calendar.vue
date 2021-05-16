<template>
  <div class="flex items-center justify-center mt-2">
    <div
      class="max-w-sm w-full rounded-md shadow-lg md:p-8 p-5 bg-white dark:bg-gray-80"
    >
      <div class="px-1 flex items-center justify-between leading-8">
        <h1 class="text-base font-medium text-gray-800 dark:text-gray-100">
          {{ currentMonth }}
        </h1>
        <div class="flex items-center text-gray-800 dark:text-gray-100">
          <button @click="decrementTheMonth(currentMonth, 1)">
            <ChevronLeftIcon class="h-5 w-5 mr-2" aria-hidden="true" />
          </button>
          <button @click="incrementTheMonth(currentMonth, 1)">
            <ChevronRightIcon class="h-5 w-5 ml-2" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div class="flex flex-row mt-6 w-72">
        <div
          v-for="(day, index) in days"
          :key="index"
          class="w-full flex justify-center"
        >
          <p
            class="text-base font-medium text-center text-gray-800 dark:text-gray-100"
          >
            {{ day }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-7 w-72">
        <button
          v-for="(date, index) in daysInMonth"
          :key="index"
          class="w-10 py-2 rounded-full hover:bg-pantone-light hover:text-fog focus:outline-none"
          :class="{
            'text-pantone': date.isPer || date.isNext,
            isActive:
              date.day === currentDate.date() &&
              date.month === currentDate.month(),
          }"
          @click="updateCurrentDate(date)"
        >
          {{ date.day }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, Ref, ref, watch, onBeforeMount, computed } from "vue";
import moment from "moment";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";
import calendar from "@/composables/calendar";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  setup() {
    const store = useStore();
    const { incrementTheMonth, decrementTheMonth, getDaysInMonth, updateCurrentDate } = calendar();
    const days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const currentDate = computed(() => store.state.currentDate);
    const currentMonth = computed(() => store.state.monthAndYear);
    const daysInMonth = computed(() => store.state.daysInMonth);

    onBeforeMount(() => {
      getDaysInMonth(currentMonth.value);
    });

    watch(currentMonth, () => {
      getDaysInMonth(currentMonth.value);
    });
    return {
      store,
      currentDate,
      currentMonth,
      days,
      incrementTheMonth,
      decrementTheMonth,
      daysInMonth,
      updateCurrentDate
    };
  }
});
</script>

<style scoped>
.isActive {
  background-color: #5c8d89;
  color: #f4f9f4;
}
</style>