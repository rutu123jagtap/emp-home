<script setup>
import { RouterView } from "vue-router";
import Navbar from './components/employee/Navbar.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import Loader from "./views/Loader.vue";

const route = useRoute();
const showNavbar = ref(route.meta.showNavbar);

watch(() => route.meta.showNavbar, (newValue) => {
  showNavbar.value = newValue;
}); 
</script>

<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <Loader />
    <RouterView />
  </div>
</template>

<style scoped>

</style>
