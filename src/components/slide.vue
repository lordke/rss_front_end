<template>
  <div class="content" >
    <div id="contextMenu" :style="rightstyle" @click="unrssfeed()">
        删除该RSS频道
    </div>
  <div class="slide">
    <el-menu mode="verticle" theme="dark"  router>
      <template v-for="rssfeed in rssfeeds">
        <div class="liwrapper" @mousedown.stop.prevent="right(rssfeed.pk,$event)">
          <el-menu-item  class='feedls'   @click="rssfeed.unread=0 ;back(rssfeed.pk)" :key="String(rssfeed.pk)" :index="String(rssfeed.pk)" :route="getrouter(String(rssfeed.pk))">>{{rssfeed.fields.title}}</el-menu-item>
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
  #contextMenu{
    width:130px;
    height:30px;
    text-align:center;
    border-radius: 5px;
    background: linear-gradient(top,#dbdbdb,#999);
    color: #484848;
    text-decoration: none;
    text-shadow: 0 1px 0 #e0e0e0;
    font-size: 14px;
    padding: 5px 0px 1px;
    cursor:pointer
  }



</style>
<script>
  document.body.oncontextmenu=function(){return false;};

  import bus from './bus.js'
  export default {
      data(){
          return{
              rssfeeds: [],
              rightstyle:{
                display:"none"
              },
              current:1,
          }
      },
      created:function(){
        document.body.onclick=()=>{
            this.rightstyle={
                 display:"none",
            }
          }
           this.getdata();
           bus.$on('addrsslink',(data)=>{
               let feed = JSON.parse(data);
               feed.unread=0;
               this.rssfeeds.push(feed);
            });
           bus.$on('newpost',(data)=>{
               for(let feed of this.rssfeeds){

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
              if(this.$route.params.feedid==0){
                this.rssfeeds=[{
                  pk:0,
                  fields:{
                      title:"我的收藏文章"
                  }
                }, {
                  pk:"1",
                  fields:{
                    title:"返回频道列表"
                  }
                }];
                return ;
              };
              this.axios.get('/rssfeed/').then((response)=>{
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
        },
        back(back){
            if(back=="back"){
                this.getdata()
            }
        },
        right(feedid,event){
          if(event.button == 2){
            let rightmenu = document.getElementById("contextMenu")
            this.current=feedid
            this.rightstyle={
              position:"absolute",
              display:"block",
              top:event.pageY+'px',
              left:event.pageX+'px',
              "background-color":"white",
              "z-index":"1000"
            }

          }
        },
        unrssfeed(){
          this.axios.get('/unrssfeed/',{
            params:{
              feedid:this.current
            }
          }).then((response)=>{
            this.getdata();
          })
        }
      },
      watch: {
        '$route' (to, from) {
          if(to.params.feedid==0){
            this.getdata();
          }
          else if(to.params.feedid == "1"){
            this.getdata();
          }
        }
      },

  }
</script>

