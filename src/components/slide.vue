<template>
  <div class="content">
  <div class="slide">
    <el-menu mode="verticle" theme="dark"  router>
      <template v-for="rssfeed in rssfeeds">
        <div class="liwrapper">
          <el-menu-item class='feedls'  @click="rssfeed.unread=0" :key="String(rssfeed.pk)" :index="String(rssfeed.pk)" :route="getrouter(String(rssfeed.pk))">>{{rssfeed.fields.title}}</el-menu-item>
          <div class="notice" v-if="rssfeed.unread"><span >{{rssfeed.unread}}</span></div>>
        </div>
      </template>
    </el-menu>
  </div>
    <router-view></router-view>
  </div>
</template>
<style scoped>
  .slide {
    width:200px;
    background-color:#475669;
    flex-basis: 200px;
    flex-shrink: 0;
  }
  .content {
    flex:auto;
    display:flex;
    align-content: stretch;
    background-color: #EFF2F7;
  }
  .feedls{
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .notice{
    /*float:right;*/
    /*display:inline-block;*/
    position:absolute;
    top:20px;
    right:10px;
    width:20px;
    height:20px;
    background-color: red;
    border-radius:10px;

  }
  .liwrapper{
    height:56px;
    position:relative;
    overflow:hidden;
  }
  span{
    height:20px;
    line-height:20px;
    display:block;
    color:#FFF;
    text-align:center;
    font-size:13px;
    font-weight: bold;
  }

</style>
<script>
  import bus from './bus.js'
  export default {
      data:function(){
          return{
              rssfeeds: [],
          }
      },
      created:function(){
           this.getdata();
           bus.$on('addrsslink',(data)=>{
               let feed = JSON.parse(data);
               this.rssfeeds.push(feed);
            });
           bus.$on('newpost',(data)=>{

                console.log(Object.keys(data));
               for(let feed of this.rssfeeds){
                   console.log(String(feed.pk));
                   console.log(Object.keys(data).indexOf(String(feed.pk)));

                   if(Object.keys(data).indexOf(String(feed.pk))!==-1){
                        console.log(feed.pk);
                        feed.unread +=data[String(feed.pk)]
//                        this.set(feed, 'unread', data[String(feed.pk)]);
                   }
               }
           });
      },
      methods:{
          getdata:function(){
              let data
              this.axios.get('/rssfeed/',{
                  params:{
                      userid:this.$cookie.get('userid')
                  }
              }).then((response)=>{
                  let res = JSON.parse(response.data);
                  for(let feed of res){
                      feed.unread=0
                  }
                  this.rssfeeds = res
              })

//              return [
//                {index:'1',title:'知乎日报'},
//                {index:'2',title:'财经周刊'},
//                {index:'3',title:'腾讯 国内新闻'}
//              ];
        },
        getrouter(index){
              return{
                path: '/'+index
              }
        }
      }

  }
</script>

