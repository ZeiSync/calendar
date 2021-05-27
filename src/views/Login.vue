<template>
  <div class="h-screen flex justify-center items-center bg-gallery flex-col">
    <div
      class="absolute top-10 right-10 flex flex-col sm:flex-row sm:items-center bg-white rounded-md py-5 pr-8 sm:pr-6"
    >
      <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
        zei@gmail.com | 123123
      </div>
    </div>
    <div
      class="absolute bottom-10 left-10 flex flex-col sm:flex-row sm:items-center bg-white rounded-md py-5 pl-6 pr-8 sm:pr-6"
      v-show="showError"
    >
      <div
        class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0"
      >
        <div class="text-sm font-medium ml-3 text-red-600">Error</div>
      </div>
      <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
        {{ errorMessage }}
      </div>
      <div
        class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer"
        @click="showError = false"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
    </div>
    <form class="w-96 bg-white p-5 rounded-lg" @submit.prevent="login">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="mb-2 bg-gallery appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter email"
          v-model="email"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="mb-2 bg-gallery appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter password"
          v-model="password"
          required
        />
      </div>

      <div class="flex items-center justify-between mb-5">
        <button
          class="bg-bondi-blue hover:bg-sinbad text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          LOGIN
        </button>
        <a
          class="inline-block align-baseline font-light text-sm text-bondi-blue hover:text-sinbad"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
      <p class="text-center text-md font-light">
        Don't have an account?
        <a class="font-light text-md text-bondi-blue">Create</a>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import api from "../api/index";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const showError = ref(false);
    const isLogin = computed(()=> store.state.auth.isLogin);

    onMounted(() => {
      if(isLogin.value) {
        router.push('/');
      }
    })

    const login = async () => {
      const data = await api.login(email.value, password.value);
      if (
        (data.statusCode && data.statusCode === 400) ||
        data.statusCode === 401
      ) {
        showError.value = true;
        errorMessage.value = (
          data.message.charAt(0).toUpperCase() + data.message.slice(1)
        ).replaceAll("_", " ");
      }
      if(data.token && data.user) {
        store.dispatch('auth/login', data);
        router.push('/');
      }
    };

    watch(email, () => {
      showError.value = false;
    });

    watch(password, () => {
      showError.value = false;
    });

    return {
      showError,
      login,
      email,
      password,
      errorMessage
    };
  }
});
</script>
