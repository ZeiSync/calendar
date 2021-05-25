<template>
  <div class="bg-white">
    <div class="">
      <div class="shadow overflow-hidden border-t">
        <div class="flex items-center justify-between py-2 px-6">
          <div>
            <span class="text-lg font-bold text-gray-800">{{
              monthAndYear
            }}</span>
          </div>
        </div>
        <div class="-mx-1 -mb-1">
          <div class="flex flex-wrap -mb-8" style="margin-bottom: -40px">
            <template v-for="(day, idx) in dayinWeek" :key="idx">
              <div class="px-2 py-2 w-1/7">
                <div
                  class="text-sm uppercase tracking-wide font-bold text-center"
                  :class="{
                    'text-bondi-blue': day.isPer || day.isNext,
                  }"
                >
                  {{ day }}
                </div>
              </div>
            </template>
          </div>

          <div class="flex flex-wrap border-t border-l">
            <template v-for="(date, idx) in daysInMonth" :key="idx">
              <div
                class="border-r border-b px-4 pt-2 h-32 w-1/7"
                @click="updateModalStatus(!open)"
                :class="{
                  'text-bondi-blue': date.isPer || date.isNext,
                }"
              >
                <span
                  :class="{
                    'isActive rounded-full px-2 py-1':
                      date.day === currentDate.date() &&
                      date.month === currentDate.month(),
                  }"
                >
                  {{ date.day }}
                </span>
              </div>
            </template>
            <!-- <template v-for="(date, dateIndex) in no_of_days" :key="dateIndex">
              <div class="px-4 pt-2 border-r border-b relative h-32 w-1/7">
                <div
                  @click="showDayModal(date)"
                  v-text="date"
                  class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100"
                  :class="{
                    'bg-blue-500 text-white': isToday(date) === true,
                    'text-gray-700 hover:bg-blue-200': isToday(date) === false,
                  }"
                ></div>
                <div class="overflow-y-auto mt-1 h-20">
                  <div
                      class="absolute top-0 right-0 mt-2 mr-2 inline-flex items-center justify-center rounded-full text-sm w-6 h-6 bg-gray-700 text-white leading-none"
                      x-show="events.filter(e => e.event_date === new Date(year, month, date).toDateString()).length"
                      x-text="events.filter(e => e.event_date === new Date(year, month, date).toDateString()).length"></div>

                  <template
                    v-for="(event, idx) in events.filter(
                      (e) =>
                        new Date(e.event_date).toDateString() ===
                        new Date(year, month, date).toDateString()
                    )"
                    :key="idx"
                  >
                    <div
                      class="px-2 py-1 rounded-lg mt-1 overflow-hidden border"
                      :class="{
                        'border-blue-200 text-blue-800 bg-blue-100':
                          event.event_theme === 'blue',
                        'border-red-200 text-red-800 bg-red-100':
                          event.event_theme === 'red',
                        'border-yellow-200 text-yellow-800 bg-yellow-100':
                          event.event_theme === 'yellow',
                        'border-green-200 text-green-800 bg-green-100':
                          event.event_theme === 'green',
                        'border-purple-200 text-purple-800 bg-purple-100':
                          event.event_theme === 'purple',
                      }"
                    >
                      <p
                        v-text="event.event_title"
                        class="text-sm truncate leading-tight"
                      />
                    </div>
                  </template>
                </div>
              </div>
            </template> -->
          </div>
        </div>
      </div>
    </div>
    <EventModal />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import calendar from "@/composables/calendar";
import fullCalendar from "@/composables/full-calendar";
import EventModal from "./modal";

export default defineComponent({
  components: {
    EventModal,
  },
  setup() {
    const store = useStore();
    const dayinWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const { incrementTheMonth, decrementTheMonth } = calendar();
    const { updateModalStatus } = fullCalendar();

    const monthAndYear = computed(() => store.state.monthAndYear);
    const daysInMonth = computed(() => store.state.daysInMonth);
    const open = computed(() => store.state.isOpenEventModal);
    const currentDate = computed(() => store.state.currentDate);

    return {
      daysInMonth,
      open,
      dayinWeek,
      monthAndYear,
      currentDate,
      incrementTheMonth,
      decrementTheMonth,
      updateModalStatus,
    };
  },
});
</script>

<style scoped>
.isActive {
  background-color: #393e46;
  color: #eeeeee;
}
</style>