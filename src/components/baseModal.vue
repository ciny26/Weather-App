<template>
    <div class="cont z-10 w-screen h-full bg-black bg-opacity-30 flex justify-center 
    absolute left-0 top-0 p-8" v-show="modalAppearence">
        <div class="modal z-20 max-w-screen-sma h-fit bg-white text-black p-2">
            <slot/>
            <button class=" bg-weather-color-primary text-white px-2 py-1" @click="sendDataToParent">Close</button>
        </div>
    </div>
</template>
<script>
export default {
    props:['modalAppearence'],
    data() {
        return {
            modalIsOn:this.modalAppearence
        }
    },
    methods: {
        sendDataToParent(){
            this.$emit('eventToggleModal' , !this.modalAppearence)
        }
        
    },
}
</script>
