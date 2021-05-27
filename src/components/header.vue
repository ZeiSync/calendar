<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mx-auto px-2">
    <div class="relative flex items-center justify-between h-16">
      <div
        class="flex items-center justify-center sm:items-stretch sm:justify-start"
      >
        <button
          class="btn btn-sidebar bg-bondi-blue rounded-full text-gallery p-2 mr-2 focus:outline-none"
          @click="store.dispatch('calendar/changeSideBarStatus', !open)"
        >
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-shrink-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="hidden lg:block h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
          </svg>
          <div class="hidden lg:block text-sinbad font-semibold text-2xl">
            Calendar
          </div>
        </div>
      </div>
      <div class="hidden lg:flex items-center w-1/3 justify-between">
        <!-- Current date -->
        <button class="bg-bondi-blue px-4 h-8 rounded-sm text-gallery">
          Today
        </button>
        <div class="flex">
          <button class="focus:outline-none">
            <ChevronLeftIcon class="h-6 w-6 mr-2" aria-hidden="true" />
          </button>
          <button class="focus:outline-none">
            <ChevronRightIcon class="h-6 w-6 ml-2" aria-hidden="true" />
          </button>
        </div>
        <span class="text-2xl">{{ today }}</span>
        <button></button>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      >
        <button
          class="bg-bondi-blue p-1 rounded-full text-gallery hover:text-white focus:outline-none"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Profile dropdown -->
        <Menu as="div" class="ml-3 relative">
          <div>
            <MenuButton
              class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >Settings</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  @click="logout"
                  >Log out</a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, nextTick } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  BellIcon,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/vue/outline";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Header",
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MenuIcon
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const open = computed(() => store.state.calendar.isOpenSideBar);
    const today = computed(() => store.state.calendar.monthAndYear);

    const logout = () => {
      store.dispatch("auth/logout");
      nextTick(() => {
        router.push("login");
      });
    };
    return {
      logout,
      store,
      open,
      today
    };
  }
});
</script>