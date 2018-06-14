<style lang="less" scoped>
.addPerson {
  width: 760px;
  margin: 0 auto;
  border: 1px solid #999;
  text-align: left;
  padding: 15px 30px;
  margin-top: 40px;
}
.input1 {
  width: 200px;
  display: inline-block;
  padding-right: 30px;
    vertical-align: middle;
}
.border {
  border: 1px solid #888;
  padding: 0 10px;
  border-radius: 4px;
  height: 40px;
  margin-top: 32px;
}
.el-form-item {
  margin-bottom: 5px;
}
.num_set {
  padding-top: 15px;
  font-size: 20px;
}
.cancel {
  margin-top: 20px;
  text-align: right;
}
.button{
  position: relative;
  top: 16px;
}
.btn{
 position: relative;
 left: 380px;
  .btn-1{
    margin-right: 80px;
  }
}
.box{
  padding-left: 20px;
  padding-bottom: 30px;
}
.el-form-item{
  margin: 2px 0;
}

</style>
<template>
    <div class='addPerson'>
        <div class='box'>
            <span class='num_set'>到访确认人信息</span>
            <span class='btn'>
                  <el-button type="primary" >确定</el-button>
                  <el-button class='btn-1' @click="close">返回</el-button>
            </span>
            <el-form v-model="submitForm">
                <el-form-item label="到访确认人" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                </el-form-item>
              <span>
                  <el-button type="primary" class='button' @click='choice'>选择</el-button>
              </span>
                  <div class='num_set'>员工信息</div>
                <el-form-item label="姓名" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                </el-form-item>
                <el-form-item label="入职时间" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                </el-form-item>
                <el-form-item label="云算号" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                </el-form-item>
                <el-form-item label="所属部门" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                </el-form-item>
                <el-form-item label="职位" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                </el-form-item>
                <div>
                    <div class='num_set'>基础信息</div>
                    <el-form-item label="性别" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                    </el-form-item>
                    <el-form-item label="出生年月" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                    </el-form-item>
                    <el-form-item label="电话号码" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                    </el-form-item>
                    <el-form-item label="通讯住址" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        submitForm: {},
    };
  },
  mounted(){
    if(this.$route.params.submitForm === undefined) {
    }else {
      this.submitForm = this.$route.params.submitForm 
    }
  },
  methods:{

    choice(){
        this.$router.push({ name: "choicePeople", params: { submitForm: this.submitForm } });
    },
    close(){
        this.$router.push({ name: "fastDistribution", params: this.$route.params });
    },

  }
};
</script>


