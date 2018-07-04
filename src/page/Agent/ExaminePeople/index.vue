<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
.examinePeople {
  .el-table thead {
    color: #333;
  }
  .el-table th {
    padding: 8px 5px;
  }
  .el-table td {
    padding: 0;
  }
  .dialog {
    text-align: left;
    position: fixed;
    top: -10%;
    left: 0;
    .el-dialog__title {
      font-size: 26px;
    }
    .el-dialog__body {
      padding: 0px 20px 20px 20px;
    }
    .el-form-item {
      margin: 0;
    }
    .btn {
      position: absolute;
      right: 0;
      top: 15px;
      margin-right: 20px;
    }
    .num_set {
      font-size: 18px;
      padding: 5px 0;
    }
    .border {
      width: 140px;
      height: 35px;
      border: 1px solid#bbb;
      border-radius: 6px;
      padding-left: 10px;
    }
    .border.img {
      border: none;
    }
    .el-form-item__content {
      text-align: left;
    }
    .border.img {
      width: 240px;
      border: none;
      .text {
        padding-right: 20px;
        font-size: 14px;
      }
    }
    .border.height {
      height: 70px;
      width: 400px;
    }
    .border.width {
      width: 340px;
    }
    .input1 {
      display: inline-block;
      padding-right: 30px;
      text-align: left;
      vertical-align: top;
    }
    .img-text {
      display: inline-block;
      vertical-align: top;
    }
    .showImg {
      width: 800px;
      position: fixed;
      top: 20%;
      left: 30%;
    }
  }
}
</style>

