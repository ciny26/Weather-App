<template>
    <div class=" min-w-screen-sm w-full text-white py-12">
        <div class="mx-8">
            <h2 class="title mx-6 py-2">15 days weather</h2>
            <div class="weather-modals flex flex-col  gap-10 mx-6
             " id="customScrollbar">
                <div v-for="(item,index) in weatherDays"   :key="index" class="weatherDays flex flex-row justify-around items-center">
                    <p class="Days text-md whitespace-nowrap w-1/3 ">{{ formatDate(item) }}</p>
                    <p class="temp text-md m-0 " >Min: {{ Math.round( (minDayTempArray[index]  - 32) * 5/9 ) }}&deg;, Max: 
                        {{ Math.round( (maxDayTempArray[index]  - 32) * 5/9 ) }}&deg;</p>
                    <img class="icons h-9 w-9 " v-if="iconArray[index] === 'rain' " src='../weather_icons/rain.png' alt="no">
                    <img class="icons h-9 w-9 " v-else-if="iconArray[index] === 'clear-day'" src='../weather_icons/clear-day.png' alt="no">
                    <img class="icons h-9 w-9 " v-else-if="iconArray[index] === 'clear-night' " src='../weather_icons/clear-night.png' alt="no">
                    <img class="icons h-9 w-12 " v-else-if="iconArray[index] === 'partly-cloudy-night'" src='../weather_icons/partly-cloudy-night.png' alt="no">
                    <img class="icons h-9 w-9 " v-else-if="iconArray[index] === 'partly-cloudy-day'" src='../weather_icons/partly-cloudy-day.png' alt="no">
                    <img class="icons h-9 w-9 " v-else-if="iconArray[index] === 'partly-cloudy' || 'cloudy' " src='../weather_icons/cloudy.png' alt="no">
                    
                </div>
                
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            weatherDays: [],
            iconArray:[],
            maxDayTempArray:[],
            minDayTempArray:[]
            
        }
    },
    mounted(){
        if(this.$route.params.lat !== '' && this.$route.params.long !== ''){
            this.getHourlyWeather()
        }
    },
    methods: {
        async getHourlyWeather(){
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.$route.params.lat},${this.$route.params.lon}
                ?key=5HBHGYLKZT5KG7H7V5HGKFFED`)
            const data = response.data
            const daysList = data.days
            console.log(daysList)
            daysList.forEach((day)=>{
                this.weatherDays.push(day.datetime)
                this.maxDayTempArray.push(day.tempmax)
                this.minDayTempArray.push(day.tempmin)
                this.iconArray.push(day.icon)
            })
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long' };
            return date.toLocaleDateString('en-UK', options);
    },
    },
}
//`../weather_icons/${iconArray[index]}.*`
</script>
<style scoped>
    @media (max-width:605px) {
        .title{
            text-align: center;
        }
        .weatherDays{
            justify-content: center;
        }
        .weatherDays{
            width: 100%;
            flex-direction: column;
            text-align: center;
        }
        .Days{
            width: 100%;
        }
        .temp{
            width: 100%;
        }
    }
</style>

