<template>
  <div class="screen">
    <headers></headers>
    <router-view></router-view>
  </div>
</template>

<script>
import headers from './components/headers.vue'
import post from './components/post.vue'
export default {
  components: {headers,post}
}
</script>

<style>
  * {
    margin:0;
    padding:0;
  }
  html,body{
    height:100%;
    width:100%;
  }
  .screen {
    display:flex;
    height:100%;
    width:100%;
    flex-direction: column;
  }
</style>



