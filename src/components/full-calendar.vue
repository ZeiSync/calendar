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
                class="border-r border-b px-4 pt-2 h-1/6 w-1/7 overflow-y-auto"
                :class="{
                  'text-bondi-blue': date.isPer || date.isNext,
                }"
              >
                <div class="flex justify-between items-center">
                  <span
                    :class="{
                      'isActive rounded-full px-2 py-1':
                        date.day === currentDate.date() &&
                        date.month === currentDate.month() + 1,
                    }"
                  >
                    {{ date.day }}
                  </span>

                  <PlusCircleIcon
                    class="h-4 w-4"
                    @click="
                      updateModalStatus(!open);
                      datePicked = `${date.day}-${date.month}-${date.year}`;
                    "
                  />
                </div>

                <!-- render event -->

                <div v-if="date.events.length > 0">
                  <PopoverGroup>
                    <Popover v-for="(event, idx) in date.events" :key="idx">
                      <PopoverButton
                        :class="[
                          Math.floor(Math.random() * 2)
                            ? 'bg-bondi-blue text-bright-gray'
                            : 'bg-bright-gray text-gallery',
                        ]"
                        class="flex justify-between w-full rounded-sm px-1 flex-wrap mb-1 focus:outline-none hover:bg-sinbad mt-1"
                        ><span>
                          {{ event.title }}
                        </span>
                        <span>
                          {{ event.time }}
                        </span>
                      </PopoverButton>
                      <PopoverPanel
                        class="absolute z-10 px-4 mt-2 bg-gallery rounded-sm shadow-lg"
                      >
                        <div class="overflow-hidden rounded-md py-4 px-2 text-bright-gray max-w-md">
                          <p class="text-2xl w-full">{{ event.title }}</p>
                          <p>{{ event.detail }}</p>
                          <div class="mt-2 mb-4">{{ event.description }}</div>
                          <div class="w-full flex justify-end">
                            <button
                              class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              @click="confirmDeleteEvent(event)"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  </PopoverGroup>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <EventModal :datePicked="datePicked" />
  </div>
</template>

<script lang='ts'>
import { useStore } from "vuex";
import { computed, defineComponent, ref, watch } from "vue";
import calendar from "@/composables/calendar";
import fullCalendar from "@/composables/full-calendar";
import EventModal from "./modal.vue";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverGroup
} from "@headlessui/vue";
import { PlusCircleIcon } from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    EventModal,
    Popover,
    PopoverButton,
    PopoverPanel,
    PopoverGroup,
    PlusCircleIcon
  },
  setup() {
    const store = useStore();
    const dayinWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const { incrementTheMonth, decrementTheMonth } = calendar();
    const { updateModalStatus, deleteEvent } = fullCalendar();

    const monthAndYear = computed(() => store.state.calendar.monthAndYear);
    const daysInMonth = computed(() => store.state.calendar.daysInMonth);
    const open = computed(() => store.state.calendar.isOpenEventModal);
    const currentDate = computed(() => store.state.calendar.currentDate);
    const datePicked = ref("");

    watch(daysInMonth, () => {
      console.log(daysInMonth.value);
    })

    const confirmDeleteEvent = (event: any) => {
      if(confirm('Are you sure delete this event: ' + event.title)) {
        deleteEvent(event._id);
      }
    }

    return {
      confirmDeleteEvent,
      open,
      datePicked,
      daysInMonth,
      dayinWeek,
      monthAndYear,
      currentDate,
      incrementTheMonth,
      decrementTheMonth,
      updateModalStatus
    };
  }
});
</script>

<style scoped>
.isActive {
  background-color: #393e46;
  color: #eeeeee;
}
</style>