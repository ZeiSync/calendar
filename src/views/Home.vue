<template>
  <div class="home h-screen">
    <Header />
    <div class="flex justify-between">
      <SideBar />
      <FullCalendar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header.vue"; // @ is an alias to /src
import SideBar from "@/components/sidebar/index.vue";
import FullCalendar from "@/components/full-calendar.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header,
    SideBar,
    FullCalendar
  }
});
</script>
