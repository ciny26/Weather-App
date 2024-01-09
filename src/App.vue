<template >
  <div class="flex flex-col bg-weather-color-primary min-h-screen">
    <navigationBar />
    
    <router-view></router-view>
    <footerComp></footerComp>
  </div>
</template>
<script>
import navigationBar from './components/navigationBar.vue';
import footerComp from './components/footerComp.vue';
//import HomeView from './views/HomeView.vue';
export default {
  components:{
    navigationBar,
    footerComp
    
  }
}
</script>
<style >
  
</style>