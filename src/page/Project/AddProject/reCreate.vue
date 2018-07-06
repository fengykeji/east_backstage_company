<style lang="less" scoped src="../index.less"></style>
<style lang="less">
.AddProject {
  width: 1024px;
  margin: 0 auto;
  .el-form-item.is-error {
    padding-bottom: 20px;
  }
  .el-table td,
  .el-table th {
    color: #333;
  }
  .el-form-item__label {
    float: none;
    color: #333;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-dialog {
    width: 63%;
    top: -10%;
  }
  .el-table--border,
  .el-table--group {
    margin-top: 20px;
  }
  .property_type {
    font-size: 14px;
    line-height: 40px;
    padding: 0 12px 0 0;
    color: #333;
  }
  .el-table th {
    padding: 2px 0px;
  }
  .el-table td {
    padding: 0px 0px;
  }
  .cell {
    padding: 4px 0px;
  }
  .request {
    display: inline-block;
    text-align: right;
  }
  .title-top {
    padding-top: 30px;
    text-align: left;
    position: relative;
    font-size: 20px;
    padding-bottom: 18px;
    .title-btn {
      position: absolute;
      top: 15px;
      right: 0;
    }
  }
}
</style>

<template>
  <div class="AddProject">
    <div class="AddPorject-wrapper">
      <div class='title-top'>
        <div class="title">重新申请项目信息</div>
        <span class="title-btn">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </div>
      <el-form :model="form" class='form' :rules="rules" ref="ruleForm">
        <el-form-item label="项目名称" prop="project_name" class='input'>
          <el-input v-model="form.project_name" auto-complete="off" :disabled="isDisable()" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" prop="province" class='select'>
          <!-- 下拉组建 -->
          <city-selector :disabled="isDisable()" :province.sync="form.province" :city.sync="form.city" :district.sync="form.district" @changeDistrict="changeDistrict" />
        </el-form-item>
        <el-form-item label="" prop="absolute_address" class='input'>
          <el-input id="suggestId" v-model="form.absolute_address" auto-complete="off" class='input-1' :disabled="isDisable()" placeholder="请输入具体地址"></el-input>
          <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
        </el-form-item>
        <!-- 地图 -->
        <!-- <el-button type="text" :disabled="isDisable()" @click='showMapDetails'>查看地图</el-button> -->

        <div id="map" class='map'></div>

        <!-- 物业类型 -->
        <div class="property_type">物业类型</div>
        <el-form-item prop="property_type">
          <el-checkbox :disabled="operationType===2" v-model="form.property_type" v-for="item in typeOptions" :key="item.param_id" :label="item.param_id">{{item.param}}</el-checkbox>
        </el-form-item>

        <el-form-item label="开发商" prop="developer_name" class='input1'>
          <el-input :disabled="operationType==2" v-model="form.developer_name" auto-complete="off" placeholder="请输入开发商名称"></el-input>
        </el-form-item>
        <el-form-item label="与项目关系" prop="company_relation" class='select'>
          <el-radio-group :disabled="operationType==2" v-model="form.company_relation">
            <el-radio label="开发商"></el-radio>
            <el-radio label="代理"></el-radio>
            <el-radio label="分销"></el-radio>
            <el-radio label="渠道"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结佣单位" prop="statement_company" class='input'>
          <el-input :disabled="operationType==2" v-model="form.statement_company" auto-complete="off" placeholder="请输入结佣单位名称"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" prop="project_hold_name" class='input'>
          <el-input :disabled="operationType==2" v-model="form.project_hold_name" auto-complete="off" placeholder="请输入项目负责人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="project_hold_phone" class='input'>
          <el-input :disabled="operationType==2" v-model="form.project_hold_phone" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" class='textarea'>
          <el-input :disabled="operationType==2" v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class='tableIn-btn'>
        <el-button type="primary" v-if="operationType==3" @click='showUser'>新增账号</el-button>
      </div>
      <!-- 用户显示 -->
      <el-table :data="form.project_user" border>
        <el-table-column property="account" label="帐号" align='center'></el-table-column>
        <el-table-column property="name" label="对接人" align='center'></el-table-column>
        <!-- <el-table-column property="phone" label="电话号码" align='center'></el-table-column> -->
        <el-table-column property="operation" v-if="operationType == 1||operationType == 3" label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type="text" @click='editUser(scope.row , scope.$index)'>修改</el-button>
            <el-button type="text" v-if="operationType == 1||operationType == 3" @click='removeUser(scope.$index)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 附件上传 -->
      <div>
        <el-upload class="uploadFile" :auto-upload="false" action="" :on-change="fileUpload">
          <el-button class="uploadBtn" ref="uploadBtn" size="small" type="primary" :show-file-list="false">点击上传</el-button>
        </el-upload>
      </div>
      <div class='tableIn-btn' v-if="operationType == 0||operationType == 3">
        <el-button type="primary" @click='showUploadFile'>附件上传</el-button>
      </div>
      <el-table :data="form.project_agreement" border>
        <el-table-column property="file_name" label="文件名称" align='center'></el-table-column>
        <el-table-column label="附件" align='center'>
          <template slot-scope='scope'>
            <a target="_blank" :href="this.base + scope.row.url">查看附件</a>
          </template>
        </el-table-column>
        <el-table-column property="create_name" label="上传人员" align='center'></el-table-column>
        <el-table-column property="create_time" label="上传时间" align='center'></el-table-column>
      </el-table>
      <div>
        <div v-if="operationType==2">
          <div class='num_set'>审核项目信息</div>
          <el-form :model="form" class='form' :disabled="isDisable()">
            <el-form-item label="审核人员" class='inputAud'>
              <el-input v-model="auditing_info.auditing_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="审核时间" class='inputAud'>
              <el-input v-model="auditing_info.auditing_time" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="审核状态" class='inputAud state'>
              {{auditingState(auditing_info.check_state)}}
            </el-form-item>
            <el-form-item label="备注" class='textarea'>
              <el-input type="textarea" v-model="auditing_info.auditing_remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="operationType==2">
          <div class='num_set'>认证信息</div>
          <el-form v-model="authentication_info" class='form'>
            <el-form-item label="保证金金额（￥）：" class='inputAud'>
              <el-input v-model="authentication_info.deposit" auto-complete="off" :disabled="isDisable()"></el-input>
            </el-form-item>
            <el-form-item label="未结佣金总额（￥）：" class='inputAud'>
              <el-input v-model="authentication_info.no_price" auto-complete="off" :disabled="isDisable()"></el-input>
            </el-form-item>
            <el-form-item label="可退金额（￥）：" class='inputAud'>
              <el-input v-model="authentication_info.allow" auto-complete="off" :disabled="isDisable()"></el-input>
            </el-form-item>
            <el-form-item label="项目状态" class='inputAud state'>
              {{projectState(authentication_info.authentication_state)}}
            </el-form-item>
            <el-form-item class='request'>
              <el-button type="primary" @click="requestRefund()" :disabled="operationType===2" v-if='authentication_info.deposit>0'>申请退款</el-button>
            </el-form-item>
            <div class='num_details'>保证金详情</div>
            <el-table :data='authentication_info.business_log' border>
              <el-table-column label="序号" align='center' width="70px">
                <template slot-scope="scope">{{getIndex(scope)}}</template>
              </el-table-column>
              <el-table-column property="drawee" label="付款户名" align='center'></el-table-column>
              <el-table-column property="payee" label="收款户名" align='center'></el-table-column>
              <el-table-column property="price" label="金额（￥）" align='center'></el-table-column>
              <el-table-column property="contact_name" label="联系人" align='center'></el-table-column>
              <el-table-column property="contact_phone" label="联系电话" align='center' width="120px"></el-table-column>
              <el-table-column prop="type" label="类型" align='center'>
                <template slot-scope="scope">{{authenticationType(scope.row.type)}}</template>
              </el-table-column>
              <el-table-column prop="state" label="状态" align='center'>
                <template slot-scope="scope">{{auditingState(scope.row.state)}}</template>
              </el-table-column>
              <el-table-column property="create_name" label="交易人" align='center'></el-table-column>
              <el-table-column property="create_time" label="交易时间" align='center' width="150px"></el-table-column>
              <el-table-column property="operation" label="操作" align='center' width="80px" v-if="operationType==1">
                <template slot-scope="scope">
                  <el-button type="text" @click="seeRefund(scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
        <div v-if="operationType==2" :disabled="operationType===2">
          <div class='num_set'>项目历史</div>
          <el-table :data="project_history" border>
            <el-table-column property="nub" label="序号" align='center' width="70px">
              <template slot-scope="scope">{{getIndex(scope)}}</template>
            </el-table-column>
            <el-table-column property="company_name" label="公司名称" align='center'></el-table-column>
            <el-table-column property="company_relation" label="与项目关系" align='center'></el-table-column>
            <el-table-column property="s_time" label="开始时间" align='center'></el-table-column>
            <el-table-column property="e_time" label="结束时间" align='center'></el-table-column>
            <el-table-column property="project_hold_name" label="负责人" align='center'></el-table-column>
            <el-table-column property="project_hold_phone" label="联系方式" align='center'></el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 帐号添加 -->
      <el-dialog title="新建账号" :visible.sync="dialogFormVisibleAccounts" class='tableUser' @close="cancelUser">
        <el-form :model="projectUserForm" :rules="userFormRules" ref="projectUserForm">
          <el-form-item label="设定帐号" prop="account" class='input'>
            <el-input v-model="projectUserForm.account" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="设定密码" prop="password" class='input'>
            <el-input v-model="projectUserForm.password" auto-complete="off" type='password' placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="管理员" prop="name" class='input'>
            <el-input v-model="projectUserForm.name" auto-complete="off" placeholder="请输入管理员"></el-input>
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
      <!-- 暂时未使用 -->
      <!-- <el-dialog  title="可退金额" :visible.sync="refundShow"  class='tableRefund' @close="">
    <div>可退金额=保证金总额-为结佣金额-曾退款金额</div>
    <div>9000=10000-1000-0</div>
      <el-button type='text' class='text'>缴款记录</el-button>
     <el-table :data="paymentRecord" border>
              <el-table-column property="nub" label="序号" align='center'></el-table-column>
              <el-table-column property="drawee" label="付款户名" align='center'></el-table-column>
              <el-table-column property="payee" label="收款户名" align='center'></el-table-column>
              <el-table-column property="price" label="金额（￥）" align='center'></el-table-column>
              <el-table-column property="create_time" label="交易时间" align='center'></el-table-column>
     </el-table>
     <div>保证金总额：{{}}</div>
  </el-dialog> -->
    </div>
  </div>
