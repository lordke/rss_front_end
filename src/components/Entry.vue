<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>
<style scoped>
  .wrapper {
    flex-basis: 300px;
    flex-shrink:0;
    width:300px;
    border:1px solid darkgrey;
    background-color:#eef1f6;
    overflow:scroll;

  }
</style>
<script>
  export default {
  props:['value']

  }
</script>



