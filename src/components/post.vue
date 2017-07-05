<template>
    <div class="postwp">
      <!--<el-button class ="collect" v-if="!post.fields.collection" type="primary" icon="star-on">收藏文章</el-button>-->
      <!--<el-button class ="collect" v-if="post.fields.collection" type="danger" icon="star-on">取消收藏</el-button>-->
      <a :href="post.post[0].fields.link" target="_blank"><h1 class="posttitle" >{{post.post[0].fields.title}}</h1></a>
        <div v-if="!post.clt" style="position:relative;height:50px"><el-button @click="addcollect($route.params.postid)" class ="collect"  type="primary" icon="star-on" style="position:absolute;right:20px" >收藏文章</el-button></div>
        <div v-if="post.clt" style="position:relative;height:50px"><el-button @click="uncollect($route.params.postid)"class ="collect"  type="danger" icon="star-on" style="position:absolute;right:20px">取消收藏</el-button></div>

      <div v-html="post.post[0].fields.content"></div>
    </div>
</template>
<script>
  export default {
      data(){
          return {
              post: {
                  clt:false,
                  post:[{
                      fields:{
                        title:"",
                        link:"",
                        content:""
                      }
                  }]

              }
          }
      },
      methods:{
        getdata:function(postid){
          this.axios.get('/post/',{
              params:{
                  postid:postid,
              }
          }).then((response)=>{

              this.post=JSON.parse(response.data)
              this.post.post = JSON.parse(this.post.post)

              //console.log(this.post.fields.collection);
          })
        },
        addcollect(postid){
          this.axios.get('/addcollect/',{
            params:{
              postid:postid,
            }
          }).then((response)=>{
            console.log(response.data)
            this.$message('收藏成功');
            this.post.clt=true
            //console.log(this.post.fields.collection);
          })
        },
        uncollect(postid){
          this.axios.get('/uncollect/',{
            params:{
              postid:postid,
            }
          }).then((response)=>{
            console.log(response.data)
            this.$message('取消收藏成功');
            this.post.clt=false
            //console.log(this.post.fields.collection);
          })
        }

      },
      created(){
        this.getdata(this.$route.params.postid)
      },
      watch: {
        '$route' (to, from) {
          this.getdata(this.$route.params.postid);

        }
      }
  }
</script>
<style >
  .postwp {
    position: relative;
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

  a{
    text-decoration:none;
    color:#1f2d3d;
  }
  .collect{

  }

</style>

