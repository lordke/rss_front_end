<template>
  <div class="wrapper">
    <div class="logo">
      <h1>RSS订阅</h1>
    </div>
    <nav>
      <el-button class="login" v-if="!login" type="primary" @click="$router.push('/login')">登录</el-button>
      <el-button v-if="login"type="danger" @click="logout()">登出</el-button>
      <el-button v-if="login" type="primary" icon="update" @click="open3()">添加RSS订阅源</el-button>
      <el-button v-if="login" type="primary" @click="$router.push('/0')">我的收藏</el-button>


    </nav>
  </div>
</template>


<style scoped>

  .wrapper{
    flex-basis:80px;
    position:relative;
    height:80px;
    background-color: #475669 ;
    width:100%;
  }
  .logo{
    position:relative;
    display:inline-block;
    left:10%;
    padding:10px 0 0 0;
    width:200px;
    height:120px;
    margin:0;
  }
  nav {
    position:absolute;
    display:inline-block;
    right:20px;
    top:25px;
  }
  h1 {
    color: cornsilk;
  }
  .login{
    margin:0 80px;
  }
</style>
<script>
  import bus from './bus'

  export default{
      data:()=>{
          return {
              login:false
          }
      },
      created:function(){
          if(this.$cookie.get('userid')){
              this.login=true;
          }
          bus.$on('login',()=>{
              this.login=true;
          })
      },
      methods:{
        logout(){
          this.axios.get('/logout/').then(()=>{
              this.login=false
              this.$router.push('/login')
          })
        },
        open3() {
          this.$prompt('请输入订阅RSS地址', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
            inputErrorMessage: '网址格式不正确'
          }).then(({ value }) => {

              this.axios.get('/addrssfeed/',{
                  params:{
                      userid:this.$cookie.get('userid'),
                      rsslink:value
                  }
              }).then((response)=>{
                  if(response.data=='bad rsslink'){
                    this.$message.error('对不起，您的RSS源地址无法解析');
                  }
                  else if(response.data=='Already add') {
                      this.$message.error('对不起，该RSS源地址已经添加');
                  }
                  else{
                    bus.$emit('addrsslink',response.data);
                  }

              });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },

      }
  }
</script>
