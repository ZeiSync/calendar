<template>
  <router-view />
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const islogin = computed(() => store.state.auth.isLogin);
    watch(islogin, () => {
      if(!islogin.value) {
        router.push('login');
      }
    });

    onMounted(() => {
      if(!islogin.value) {
        router.push('login');
      }
    })
  }
});
</script>
<style>
</style>
