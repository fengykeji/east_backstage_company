<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.accountAdmin {
  .el-table th {
    padding: 0;
  }
  .el-table td,
  .el-table th {
    padding: 4px 0;
    color: #333;
  }
  .el-dialog__body{
    margin: 0 auto;
  }
}
</style>

<template>
  <div class='accountAdmin'>
    <!-- 用户显示 -->
    <div class='tableIn-btn'>
      <div class='btn'>
        <el-button type="primary" @click='showUser'>新增账号</el-button>
        <el-button @click='cancel'>关闭</el-button>
      </div>
    </div>
    <el-table :data="form.project_user" border class='form'>
      <el-table-column property="account" label="帐号" align='center'></el-table-column>
      <el-table-column property="name" label="管理员" align='center'></el-table-column>
      <el-table-column label="当前状态" align='center'>
        <template slot-scope="scope">
          {{showState(scope.row.state)}}
        </template>
      </el-table-column>
      <el-table-column property="operation" label="操作" align='center'>
        <template slot-scope="scope">
          <el-button type="text" @click='editUser(scope.row , scope.$index)'>修改</el-button>
          <el-button type="text" @click='enabledDisable(scope.row)'>{{StateBtn(scope.row.state)}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 帐号添加 -->
    <el-dialog title="新建账号" :visible.sync="dialogFormVisibleAccounts" @close="cancelUser" class='accoutDialog'>
      <el-form :model="projectUserForm" :rules="userFormRules" ref="projectUserForm">
        <el-form-item label="设定帐号" prop="account" class='dialog_input'>
          <el-input v-model="projectUserForm.account" auto-complete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item v-show="isAccountValid" label="设定密码" prop="password" class='dialog_input'>
          <el-input v-model="projectUserForm.password" auto-complete="off" type='password' placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item v-show="!isAccountValid" label="设定密码" class='dialog_input'>
          <el-input v-model="projectUserForm.password" auto-complete="off" type='password' placeholder="不设置为之前密码"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" prop="name" class='dialog_input'>
          <el-input v-model="projectUserForm.name" auto-complete="off" placeholder="请输入管理员姓名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="联系电话" prop="phone" class='input'>
              <el-input v-model="projectUserForm.phone" auto-complete="off" placeholder="请输入联系电话"></el-input>
            </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click='cancelUser'>关 闭</el-button>
        <el-button type="primary" @click='submitUser'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        project_user: []
      },
      dialogFormVisibleAccounts: false,
      projectUserForm: {
        account:'',
        password:'',
        name:''
        },
      isUserEdit: false,
      project_id: "",
      userFormRulesOrigin: {
        name: [
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            required: true,
            message: "长度为2-5个字符，必须是中文",
            change: "change"
          }
        ],
        account: [
          {
            pattern: /^1[34578]\d{9}$/,
            required: true,
            message: "请输入账号，由手机号码构成",
            change: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "长度在 6-16 个字符",
            change: "change",
            min: 6,
            max: 16
          }
        ]
      }
    };
  },
  computed: {
    userFormRules() {
      if (this.projectUserForm.password == "" && this.isUserEdit == true) {
        let temp = Object.assign({}, this.userFormRulesOrigin);
        this.isAccountValid = false;
        temp.password = undefined;
        return temp;
      } else if (this.isUserEdit == true || this.isUserEdit == false) {
        let temp = Object.assign({}, this.userFormRulesOrigin);
        this.isAccountValid = true;
        return temp;
      }
    }
  },
  mounted() {
    this.project_id = this.$route.query.project_id;
    this.getAdminList();
  },
  methods: {
    async getAdminList() {
      let res = await this.api.getAdminList({ project_id: this.project_id });
      if (res.code == 200) {
        this.form.project_user = res.data;
      }
    },
    cancel() {
      this.$router.push({ name: "twoHouse" });
    },
    async enabledDisable(row) {
      let temp = {};
      temp.id = row.id;
      if (row.state == 1) {
        temp.state = 0;
      } else if (row.state == 0) {
        temp.state = 1;
      }
      let res = await this.api.adminState(temp);
      if (res.code == 200) {
        this.getAdminList();
      }
    },

    checkUserAccout(temp) {
      for (let i = 0; i < this.form.project_user.length; i++) {
        let user = this.form.project_user[i];
        if (i === this.userIndex) continue;
        if (user.account == temp.account) {
          this.$message({ type: "error", message: "该账号已存在" });
          return false;
        }
      }
      return true;
    },

    async submitUser() {
      this.$refs["projectUserForm"].validate(async valid => {
        if (valid) {
          if (this.isUserEdit) {
            this.projectUserForm.project_id = this.project_id;
            let temp = Object.assign({}, this.projectUserForm);
            let res = await this.api.updateAdminAccout(temp);
            if (res.code != 200) {
              return;
            }
          } else {
            this.projectUserForm.project_id = this.project_id;
            let temp = Object.assign({}, this.projectUserForm);
            let res = await this.api.addAdminAccout(temp);
            if (res.code != 200) {
              return;
            }
          }
          let temp = Object.assign({}, this.projectUserForm);
          if (!this.checkUserAccout(temp)) return;
          if (this.isUserEdit) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            Object.assign(this.form.project_user[this.userIndex], temp);
          } else {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.form.project_user.push(temp);
          }
          this.cancelUser();
        } else {
          return false;
        }
      });
    },

    cancelUser() {
      this.dialogFormVisibleAccounts = false;
      let originAccountsForm = this.$options.data()["projectUserForm"];
      Object.assign(this.projectUserForm, originAccountsForm);
    },
    showUser() {
      this.isUserEdit = false;
      this.projectUserForm.index = undefined;
      this.dialogFormVisibleAccounts = true;
    },
    editUser(row, index) {
      this.isUserEdit = true;
      this.dialogFormVisibleAccounts = true;
      Object.assign(this.projectUserForm, row);
      this.userIndex = index;
    },

    showState(row) {
      if (row == 0) {
        return "禁用";
      } else if (row == 1) {
        return "启用";
      }
    },
    StateBtn(row) {
      if (row == 1) {
        return "禁用";
      } else if (row == 0) {
        return "启用";
      }
    }
  }
};
</script>

