<template>
  <div class="home h-screen">
    <Header />
    <div class="flex justify-between">
      <SideBar />
      <FullCalendar :key="key"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import Header from "@/components/header.vue"; // @ is an alias to /src
import SideBar from "@/components/sidebar/index.vue";
import FullCalendar from "@/components/full-calendar.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    Header,
    SideBar,
    FullCalendar
  },
  setup() {
    const store = useStore();
    const isLogin = computed(() => store.state.auth.isLogin);
    const router = useRouter();

    watch(isLogin, () => {
      if(!isLogin.value)
      router.push('login');
    });
  }
});
</script>
