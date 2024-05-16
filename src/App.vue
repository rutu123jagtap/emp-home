<script setup>
import { RouterView } from "vue-router";
import Navbar from './components/employee/Navbar.vue';
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';
import Loader from "./views/Loader.vue";
// import Loader from "./views/Loader.vue";

const route = useRoute();
const showNavbar = ref(false);

watchEffect(() => {
  showNavbar.value = route.meta.showNavbar;
});

// export default {
//     name: 'app',
//     components: {
//       Loading
//     },
//     computed: {
//       ...mapState({
//         isLoading: state => state.isLoading
//       })
//     }
//   }  
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
