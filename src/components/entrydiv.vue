<template>
  <div class="entry">
    <Entry v-model="selectindex" >
      <Entryitem v-for="item in items" :index="String(item.id)" >{{item.title}}</Entryitem>
      <page :total="100" :page="current" :page-size="10"  :max-page="5" v-on:pagehandler="pageHandler"></page>
    </Entry>

    <router-view></router-view>
  </div>
</template>
<script>
  import page from './page.vue'
  import Entry from './Entry.vue';
  import Entryitem from './Entryitem.vue'
  export default{
      data(){
          return {
              selectindex:'',
              items:[],
              current:1,

          }
      },
      components:{Entry,Entryitem,page},
      methods:{
        getdata:function(index,page){
          this.axios.get('/rsspost/',{
              params:{
                  feedid:index,
                  page:page
              }
          }).then((response)=>{
              this.items=JSON.parse(response.data)
          })
        },

        pageHandler(page){
            this.current = page;
            this.getdata(this.$route.params.feedid,page)

        }
      },
      created(){
          this.getdata(this.$route.params.feedid,1)
      },
      watch: {
        '$route' (to, from) {
            if(to.name!='post'){
              this.getdata(this.$route.params.feedid,1);
              this.current=1
            }
        }
      }


  }
</script>
<style scoped>
 .entry {
   display:flex;
   flex:auto;
   align-content: stretch;

 }
</style>

