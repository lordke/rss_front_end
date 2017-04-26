<template>
  <div @click="$parent.$emit('input',index);getroute()" :class="['eitem',{active:isactive}]">
    <slot></slot>
  </div>
</template>

<script>
  export default {

      props:['index'],
      computed:{
        isactive(){
          if(this.$parent.value===this.index){
            return true;
          }
        }
      },
    methods:{
          getroute(){
            this.$router.push({ path: "/"+this.$route.params.feedid+'/'+this.index});
          }
    }
  }
</script>
<style scoped>
  .eitem {
    padding:10px 20px ;
    height:40px;
    background-color: #E5E9F2;
    text-overflow:ellipsis;
    overflow:hidden;
    font-family:PingFang SC;
    font-weight:bold;
    color:#222222;

  }
  .eitem:hover {
    background-color: #d1dbe5;
    cursor:pointer;
  }
  .active {
    background-color: #d1dbe5;
    color:#20a0ff;
  }
</style>
