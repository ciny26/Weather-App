<template>
    <div  class=" w-7/12 text-white text-xl" v-for="item in this.storedCities" :key="item"
     >
        <mainCityCard :savedCity="item" @delete-city="deleteCity"></mainCityCard>
    </div>
</template>
<script>
import mainCityCard from '@/components/mainCityCard'
export default {
    created(){
        if(localStorage.getItem('savedCities')){
            this.storedCities = JSON.parse(localStorage.getItem('savedCities'))
        }
    }, 
    data() {
        return {
            storedCities:[]
        }
    },
    components:{
    mainCityCard,},
    methods: {
        deleteCity(cityName){
            const updatedCities = this.storedCities.filter((savedCity) => savedCity.city !== cityName);
            localStorage.setItem('savedCities', JSON.stringify(updatedCities));
            this.storedCities = updatedCities; // Update the storedCities in the component
            
        }
    },
    computed:{

        getStoredCities(){
        
        return this.storedCities.length;
        } 
    }
}
</script>
<style lang="">
    
</style>