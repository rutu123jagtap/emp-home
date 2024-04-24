<script setup>
import { RouterView } from "vue-router";
import Navbar from './components/employee/Navbar.vue';
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>

</style>
