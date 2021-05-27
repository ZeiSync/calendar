<template>
  <div class="flex items-center justify-center">
    <div
      class="max-w-sm border-t shadow-sm p-5 bg-white dark:bg-gray-80"
    >
      <div class="px-1 flex items-center justify-between leading-8">
        <h1 class="text-base font-medium text-gray-800 dark:text-gray-100">
          {{ currentMonth }}
        </h1>
        <div class="flex items-center text-gray-800 dark:text-gray-100">
          <button class="focus:outline-none" @click="decrementTheMonth(currentMonth, 1)">
            <ChevronLeftIcon class="h-5 w-5 mr-2" aria-hidden="true" />
          </button>
          <button  class="focus:outline-none" @click="incrementTheMonth(currentMonth, 1)">
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
          class="w-10 py-2 rounded-full hover:bg-bondi-blue hover:text-gallery focus:outline-none"
          :class="{
            'text-bondi-blue': date.isPer || date.isNext,
            isActive:
              date.day === currentDate.date() &&
              date.month === currentDate.month() + 1,
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
import { defineComponent, watch, onBeforeMount, computed } from "vue";
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

    const currentDate = computed(() => store.state.calendar.currentDate);
    const currentMonth = computed(() => store.state.calendar.monthAndYear);
    const daysInMonth = computed(() => store.state.calendar.daysInMonth);

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
  background-color: #393E46;
  color: #EEEEEE;
}
</style>