<style lang="less" scoped>
.addPerson {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #eee;
  text-align: left;
  padding: 15px 20px;
}
.title {
  font-size: 20px;
  padding-top: 10px;
}
.input {
  width: 200px;
  display: inline-block;
  padding-right: 20px;
}
.input1 {
  width: 200px;
  display: inline-block;
}
.border {
  border: 1px solid #888;
  padding: 0 10px;
  border-radius: 4px;
  height: 40px;
}
.input2 {
  width: 400px;
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
</style>
<template>
    <div class='addPerson'>
        <div class='num_set'>到访确认人信息</div>
        <el-form v-model="addPerson">
            <el-form-item label="到访确认人" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
            </el-form-item>
            <el-button>选择</el-button>
              <div class='num_details'>员工信息</div>
            <el-form-item label="姓名" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
            </el-form-item>
            <el-form-item label="入职时间" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
            </el-form-item>
            <el-form-item label="云算号" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
            </el-form-item>
            <el-form-item label="所属部门" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
            </el-form-item>
            <el-form-item label="职位" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
            </el-form-item>
            <div>
                <div>基础信息</div>
                <el-form-item label="性别" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
                </el-form-item>
                <el-form-item label="出生年月" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
                </el-form-item>
                <el-form-item label="电话号码" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
                </el-form-item>
                <el-form-item label="通讯住址" class='input1'>
                  <div class='border'>{{addPerson.price}}</div>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
        addPerson:[]
    };
  },
  mounted(){

  },
  methods:{

  }
};
</script>