<template>
  <div class='examinePeople'>
    <div class='title'>
      <div class='left'>
        <div class='text1'>当前位置：审核经纪人</div>
        <div class="left">
          <el-button class='tip' :class="tipActiveIndex==1?'active':''" type="text" @click="clickTip(1)">全部</el-button>
          <el-button class='tip' :class="tipActiveIndex==2?'active':''" type="text" @click="clickTip(2)">待审核</el-button>
          <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">审核未通过</el-button>
          <div class="search-block">
            <el-input class='query' v-model="searchObj.search" placeholder="可查询云算号/经纪人姓名"></el-input>
            <el-button icon="el-icon-search" circle @click='getExList'></el-button>
          </div>
        </div>
      </div>
    </div>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="" label="序号" align='center' width="70px">
          <template slot-scope="scope">{{getIndex(scope)}}</template>
        </el-table-column>
        <el-table-column prop="account" label="云算号" align='center'></el-table-column>
        <el-table-column prop="name" label="经纪人姓名" align='center' width="110px"></el-table-column>
        <el-table-column prop="tel" label="联系方式" align='center' width="110px"></el-table-column>
        <el-table-column prop="role" label="角色" align='center'>
          <template slot-scope="scope">{{getRole(scope.row.role)}}</template>
        </el-table-column>
        <el-table-column prop="project_name" label="申请项目" align='center'></el-table-column>
        <el-table-column prop="department" label="所属部门" align='center'></el-table-column>
        <!-- <el-table-column prop="position" label="职位" align='center'></el-table-column> -->
        <el-table-column prop="city_name" label="城市" align='center'></el-table-column>
        <el-table-column prop="district_name" label="区域" align='center'></el-table-column>
        <el-table-column prop="state" label="审核状态" align='center'>
          <template slot-scope="scope">{{auditingState(scope.row.state)}}</template>
        </el-table-column>
        <!-- <el-table-column prop="remark" label="备注" align='center' width="160px"></el-table-column> -->
        <el-table-column prop="entry_time" label="申请时间" align='center'></el-table-column>
        <el-table-column label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type="text" @click='examine(scope.row)' v-if='scope.row.state==2'>审核</el-button>
            <el-button type="text" @click='showSee(scope.row)' v-if='scope.row.state==0'>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
      <el-dialog title="审核" :visible.sync="dialogFormVisible" class='dialog' @close="cancel">
        <div class='btn'>
          <el-button type='primary' @click="check(1)" v-if="operationType==0">审核通过</el-button>
          <el-button type='primary' @click="showCheck(0)" v-if="operationType==0">审核不通过</el-button>
          <el-button type='primary' @click='cancel'>关闭</el-button>
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
            <div>申请时间</div>
            <div class='border'>{{examinePeople.entry_time}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>申请项目</div>
            <div class='border'>{{examinePeople.project_name}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>工牌照片</div>
            <div class='border  img'>
              <span>(工牌照片)</span>
              <el-button type='text' @click='seeimgUrl'>点击查看</el-button>
            </div>
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
            <div class='border'>{{examinePeople.birth}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>通讯地址</div>
            <div class='border width'>{{examinePeople.city_name+examinePeople.district_name+examinePeople.absolute_address}}</div>
          </el-form-item>
          <div class='num_set'>审核信息</div>
          <el-form-item class='input1'>
            <div>审核人员</div>
            <div class='border'>{{examinePeople.auditing_name}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>审核时间</div>
            <div class='border'>{{examinePeople.auditing_time}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>备注</div>
            <div class='border height'>{{examinePeople.remark}}</div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="拒绝" :visible.sync="refuseInfo" class='dialog' @close="cancelRefuseInfo">
        <el-form>
          <el-form-item label="审核不通过原因">
            <el-input v-model="remark" class='textarea' type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelRefuseInfo">取 消</el-button>
          <el-button type="primary" @click="check(0)">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="工牌照照片" :visible.sync="showImgUrl">
        <img class='heightWidth' v-if='examinePeople.img_url' :src="this.base + examinePeople.img_url" />
        <img class='heightWidth' v-else src="../../../assets/images/head.png" />
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
        tag_search: "",
        search: "",
        page: 1
      },
      pageSize: 0,
      total: 0,
      tipActiveIndex: 1,
      dialogFormVisible: false,
      refuseInfo: false,
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
        absolute_address: "",
        city_name: "",
        district_name: "",
        agent_id: null,
        project_id: null,
        id: null,
        remark: ""
      },
      showImgUrl: false,
      submitForm: {},
      remark: "",
      operationType: 0 //0审核  1 查看
    };
  },

  mounted() {
    this.getExList();
  },
  methods: {
    showCheck(type) {
      this.refuseInfo = true;
    },
    seeimgUrl() {
      this.showImgUrl = true;
    },
    async check(type) {
      this.submitForm.type = type;
      let temp = Object.assign({}, this.submitForm);
      if (type == 0) {
        this.$confirm("此操作将审核不通过, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            temp.remark = this.remark;
            let res = await this.api.exPeople(temp);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "审核不通过成功!"
              });
            }
            this.getExList();
            this.cancelRefuseInfo();
            this.cancel();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核不通过"
            });
          });
      } else {
        this.$confirm("此操作将审核成功, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let res = await this.api.exPeople(temp);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "审核成功!"
              });
            }
            this.getExList();
            this.cancelRefuseInfo();
            this.cancel();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    },
    async examine(row) {
      this.operationType = 0;
      this.dialogFormVisible = true;
      this.examinePeople = row;
      this.submitForm.project_id = row.project_id;
      this.submitForm.agent_id = row.agent_id;
      this.submitForm.id = row.id;
      let res = await this.api.getExInfo(this.examinePeople);
      if (res.code == 200) {
        Object.assign(this.examinePeople, res.data);
      }
    },
    async showSee(row) {
      this.operationType = 1;
      this.dialogFormVisible = true;
      Object.assign(this.examinePeople, row);
      let res = await this.api.getRefuseInfo(this.examinePeople);
      if (res.code == 200) {
        this.examinePeople = res.data;
      }
    },
    getRole(row) {
      if (row == 1) {
        return "经纪人";
      } else if (row == 2) {
        return "对接人";
      }
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
    cancel() {
      this.dialogFormVisible = false;
    },
    cancelRefuseInfo() {
      this.refuseInfo = false;
      this.remark = "";
    },
    async getExList() {
      let res = await this.api.getExList(this.searchObj);
      if ((res.code = 200)) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.getExList();
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    clickTip(index) {
      this.tipActiveIndex = index;
      this.searchObj.tag_search = index;
      this.search();
    },
    search() {
      this.searchObj.page = 1;
      this.getExList();
    }
  }
};
</script>


