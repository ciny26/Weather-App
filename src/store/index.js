import { createStore } from 'vuex'

export default createStore({
  state: {
    savedCities:[],
    cityIsSaved:false
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
    setSavedCities(state){
      state.savedCities = JSON.parse(localStorage.getItem('savedCities'))
    },
     changeCityState(state){
      state.cityIsSaved = true
    } 
  },
  actions: {
  },
  modules: {
  }
})
