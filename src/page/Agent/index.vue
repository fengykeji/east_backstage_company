<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
.agent {
  margin-left: 180px;
  margin-top: 150px;
  .title {
    background-color: #fafafc;
    text-align: left;
    padding-left: 180px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100px;
    width: 100%;
    z-index: 99;

    .left {
      text-align: left;
      display: inline-block;
      .text1 {
        padding-top: 10px;
        margin: 10px 0 12px 20px;
      }
    }
  }
    .el-dialog__body{
    padding:0px 20px 20px 20px;
  }
  .showImg {
    width: 800px;
    position: fixed;
    top: 20%;
    left: 30%;
  }
}
</style>

<template>
  <div class='agent'>
    <div class='title'>
      <span class='left'>
        <div class='text1'>当前位置：在职经纪人</div>
      </span>
      <el-input v-model="searchObj.name" class='query'></el-input>
      <el-button @click="search" icon="el-icon-search" circle></el-button>
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="" label="序号" align='center'> </el-table-column>
        <el-table-column prop="account" label="云算号" align='center'></el-table-column>
        <el-table-column prop="name" label="名称" align='center'></el-table-column>
        <el-table-column prop="tel" label="联系方式" align='center'></el-table-column>
        <el-table-column prop="project_name" label="申请项目" align='center'></el-table-column>
        <el-table-column prop="role" label="角色" align='center'>
          <template slot-scope="scope">{{getRole(scope.row.role)}}</template>
        </el-table-column>
        <el-table-column prop="department" label="所属部门" align='center'></el-table-column>
        <el-table-column prop="position" label="职位" align='center'></el-table-column>
        <el-table-column prop="city_name" label="城市" align='center'></el-table-column>
        <el-table-column prop="district_name" label="区域" align='center'></el-table-column>
        <el-table-column prop="entry_time" label="入职时间" align='center'></el-table-column>
        <el-table-column label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type="text" @click='showQuit(scope.row)'>离职</el-button>
            <el-button type="text" @click='showSee(scope.row)'>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="离职申请" :visible.sync="dialogFormVisible" class='dialog' @close="cancel">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="离职原因" prop="remark">
          <el-input v-model="form.remark" class='textarea' type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sumbit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看详情" :visible.sync="showInfo" class='dialog'>
      <div class='btn'>
        <el-button type='primary' @click='showCancel'>关闭</el-button>
      </div>
      <div class='num_set'>员工信息</div>
      <el-form v-model="examinePeople">
        <el-form-item class='input1'>
          <div>姓名</div>
          <div class='border'>{{examinePeople.name}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>角色</div>
          <div class='border'>
            {{role(examinePeople.role)}}
          </div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>云算号</div>
          <div class='border'>{{examinePeople.account}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>所属部门</div>
          <div class='border'>{{examinePeople.department}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>职位</div>
          <div class='border'>{{examinePeople.position}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>工牌照片</div>
          <div class='border  img'>
               <img src="../../assets/images/head.png" />
            <!-- <img :src="'http://120.27.21.136:2798/' + examinePeople.img_url" /> -->
          </div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>入职时间</div>
          <div class='border'>{{examinePeople.entry_time}}</div>
        </el-form-item>
        <div class='num_set'>基础信息</div>
        <el-form-item class='input1'>
          <div>性别</div>
          <div class='border'>
            {{sex(examinePeople.sex)}}
          </div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>电话号码</div>
          <div class='border'>{{examinePeople.tel}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>出生年月</div>
          <div class='border'>{{examinePeople.birth ? examinePeople.birth: " "}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>通讯地址</div>
          <div class='border'>{{examinePeople.absolute_address}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>身份证</div>
          <div class='border'>{{examinePeople.id_card}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>证件照片</div>
          <div class='border  img'>
               <img src="../../assets/images/idCard.png" />
            <!-- <img :src="'http://120.27.21.136:2798/' + examinePeople.card_url" /> -->
          </div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>绑定银行</div>
          <div class='border'>{{examinePeople.bank_name}}</div>
        </el-form-item>
        <el-form-item class='input1'>
          <div>银行卡号</div>
          <div class='border'>{{examinePeople.bank_card}}</div>
        </el-form-item>
        <el-form-item class='input2'>
          <div>个人介绍</div>
          <div class='border height'>{{examinePeople.slef_desc}}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        remark: [
          { required: true, message: "请输入离职原因", change: "change" }
        ]
      },
      searchObj: {
        name: ""
      },
      tableData: [],
      dialogFormVisible: false,
      showInfo: false,
      examinePeople: {
        name: "",
        role: "",
        account: "",
        department: "",
        position: "",
        img_url: "",
        entry_time: "",
        project_name: "",
        sex: "",
        tel: "",
        birth: "",
        tabsolute_addressel: "",
        slef_desc: "",
        bank_card: "",
        bank_name: "",
        card_url: "",
        id_card: ""
      },
      form: {
        id: null,
        remark: ""
      }
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    getRole(row) {
      if (row == 1) {
        return "经纪人";
      } else if (row == 2) {
        return "对接人";
      }
    },
    async sumbit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          let res = await this.api.quitPeople(this.form);
          if (res.code == 200) {
            this.$message({ type: "success", message: "离职成功" });
            this.search();
            this.cancel();
          }
        } else {
          return false;
        }
      });
    },
    async showSee(row) {
      this.showInfo = true;
      Object.assign(this.examinePeople, row);
      this.examinePeople.agent_id = row.agent_id;
      let res = await this.api.getPayrollInfo(this.examinePeople);
      if (res.code == 200) {
        this.examinePeople = res.data;
      }
    },
    role(row) {
      if (row == 1) {
        return "新房经纪人";
      } else if (row == 2) {
        return "项目对接人";
      }
    },
    sex(row) {
      if (row == 1) {
        return "男";
      } else if (row == 2) {
        return "女";
      } else if (row == 0) {
        return "未设置";
      }
    },
    showQuit(row) {
      this.form.id = row.id;
      this.dialogFormVisible = true;
    },
    showCancel() {
      this.showInfo = false;
    },
    cancel() {
      Object.assign(this.form, this.$options.data()["form"]);
      this.dialogFormVisible = false;
    },
    async search() {
      let res = await this.api.getPayrollList(this.searchObj);
      if ((res.code = 200)) {
        this.tableData = res.data.data;
      }
    }
  }
};
</script>


