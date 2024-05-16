<template>
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
  setup() {
    const store = useStore();

    // Define the getter function for isLoading
    const isLoading = computed(() => store.getters.isLoading);

    return {
      isLoading, // Return the computed property
    };
  },
};
  </script>
  
  <style scoped>
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .loader {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  