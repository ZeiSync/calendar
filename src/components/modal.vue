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

        <!-- This element is to trick the browser into centering the modal contents. -->
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
            <form class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <!-- <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <ExclamationIcon
                    class="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    Deactivate account
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action cannot
                        be undone.
                      </p>
                  </div>
                </div>
              </div> -->
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="eventTitle"
              >
                Event Title
              </label>
              <input
                class="m-2 bg-gallery appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="eventTitle"
                type="text"
                placeholder="Enter title"
              />
              <div class="grid grid-cols-3 gap-3 m-2">
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
                    :value="currentDate.format('DD-MM-YYYY')"
                    class="w-full bg-gallery appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
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
                  />
                </div>
              </div>

              <textarea class="bg-gallery rounded-sm" name="description" id="" cols="60" rows="5"></textarea>
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
                type="button"
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

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import fullCalendar from "@/composables/full-calendar";
import SelectMenu from "./select-menu";

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    SelectMenu,
  },
  setup() {
    const store = useStore();
    const { updateModalStatus } = fullCalendar();
    const currentDate = computed(() => store.state.currentDate);
    const open = computed(() => store.state.isOpenEventModal);

    const hourInDay = Array.from({ length: 24 }, (_, i) => i + 1).join().split(',');
    const minuteInDay = Array.from({ length: 24 }, (_, i) => i + 1).join().split(',');
    return {
      open,
      updateModalStatus,
      hourInDay,
      minuteInDay,
      currentDate,
    };
  },
});
</script>