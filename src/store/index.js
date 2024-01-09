import { createStore } from 'vuex'

export default createStore({
  state: {
    savedCities:[],
    cityIsSaved:null
  },
  getters: {
    getSavedCities(state){
      return state.savedCities
    },
     getCityState(state){
      return state.cityIsSaved
    } 
  },
  mutations: {
    
  },
  actions: {
  },
  modules: {
  }
})
