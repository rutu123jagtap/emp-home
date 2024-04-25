<script setup>
import { RouterView } from "vue-router";
import Navbar from './components/employee/Navbar.vue';
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';

const route = useRoute();
const showNavbar = ref(false);

watchEffect(() => {
  showNavbar.value = route.meta.showNavbar;
});
</script>

<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <RouterView />
  </div>
</template>

<style scoped>

</style>