</template>


<script>
import CitySelector from "../../../components/CitySelector";
export default {
  data() {
    return {
      rules: {
        project_name: [
          {
            required: true,
            message: "请输入项目名称,长度为2-20个字符",
            change: "change",
            min: 2,
            max: 20
          }
        ],
        property_type: [
          {
            type: "array",
            required: true,
            message: "请选择物业类型",
            change: "change"
          }
        ],
        statement_company: [
          {
            required: true,
            message: "请输入结佣单位,长度为2-20个字符",
            change: "change",
            min: 2,
            max: 20
          }
        ],
        province: [
          { required: true, message: "请选择具体地址", change: "change" }
        ],
        absolute_address: [
          { required: true, message: "请输入具体地址", change: "change" }
        ],
        developer_name: [
          {
            required: true,
            message: "请输入开发商名字,长度为2-20个字符",
            change: "change",
            min: 2,
            max: 20
          }
        ],
        project_hold_name: [
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            required: true,
            message: "请输入负责人姓名,长度为2-5个字符，，必须是中文",
            change: "change"
          }
        ],
        project_hold_phone: [
          {
            required: true,
            message: "请输入正确的电话号码格式",
            change: "change",
            pattern: /^1[34578]\d{9}$/
          }
        ],
        company_relation: [
          { required: true, message: "请选择公司与项目关系", change: "change" }
        ]
      },
      userFormRules: {
        name: [
          {
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/,
            required: true,
            message: "请输入管理员姓名，长度在2-5个字符，必须是中文",
            change: "change"
          }
        ],
        account: [
          {
            required: true,
            message: "请输入账号,由手机号构成",
            change: "change",
            pattern: /^1[34578]\d{9}$/
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码,长度在6-16个字符",
            change: "change",
            min: 6,
            max: 16
          }
        ]
      },
      form: {
        district: "",
        province: "",
        city: "",
        statement_company: "",
        project_hold_phone: "",
        latitude: "",
        longitude: "",
        project_name: "",
        absolute_address: "",
        property_type: [],
        developer_name: "",
        project_hold_name: "",
        company_relation: "",
        remark: "",
        project_id: "",
        project_agreement: [],
        project_user: []
      },
      map: null,
      sendata: {},
      gridData: [],
      historicalRecords: [],
      UserShow: [],
      Enclosure: [],
      dialogFormVisibleAccounts: false,
      showMap: false,
      isUserEdit: false,
      refundShow: false,
      isEditProjectList: false,
      paymentRecordTable: false,
      auditOptions: [],
      options: [
        {
          value: "选项1",
          label: "区域"
        }
      ],
      value: "",
      projectUserForm: {
        name: "",
        account: "",
        password: "",
        phone: ""
      },
      auditing_info: {
        auditing_name: "",
        auditing_time: "",
        auditing_remark: "",
        check_state: ""
      },
      paymentRecord: [],
      refund: [],
      userObj: {},
      fileObject: {},
      operationType: 0, //0 新增  1 修改  2 查看
      addEditDelete: 0, //0 无新增  1 无修改  2 无查看
      project: [],
      typeOptions: [],
      project_history: [],
      projectHistory: {
        company_id: "",
        s_time: "",
        e_time: "",
        project_hold_phone: "",
        project_hold_name: "",
        company_relation: "",
        project_id: "",
        company_name: ""
      },
      authentication_info: {
        business_log: []
      },
      businessLogForm: {
        deposit: "",
        authentication_state: "",
        no_price: "",
        business_log: [
          {
            payee: "",
            drawee: "",
            contact_name: "",
            contact_phone: "",
            create_name: "",
            create_time: "",
            price: "",
            type: ""
          }
        ]
      },
      projectAgreement: {
        file_name: "",
        url: "",
        create_name: "",
        create_time: ""
      },
      userIndex: 0
    };
  },
  mounted() {
    this.operationType = this.$route.params.operationType;
    if (this.operationType === undefined) {
      this.$router.push({ name: "project" });
      return;
    }
    this.form.project_id = this.$route.params.project_id;
    if (this.form.project_id) {
      this.getProjectInfo();
    } else {
      this.$nextTick(() => {
        this.initMap();
      });
    }
    this.getType();
  },
  methods: {
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    async requestRefund() {
      this.$router.push({
        name: "requestRefund",
        params: {
          operationType: this.$route.params.operationType,
          project_id: this.$route.params.project_id,
          allow: this.authentication_info.allow
        }
      });
    },
    seeRefund(row) {
      let name = "";
      // type 1为缴纳 2为退款  缴纳金额 金额 +  退款 金额-
      if (row.type == 1) {
        name = "payRecord";
      } else if (row.type == 2) {
        name = "refundInfo";
      }
      this.$router.push({
        name: name,
        params: {
          operationType: this.$route.params.operationType,
          project_id: this.$route.params.project_id,
          id: row.id
        }
      });
    },
    isDisable() {
      if (this.operationType == 3) {
        return false;
      } else {
        return true;
      }
    },
    async getProjectInfo() {
      let res = await this.api.getProjectInfo({
        project_id: this.form.project_id
      });
      if (res.code == 200) {
        let temp = { ...res.data.project };
        temp.property_type = [];
        temp.project_user = res.data.project_admin;
        temp.project_agreement = res.data.project_agreement;
        this.authentication_info = res.data.authentication_info;
        this.auditing_info = res.data.auditing_info;
        this.project_history = res.data.project_history;
        for (let type of res.data.project.property_type) {
          temp.property_type.push(type.property_tag_id);
        }
        Object.assign(this.form, temp);
        console.log(temp, this.form);
        this.$nextTick(() => {
          this.initMap(temp);
        });
      }
    },
    async submit() {
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          if (this.operationType == 3) {
            let temp = {};
            temp.project_id = this.form.project_id;
            temp.project_name = this.form.project_name;
            temp.province = this.form.province;
            temp.city = this.form.city;
            temp.district = this.form.district;
            temp.absolute_address = this.form.absolute_address;
            temp.longitude = this.form.longitude;
            temp.latitude = this.form.latitude;
            temp.property_type = this.form.property_type;
            temp.developer_name = this.form.developer_name;
            temp.company_relation = this.form.company_relation;
            temp.project_hold_name = this.form.project_hold_name;
            temp.project_hold_phone = this.form.project_hold_phone;
            temp.remark = this.form.remark;
            temp.statement_company = this.form.statement_company;

            let res = await this.api.reCreateProject(temp);
            if (res.code == 200) {
              this.$message({ type: "success", message: "保存成功" });
              setTimeout(() => {
                this.$router.push({ name: "project" });
              }, 2000);
            }
          } else {
            let res = await this.api.getCreateProject(this.form);
            if (res.code == 200) {
              this.$message({ type: "success", message: "保存成功" });
              setTimeout(() => {
                this.$router.push({ name: "project" });
              }, 2000);
            }
          }
        } else {
          return false;
        }
      });
    },

    cancel() {
      this.$router.push({ name: "project" });
    },
    async submitUser() {
      this.$refs["projectUserForm"].validate(async valid => {
        if (valid) {
          if (this.operationType == 1) {
            if (this.isUserEdit) {
              this.projectUserForm.project_id = this.form.project_id;
              let temp = Object.assign({}, this.projectUserForm);
              let res = await this.api.updateProjectAdmin(temp);
              if (res.code != 200) {
                return;
              }
            } else {
              this.projectUserForm.project_id = this.form.project_id;
              let temp = Object.assign({}, this.projectUserForm);
              let res = await this.api.addProjectAdmin(temp);
              if (res.code != 200) {
                return;
              }
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
    removeUser(index) {
      this.form.project_user.splice(index, 1);
    },
    cancelUser() {
      this.dialogFormVisibleAccounts = false;
      let originAccountsForm = this.$options.data()["projectUserForm"];
      Object.assign(this.projectUserForm, originAccountsForm);
    },
    showUser() {
      this.isUserEdit = false;
      this.dialogFormVisibleAccounts = true;
    },
    editUser(row, index) {
      this.isUserEdit = true;
      this.dialogFormVisibleAccounts = true;
      Object.assign(this.projectUserForm, row);
      this.userIndex = index;
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
    auditingState(row) {
      if (row == 0) {
        return "拒绝";
      } else if (row == 1) {
        return "通过";
      } else if (row == 2) {
        return "待审核";
      }
    },
    authenticationType(row) {
      if (row == 1) {
        return "缴纳";
      } else if (row == 2) {
        return "退款";
      }
    },
    projectState(row) {
      if (row == 0) {
        return "禁用";
      } else if (row == 1) {
        return "管理中";
      } else if (row == 2) {
        return "已转新房";
      } else if (row == 3) {
        return "已转二手房";
      }
    },

    showUploadFile() {
      let btn = document.querySelector(".uploadBtn");
      btn.click();
    },

    async fileUpload(fileObj) {
      this.fileObject = fileObj;
      let flag = false;
      if (
        this.fileObject.name.indexOf(".docx") > -1 ||
        this.fileObject.name.indexOf(".xlcx") > -1 ||
        this.fileObject.name.indexOf(".doc") > -1 ||
        this.fileObject.name.indexOf(".jpg") > -1 ||
        this.fileObject.name.indexOf(".zip") > -1 ||
        this.fileObject.name.indexOf(".rar") > -1 ||
        this.fileObject.name.indexOf(".csv") > -1 ||
        this.fileObject.name.indexOf(".png") > -1 ||
        this.fileObject.name.indexOf(".pdf") > -1
      ) {
        flag = true;
      }
      if (!flag) {
        this.$message({
          type: "error",
          message:
            "文件上传格式有误，请上传docx,doc,xlcx,jpg,zip,rar,csv,png,pdf格式"
        });
        return;
      }
      let file = this.fileObject.raw;
      let formData = new FormData();
      formData.append("url", file);
      let res = await this.api.uploadProjectAgreement(formData);
      if (res.code == 200) {
        let projectAgreementTemp = {};
        projectAgreementTemp.create_time = res.data.create_time;
        projectAgreementTemp.create_name = res.data.create_name;
        projectAgreementTemp.url = res.data.img_url;
        projectAgreementTemp.file_name = fileObj.name;
        this.form.project_agreement = [];
        this.form.project_agreement.push(projectAgreementTemp);
      }
      this.getProjectList();
    },

    showMapDetails() {
      let row = document.querySelector(".map");
      row.classList.toggle("active");
    },

    auditStatus() {},
    initMap(row) {
      if (!this.map) {
        this.map = new BMap.Map("map");
      }
      this.map.addControl(new BMap.NavigationControl());
      this.map.enableScrollWheelZoom(true);
      if (row) {
        var point = new BMap.Point(row.longitude, row.latitude);
        this.map.centerAndZoom(point, 15);
        this.map.clearOverlays();
        this.map.addOverlay(new BMap.Marker(point));
      } else {
        var point = new BMap.Point(116.404, 39.915);
        this.map.centerAndZoom(point, 15);
      }

      // this.map.addEventListener("click", e => {
      //   //移除旧坐标
      //   this.map.clearOverlays();
      //   //获得新坐标
      //   let lng = e.point.lng; //经度
      //   let lat = e.point.lat; //纬度
      //   this.form.longitude = lng;
      //   this.form.latitude = lat;
      //   var myGeo = new BMap.Geocoder();
      //   myGeo.getLocation(new BMap.Point(lng, lat), result => {
      //     if (result) {
      //       this.form.absolute_address = result.address;
      //       this.map.addOverlay(new BMap.Marker(new BMap.Point(lng, lat)));
      //     }
      //   });
      // });
      if (this.operationType == 1 || this.operationType == 2) {
        return;
      }
      let ac = new BMap.Autocomplete({
        input: "suggestId",
        location: this.map
      });
      suggestId.value = this.form.absolute_address;
      function G(id) {
        return document.getElementById(id);
      }

      ac.addEventListener("onhighlight", function(e) {
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str =
          "FromItem<br />index = " +
          e.fromitem.index +
          "<br />value = " +
          value;

        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value =
            _value.province +
            _value.city +
            _value.district +
            _value.street +
            _value.business;
        }
        str +=
          "<br />ToItem<br />index = " +
          e.toitem.index +
          "<br />value = " +
          value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;

      ac.addEventListener("onconfirm", e => {
        //鼠标点击下拉列表后的事件
        let address = e.item.value;
        let addressStr = address.city + address.district + address.business;
        this.form.absolute_address = addressStr;
        var myGeo = new BMap.Geocoder();
        myGeo.getPoint(
          addressStr,
          point => {
            if (point) {
              let lng = point.lng; //经度
              let lat = point.lat; //纬度
              this.form.longitude = lng;
              this.form.latitude = lat;
              this.map.centerAndZoom(point, 16);
              this.map.addOverlay(new BMap.Marker(point));
            } else {
              alert("您选择地址没有解析到结果!");
            }
          },
          address.city
        );
      });
    },
    changeDistrict(address) {
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(address, point => {
        if (point) {
          this.map.centerAndZoom(point, 16);
        }
      });
    },
    sumbitRefund() {
      this.refundShow = true;
    },
    cancelRefund() {
      this.refundShow = false;
    },

    async getType() {
      let res = await this.api.getTags();
      if (res.code == 200) {
        this.typeOptions = res.data;
      }
    }
  },
  components: {
    CitySelector: CitySelector
  }
};
</script>

