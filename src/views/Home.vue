<template>
  <div class="home">
    <Header />
    <SideBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header.vue"; // @ is an alias to /src
import SideBar from "@/components/sidebar/index.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header,
    SideBar,
  }
});
</script>
