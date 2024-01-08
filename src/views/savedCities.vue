<template>
    <div  class=" w-1/2 text-white text-xl" v-for="item in storedCities" :key="item"
     >
        <mainCityCard :savedCity="item"></mainCityCard>
    </div>
</template>
<script>
import mainCityCard from '@/components/mainCityCard'
export default {
    created(){
        if(localStorage.getItem('savedCities')){
            this.storedCities = JSON.parse(localStorage.getItem('savedCities'))
            console.log(this.storedCities)
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
        
    },
}
</script>
<style lang="">
    
</style>