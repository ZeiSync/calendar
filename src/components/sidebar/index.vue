<template>
  <TransitionRoot as="template" :show="!open">
    <TransitionChild
      as="template"
      enter="transform transition duration-500 sm:duration-700"
      enter-from="opacity-0 scale-50"
      enter-to="opacity-100 scale-100"
      leave="transform transition duration-500 sm:duration-700"
      leave-from="opacity-100 scale-100"
      leave-to="opacity-0 scale-95"
    >
      <button
        class="absoulute float-left top-4 right-4 p-4 bg-pantone rounded-full text-fog m-5"
        @click="open = true"
      >
        <PlusIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </TransitionChild>
  </TransitionRoot>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed inset-0 overflow-hidden" :open="open">
      <div class="absolute inset-0 overflow-hidden">
        <div class="fixed inset-y-0 left-0 max-w-full flex mt-16">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <div class="relative max-w-md bg-fog">
              <div class="h-full flex flex-col py-6 bg-white">
                <div class="flex justify-between px-4 sm:px-6">
                  <button
                    class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    @click="open = false"
                  >
                    <span class="sr-only">Close panel</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div class="relative flex-1 px-4 sm:px-6">
                  <!-- Replace with your content -->
                  <Calendar />
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref, defineComponent } from "vue";
import { TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XIcon, PlusIcon } from "@heroicons/vue/outline";
import Calendar from "@/components/sidebar/calendar.vue";

export default defineComponent({
  components: {
    TransitionChild,
    TransitionRoot,
    XIcon,
    PlusIcon,
    Calendar,
  },
  setup() {
    const open = ref(true);

    return {
      open,
    };
  },
});
</script>