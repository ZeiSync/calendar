<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      static
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="updateModalStatus(false)"
      :open="open"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <form class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="eventTitle"
              >
                Event Title
              </label>
              <input
                class="mb-2 bg-gallery appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="eventTitle"
                type="text"
                placeholder="Enter title"
                v-model="event.title"
              />
              <div class="grid grid-cols-3 gap-3 mb-2">
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="currentDate"
                  >
                    Date
                  </label>
                  <input
                    readonly
                    id="currentDate"
                    v-model="event.date"
                    class="w-full bg-gallery appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="hour"
                  >
                    Hour
                  </label>
                  <SelectMenu
                    id="hour"
                    :currentTime="currentDate.hour()"
                    :data="hourInDay"
                    v-model="event.hour"
                  />
                </div>
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="minute"
                  >
                    Minute
                  </label>
                  <SelectMenu
                    id="minute"
                    :currentTime="currentDate.minute()"
                    :data="minuteInDay"
                    v-model="event.minute"
                  />
                </div>
              </div>

              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="description"
              >
                Description
              </label>
              <textarea
                id="description"
                class="bg-gallery rounded-sm w-full p-2"
                name="description"
                rows="5"
                v-model="event.description"
              ></textarea>
            </form>
            <div
              class="bg-bondi-blue px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="updateModalStatus(false)"
              >
                Add Event
              </button>
              <button
                type="submit"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="updateModalStatus(false)"
                ref="cancelButtonRef"
              >
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRef, watch } from "vue";
import { useStore } from "vuex";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import fullCalendar from "@/composables/full-calendar";
import SelectMenu from "@/components/select-menu.vue";

export default defineComponent({
  props: {
    datePicked: String,
  },
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    SelectMenu,
  },
  setup(props) {
    const store = useStore();
    const { updateModalStatus } = fullCalendar();
    const currentDate = computed(() => store.state.currentDate);
    const open = computed(() => store.state.isOpenEventModal);

    const hourInDay = Array.from({ length: 24 }, (_, i) => i + 1)
      .join()
      .split(",");
    const minuteInDay = Array.from({ length: 24 }, (_, i) => i + 1)
      .join()
      .split(",");
    const datePicked = toRef(props, 'datePicked');
    const event = reactive({
      title: '',
      date: datePicked.value,
      hour: currentDate.value.hour().toString(),
      minute: currentDate.value.minute().toString(),
      description: ''
    });
    
    watch(datePicked, () => {
      event.date = datePicked.value;
    })

    return {
      event,
      open,
      updateModalStatus,
      hourInDay,
      minuteInDay,
      currentDate,
    };
  },
});
</script>