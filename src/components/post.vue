<template>
  <div class="postwp">
    <h1 class="posttitle">{{post.fields.title}}</h1>
    <div v-html="post.fields.content"></div>
  </div>
</template>
<script>
  export default {
      data(){
          return {
              post: {}
          }
      },
      methods:{
        getdata:function(postid){
          this.axios.get('/post/',{
              params:{
                  postid:postid
              }
          }).then((response)=>{
              this.post=JSON.parse(response.data)[0]
          })
        }
      },
      created(){
        this.getdata(this.$route.params.postid)
      },
      watch: {
        '$route' (to, from) {
          this.getdata(this.$route.params.postid)
        }
      }
  }
</script>
<style >
  .postwp {
    padding:20px 120px;
    flex:auto;
    overflow:scroll;
    font-family: PingFang SC;
    background-color: #EFF2F7;
  }

  img{

    width:700px;
  }
  .posttitle{
    text-align: center;
    margin:10px 20px;
  }
</style>

