<style scoped>

</style>
<template>
  <div>
      <vue-side-bar></vue-side-bar>
      <router-view></router-view>
  </div>
</template>
<script>
import sideBar from "@/components/sideBar";

export default {
  data(){
      return{
          
      }
  },
  components:{
    VueSideBar: sideBar
  }
}
</script>

