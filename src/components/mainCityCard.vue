<template>
    <div class="city-cont flex flex-row justify-between  
    items-center my-4 p-2 bg-weather-color-secondly text-white cursor-pointer" @click="cityDetails()">
        <div class="place text-xl w-2/5">
            <div class="city text-xl">{{ cityName }}</div>
            <div class="country text-sm">{{ savedCity.country }}</div>
        </div>
        
        <div class="temp text-center">
            <div class="current-temp text-sm">Temp: {{ Math.round((currentCityWeather- 32) * 5/9)  }}&deg;</div>
            <div class="Max&Min-temp text-xs">Max: {{ Math.round((cityTempMax- 32) * 5/9)     }}&deg;&nbsp;&nbsp;&nbsp;
                   Min: {{ Math.round((cityTempMin- 32) * 5/9)  }}&deg;</div>
        </div>
        <div class="delete text-center bg-sky-700 px-2" @click.stop="deleteCity">
            <i class="fa-solid fa-trash cursor-pointer text-xs "></i>
            <div class=" text-sm ">Delete</div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';
export default {
    created(){
        this.getsavedData()
    },
    data() {
        return {
            cityName:'',
            currentCityWeather:null,
            cityTempMax:null,
            cityTempMin:null,
            savedCities:[]
        }
    },
    props:['savedCity'],
    methods: {
        async getsavedData(){
             try {
                const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.savedCity.cord.lat},${this.savedCity.cord.lon}
                ?key=5HBHGYLKZT5KG7H7V5HGKFFED`);
                const cityWeather = response.data
                this.cityName = this.savedCity.city
                this.currentCityWeather = cityWeather.currentConditions.temp
                this.cityTempMax = cityWeather.days[0].tempmax
                this.cityTempMin = cityWeather.days[0].tempmin
            } catch (error) {
                console.log(error)
            } 
        },
        cityDetails(){
             this.$router.push(
            {
              name:'cityView',
              params:{city: this.savedCity.city , country:this.savedCity.country, 
                lat:this.savedCity.cord.lat , lon:this.savedCity.cord.lon}
            }
          ) 
          
        },
        deleteCity(){
            // Emit the delete-city event with the city name as the payload
            this.$emit('delete-city', this.savedCity.city);
        }
    },
}
</script>
<style scoped>
.delete{
    border: 1px solid rgba(255, 255, 255, 0.273);
    border-radius: 0.75rem;
}
.delete:hover{
    transform: scale(1.08);
}
.city-cont{
    border-radius: 0.75rem;
}
    @media (max-width: 600px){
        .city-cont{
            flex-direction: column;
            align-items: center;
            border: 1px solid rgb(237, 237, 189);
        }
        .city-cont>*{
            text-align: center;
            margin-bottom: 6px;
        }

    }
</style>