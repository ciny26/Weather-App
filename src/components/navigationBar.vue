<template>
    <header class=" border-b-2 border-weather-color-secondly">
      <nav class="bg-weather-color-primary text-white flex flex-row justify-around items-center h-9">
        <router-link to="/" class="flex flex-row">
          <i class="far fa-sun flex items-center pr-1 "></i>
          <div class="flex items-center ">Weather</div>
        </router-link>
        <div class="icons flex flex-row">
          <i class="fas fa-info flex justify-center text-xs text-weather-color-primary
           bg-white h-4 w-4 rounded-full cursor-pointer hover:text-white hover:bg-weather-color-secondly" @click="showModal"></i>
          <i v-if="existed !== true" class=" plus fa-solid fa-plus cursor-pointer text-xs ml-1 " @click="addCity"></i>
        </div>
        
      </nav>
      <base-modal :modalAppearence="modalAppearence" v-show="modalAppearence" @eventToggleModal="handleChildEvent">
        <h1 class="font-bold">About</h1>
        <p class=" text-sm">This is a web app to get the weather information in any city in the world.</p>
        <h1 class="font-bold">How it works</h1>
        <ul class=" text-sm">
          <li class="how-item">1. In the search field type the name of the city that you want to discover it's weather.</li>
          <li class="how-item">2. After the result came up click on the chosing one.</li>
          <li class="how-item">3. You can save the city that you chose so you don't have to look at it anymore.</li>
        </ul>
        <h1 class="font-bold">Delete</h1>
        <p class=" text-sm">If you want to delete a city from the list that you have just click the 
          delete button on the right side of the city container than confirm the delete.
        </p>
      </base-modal>    
    </header>
  </template>
  
  <script>
  import baseModal from './baseModal.vue';
  import {uid} from 'uid'
  export default {
    components:{
      baseModal
    },
    data() {
      return {
        modalAppearence:false,
        savedCities:[],
        existed:null
      }
    },
    mounted() {
      
        this.checkIfExisted()
      
    },
    methods: {
      showModal(){
        this.modalAppearence = !this.modalAppearence
      },
      handleChildEvent(data){
        this.modalAppearence = data 
      },
      addCity(){
        if (localStorage.getItem('savedCities')){
          this.savedCities = JSON.parse(localStorage.getItem('savedCities'))
        }
        const locationObj = {
          id:uid(),
          city:this.$route.params.city,
          country:this.$route.params.country,
          cord:{
            lat: this.$route.params.lat,
            lon: this.$route.params.lon,
          },
          
        }
        
        console.log(locationObj)
        this.savedCities.push(locationObj)
        localStorage.setItem('savedCities' , JSON.stringify(this.savedCities))
        this.checkIfExisted()
      },
      checkIfExisted(){
        if (localStorage.getItem('savedCities')) {
          const objectsArray = JSON.parse(localStorage.getItem('savedCities'))
          objectsArray.forEach((obj)=>{
            if(this.$route.params.lat === obj.cord.lat &&
            this.$route.params.lon === obj.cord.lon){
              this.existed = true
              this.$store.commit('changeCityState')
            }
          })
        }
        
      }
    },
  };
  </script>
  <style>
    h1{
      margin-top: 0.75rem;
    }
  </style>
  