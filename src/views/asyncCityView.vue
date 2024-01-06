<template>
    <div v-if="cityWeather !== ''">
        <!-- Banner -->
        <div v-if="this.$store.getters.getCityState !== true" class="add-instruction flex justify-center bg-weather-color-secondly text-white
         p-4 ">
            <p class=" text-center" >
                You are currently previewing this city, click the "+" 
                icon to start tracking this city
            </p>
    </div>
        <!-- Weather Overview -->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="city-name text-4xl mb-2">{{ $route.params.city }}</h1>
            <p class="date text-sm mb-12">{{ formattedTime }}</p>
            <p class="temp text-8xl mb-8">{{ convertTemp(cityWeather.currentConditions.temp) }}&deg;</p>
            <p class="temp-feels-like">it feels like : {{ convertTemp(cityWeather.currentConditions.feelslike) }}&deg;</p>
            <p class="Capitalize"> {{ cityWeather.currentConditions.conditions}}</p>
            <img class="icons h-9 w-9 " v-if="cityWeather.currentConditions.icon === 'rain' " src='../weather_icons/rain.png' alt="no">
            <img class="icons h-9 w-9 " v-else-if="cityWeather.currentConditions.icon === 'clear-night'" src='../weather_icons/clear-night.png' alt="no">
            <img class="icons h-9 w-9 " v-else-if="cityWeather.currentConditions.icon === 'clear-day'" src='../weather_icons/clear-day.png' alt="no">
            <img class="icons h-9 w-9 " v-else-if="cityWeather.currentConditions.icon === 'partly-cloudy-night'" src='../weather_icons/partly-cloudy-night.png' alt="no">
            <img class="icons h-9 w-9 " v-else-if="cityWeather.currentConditions.icon === 'partly-cloudy-day'" src='../weather_icons/partly-cloudy-day.png' alt="no">
            <img class="icons h-9 w-9 " v-else-if="cityWeather.currentConditions.icon === 'partly-cloudy' || 'cloudy' " src='../weather_icons/cloudy.png' alt="no">
            
        </div>
        <hr class=" w-full border-white opacity-10 border">
        <!-- Hourly weather-->
        <hourlyWeather></hourlyWeather>
        <!-- monthly weather-->
        <monthlyWeather></monthlyWeather>
        
    </div>
</template>
<script>
import axios from 'axios';
import hourlyWeather from '@/components/hourlyWeather'
import monthlyWeather from '@/components/monthlyWeather'

export default {
    components:{
        hourlyWeather,
        monthlyWeather
    },
    data() {
        return {
            cityWeather:'',
            timeZone:'',
            formattedTime: '',
        }
    },
    mounted(){
        if(this.$route.params.lat !== '' && this.$route.params.lon !== '' )
        this.getWeather()
        this.updateTime();
    // Update the time every second (you can adjust the interval as needed)
        setInterval(this.updateTime, 1000);
        
    },
    methods: {
        async getWeather(){
            try {
                const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.$route.params.lat},${this.$route.params.lon}
                ?key=5HBHGYLKZT5KG7H7V5HGKFFED`);
                this.cityWeather = response.data
                console.log(this.cityWeather)
            } catch (error) {
                console.log(error)
            }
        },
        convertTemp(tempinF){
            const intValue = parseInt(tempinF)
            const celsusTemp = Math.round( (intValue  - 32) * 5/9 )
            return celsusTemp

        },
        updateTime() {
        this.timeZone = this.cityWeather.timezone
        const options = {
            weekday: 'long', // 'short', 'narrow', or 'long'
            year: 'numeric',
            month: 'long', // 'short', or 'long'
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: this.timeZone,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      this.formattedTime = formatter.format(new Date());
    },
    },
}
</script>
<style>
    .icon{
        width: 36px;
        height: 36px;
    }
</style>