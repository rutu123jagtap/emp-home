// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false,
    
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    
  },
  actions: {
    
  },
  getters: {
    isLoading: state => state.loading,
    
  }
});
