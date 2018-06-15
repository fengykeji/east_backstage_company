<style lang="less" scoped src="../index.less" ></style>
<style lang="less">
.dialog {
    text-align: left;
  .border {
    width: 200px;
    height: 35px;
    border: 1px solid#bbb;
    border-radius: 6px;
    margin-top: 35px;
  }
  .input1 {
    display: inline-block;
    padding-right: 30px;
  }
}
</style>

<template>
    <div class='box'>
        <div class='title'>
            <span class='left'>
                <div class='text1'>当前位置：审核经纪人</div>
                 <div>
                    <el-button class='tip' type="text" @click="search(1)">全部</el-button>
                    <el-button class='tip' type="text" @click="search(2)">待审核</el-button>
                    <el-button class='tip' type="text" @click="search(0)">审核未通过</el-button>
                 </div>
            </span>
                 <el-input class='query'></el-input>
                <el-button icon="el-icon-search" circle></el-button>
        </div>
        <template>
    <el-table :data="tableData"  border  style="width: 100%">
        <el-table-column  prop="" label="序号"  align='center'> </el-table-column>
        <el-table-column  prop="account"  label="云算号"  align='center'></el-table-column>
        <el-table-column  prop="name" label="名称" align='center'></el-table-column>
        <el-table-column  prop="project_name" label="申请项目" align='center'></el-table-column>
        <el-table-column  prop="role" label="角色" align='center'>
            <template slot-scope="scope">{{getRole(scope.row.role)}}</template>
        </el-table-column>
        <el-table-column  prop="department" label="所属部门" align='center'></el-table-column>
        <el-table-column  prop="position" label="职位" align='center'></el-table-column>
        <el-table-column  prop="city_name" label="城市" align='center'></el-table-column>
        <el-table-column  prop="district_name" label="区域" align='center'></el-table-column>
        <el-table-column  prop="tel" label="联系方式" align='center'  width="120px"></el-table-column>
        <el-table-column  prop="state" label="审核状态" align='center'>
            <template slot-scope="scope">{{auditingState(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column  prop="remark" label="备注" align='center' width="200px"></el-table-column>
        <el-table-column  prop="entry_time" label="申请时间" align='center'></el-table-column>
        <el-table-column  label="操作" align='center'>
            <template slot-scope="scope">
            <el-button type="text" @click='examine(scope.row)'>审核</el-button>
            <el-button type="text" @click='see(scope.row)'>查看</el-button>
            </template>
        </el-table-column>
    </el-table>

     <el-dialog title="查看" :visible.sync="dialogFormVisible" class='dialog'>
             <el-form v-model="submitForm">
                <el-form-item label="姓名" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                </el-form-item>
                  <div class='num_set'>员工信息</div>
                <el-form-item label="角色" class='input1'>
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
                <el-form-item label="工牌照片" class='input1'>
                      <div class='border'>（证件照片为正反两面）</div>
                </el-form-item>
                <el-button>点击查看</el-button>
                  <el-form-item label="入职时间" class='input1'>
                      <div class='border'>{{submitForm.price}}</div>
                </el-form-item>
                  <el-form-item label="申请项目" class='input1'>
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
    </el-dialog>
</template>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      searchObj: {
        tag_search: ""
      },
      dialogFormVisible: false,
      submitForm: {}
    };
  },
  mounted() {
    this.getExList();
  },
  methods: {
    examine(row) {
      this.dialogFormVisible = true;
    },
    see() {},
    getRole(row) {
      if (row == 1) {
        return "经纪人";
      } else if (row == 2) {
        return "对接人";
      }
    },
    auditingState(row) {
      if (row == 0) {
        return "未通过";
      } else if (row == 2) {
        return "待审核";
      }
    },
    async getExList() {
      let res = await this.api.getExList();

      if ((res.code = 200)) {
        this.tableData = res.data.data;
      }
    }
  }
};
</script>


