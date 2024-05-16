import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import store from './views/store.js';
import '@fortawesome/fontawesome-free/css/all.css'

// import Loader from './views/Loader.vue';

createApp(App).use(router).use(store).mount('#app')
