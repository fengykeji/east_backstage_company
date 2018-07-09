<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
.login {
  .el-button.is-round {
    border-radius: 8px;
  }
}
</style>

<template>
  <div class='login'>
    <div class='title'>
      <div class='input-row'>
        <img src='../../assets/images/logo@3x.png' class='input-img'/>
      </div>
      <div class='input-row'>
        <el-input v-model="submitForm.account" class='input' placeholder="请输入账号"></el-input>
      </div>
      <div class='input-row'>
        <el-input v-model="submitForm.password" class='input' type='password' placeholder="请输入密码"></el-input>
      </div>
      <el-button class='button' type="primary" round @click='login'>登陆</el-button>
      <div class='bottom-text'>
        <span class='text1'>忘记密码?注册</span>
        <span class='text2'>用户手册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      submitForm: {
        account: "",
        password: ""
      }
    };
  },

  mounted() {
    window.onkeydown = e => {
      if (e.keyCode == "13") {
        this.login();
      }
    };
  },
  methods: {
    async login() {
      if (this.submitForm.account == "") {
        this.$message({ type: "error", message: "请输入账号" });
        return;
      }
      if (this.submitForm.password == "") {
        this.$message({ type: "error", message: "请输入密码" });
        return;
      }
      if (this.submitForm.password.length > 20) {
        this.$message({ type: "error", message: "密码长度必须小于20个字符" });
        return;
      }
      if (this.submitForm.account.length > 20) {
        this.$message({ type: "error", message: "账号长度必须小于20个字符" });
        return;
      }
      localStorage.setItem("token", "");

      let res = await this.api.gitCode(this.submitForm);
      if (res.code == 200) {
        this.$router.push({
          name: "project"
        });
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("company_name", res.data.company_name);
        localStorage.setItem("token", res.data.token);
      }
    }
  }
};
</script>



