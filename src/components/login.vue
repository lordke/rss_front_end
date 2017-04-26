<template>
  <div class="formwrapper" v-loading="loading" element-loading-text="拼命加载中">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
      <el-input v-model.number="ruleForm.name" @focus="tips=''"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" auto-complete="off" @focus="tips=''"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <div class="tips">{{tips}}</div>
  </el-form>
  </div>
</template>
<style scoped>
  .formwrapper{
    flex:auto;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #C0CCDA;
  }
  .demo-ruleForm{
    border:1px solid gray;
    border-radius:10px;
    background-color: #D3DCE6;
    padding:30px 30px 0 0;
    width:400px;
    height:200px;

  }
  .tips {
    padding:0 100px;
    margin:-15px 0 0 0 ;
    color:red;
    font-size:14px;
  }
</style>
<script>
  import bus from './bus'
  export default {
    data() {
      var checkName= (rule, value, callback) => {
        if (!value) {
          callback(new Error('用户名不能为空'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        tips:"",
        loading:false,
        ruleForm: {
          name:'',
          pass: '',

        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.loading=true;

            this.axios.post('/ifuser/',{
                username:this.ruleForm.name,
                password:this.ruleForm.pass
            }).then(function(response){
                if(response.data==true){
                    this.loading=false;
                    bus.$emit('login');
                    this.$router.push('/');
                }
                else {
                    this.tips = response.data;
                    this.loading=false;
                }
            }.bind(this))
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
