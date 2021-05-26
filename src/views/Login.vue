<template>
  <div class="h-screen flex justify-center items-center bg-gallery">
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
import { defineComponent, ref } from "vue";
import api from "../api/index";
export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const login = async () => {
      const data = await api.login(email.value, password.value);
      console.log(data);
    };
    return {
      login,
      email,
      password,
      errorMessage
    };
  }
});
</script>
