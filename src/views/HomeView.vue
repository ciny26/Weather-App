<template>
  <div class="home flex flex-col items-center py-4">
    <div class="input_cont w-1/2 relative">
      <input
        type="search"
        name=""
        id="search-inp"
        placeholder="Enter a city name"
        class=" w-full focus:outline-none bg-transparent border-b focus:border-weather-color-secondly focus:shadow-[0px_1px_0_0_#004E71] text-white"
        v-model="searchQuery"
        @input="getCities"
      />
      <div v-if="city" class="suggest-city p-1 bg-white h-7 w-full hover:bg-weather-color-secondly hover:text-white cursor-pointer" 
      @click="CityView">
        {{ city.name}} ,{{ city.country}}
      </div>
      <div v-if="noMatchingCities" class="suggest-city p-1 bg-white h-fit w-full
       hover:bg-weather-color-secondly hover:text-white cursor-pointer">
      There is no matching cities</div>
      
  </div>
  <savedCities></savedCities>
  </div>
  
</template>

<script>
import axios from 'axios';
import SavedCities from './savedCities.vue';
import { API_KEY } from '@/API/api';
export default {
  name: 'HomeView',
  components:{
  SavedCities,
},
  data() {
    return {
      searchQuery: '',
      city: null,
      noMatchingCities: false,
      
      
      

    };
  },
  methods: {
    async getCities() {
      try {
        if (this.searchQuery !== '') {
          const cities = await axios.get(`https://api.api-ninjas.com/v1/city?name=${this.searchQuery}&X-Api-Key=${API_KEY}`);
          if (cities.data.length > 0) {
            this.cityErrorServer = false
            this.noMatchingCities = false
            this.city = cities.data[0];
            console.log('City:', this.city);
          } else {
            this.noMatchingCities = true
            this.city = null;
          }
        }
        else {
        // Clear the city when the input is empty
        this.noMatchingCities = false
        this.city = null;
      }
      } catch (error) {
                console.log(error)
                

            
      }
    },
    async CityView() {
      if (this.city) {
        try {
          
          
          this.$router.push(
            {
              name:'cityView',
              params:{city: this.city.name , country:this.city.country, 
                lat:this.city.latitude , lon:this.city.longitude}
            }
          )
        } catch (error) {
          this.weatherErrorServer = true
          console.log(error);
        }
      }
    },
  },
};
</script>

<style>
  :root{
    --scroll-bar-height: 4px
}
</style>
