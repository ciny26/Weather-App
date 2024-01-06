<template >
  <div class="flex flex-col bg-weather-color-primary min-h-screen">
    <navigationBar />
    
    <router-view></router-view>
  </div>
</template>
<script>
import navigationBar from './components/navigationBar.vue';
//import HomeView from './views/HomeView.vue';
export default {
  components:{
    navigationBar,
    
  }
}
</script>
<style >
  
</style>