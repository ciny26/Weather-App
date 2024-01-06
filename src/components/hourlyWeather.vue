<template>
    <div class=" min-w-screen-sm w-full text-white py-12">
        <div class="mx-8">
            <h2 class="mx-6 py-2">Hourly weather</h2>
            <div class="weather-modals flex overflow-x-auto gap-10 mx-6 " id="customScrollbar">
                <div v-for="(item,index) in hourlyWeather"   :key="index" class="weatherHours flex flex-col gap-4 items-center">
                    <p class="Hours text-md whitespace-nowrap ">{{ item }}</p>
                    <img class="icons h-9 w-9 " v-if="iconArray[index] === 'rain' " src='../weather_icons/rain.png' alt="no">
                    <img class="icons h-9 w-9 " v-else-if="iconArray[index] === 'clear-day'" src='../weather_icons/clear-day.png' alt="no">
                    <img class="icons h-9 w-9 " v-else-if="iconArray[index] === 'clear-night' " src='../weather_icons/clear-night.png' alt="no">
                    <img class="icons h-9 w-12 " v-else-if="iconArray[index] === 'partly-cloudy-night'" src='../weather_icons/partly-cloudy-night.png' alt="no">
                    <img class="icons h-9 w-9 " v-else-if="iconArray[index] === 'partly-cloudy-day'" src='../weather_icons/partly-cloudy-day.png' alt="no">
                    <img class="icons h-9 w-9 " v-else-if="iconArray[index] === 'partly-cloudy' || 'cloudy' " src='../weather_icons/cloudy.png' alt="no">
                    <p class="temp text-xl">{{ Math.round( (tempArray[index]  - 32) * 5/9 ) }}&deg;</p>
                </div>
                
            </div>
        </div>
        
        
    </div>
    <hr class=" w-full border-white opacity-10 border">
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            hourlyWeather: [],
            iconArray:[],
            tempArray:[]
            
        }
    },
    mounted(){
        if(this.$route.params.lat !== ''){
            this.getHourlyWeather()
        }
    },
    methods: {
        async getHourlyWeather(){
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.$route.params.lat},${this.$route.params.lon}
                ?key=5HBHGYLKZT5KG7H7V5HGKFFED`)
            const data = response.data
            const currentDayWeather = data.days[0]
            console.log(currentDayWeather.hours)
            currentDayWeather.hours.forEach((hour) => {
                const numHour =Number(hour.datetime.split(":")[0])
                    if(numHour > 12 ){
                        this.hourlyWeather.push(numHour%12 + ' PM'  )
                    }
                    else{
                        this.hourlyWeather.push(numHour + ' AM'  )
                    }
            });  
            currentDayWeather.hours.forEach((hour)=>{
                this.iconArray.push(hour.icon)
            });
            currentDayWeather.hours.forEach((hour)=>{
                this.tempArray.push(hour.temp)
            });

        }
    },
}
//`../weather_icons/${iconArray[index]}.*`
</script>
<style scoped>
#customScrollbar {
  overflow-y: auto;
  scrollbar-width: thin;  /* Firefox */
  scrollbar-color: white #00668A;  /* Firefox */
  
}

#customScrollbar::-webkit-scrollbar {
  width: 6px;  /* Set the width of the scrollbar */
  height: 4px;
}

#customScrollbar::-webkit-scrollbar-thumb {
  background-color: white;  /* Set the color of the thumb */
  border-radius: 3px;  /* Set the border-radius of the thumb */
  height: 4px;
}

#customScrollbar::-webkit-scrollbar-track {
  background-color: #00668A;  /* Set the color of the track */
  border-radius: 6px;  /* Set the border-radius of the track */
  height: 4px;
}

.icons {
  margin-bottom: 0.25rem; /* Adjust the margin as needed */
}
.temp{
    margin-bottom: 1rem;
}
</style>


