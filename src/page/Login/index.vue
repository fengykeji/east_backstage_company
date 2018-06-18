<style lang="less" scoped src="./index.less" ></style>
<template>
    <div class='title'>
        <div>欢迎使用！</div>
        <div class='input-row'>
              <el-input v-model="submitForm.account" class='input' placeholder="请输入账号"></el-input>
        </div>
      <div  class='input-row'>
           <el-input v-model="submitForm.password" class='input' type='password' placeholder="请输入密码"></el-input>
      </div>
          <el-button class='button' type="primary" round @click='login'>登陆</el-button>
          <div class='bottom-text'>
              <span class='text'>忘记密码</span>
              <img  class='img' src='../../assets/images/u16.png'/>
               <span class='text'>注册</span>
          </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      submitForm : {
         account: "",
        password: ""
      },
    
    };
  },
  mounted() {},
  methods: {
    async login() {
      if(this.submitForm.account == '') {
        this.$message({type:'error' , message : '请输入账号'});
        return;
      }
      if(this.submitForm.password == '') {
        this.$message({type:'error' , message : '请输入密码'});
        return;
      }
      if(this.submitForm.password.length>20) {
        this.$message({type:'error' , message : '密码长度必须小于20个字符'});
        return;
      }
      if(this.submitForm.account.length>20) {
        this.$message({type:'error' , message : '账号长度必须小于20个字符'});
        return;
      }
      localStorage.setItem("token", '');

      let res = await this.api.gitCode(this.submitForm);
      if (res.code == 200) {
        this.$router.push("project");
         localStorage.setItem("token", res.data.token);
      } else {
        this.$message({type:'error' , message : res.msg});
      }
    },
    
  }
};
</script>



