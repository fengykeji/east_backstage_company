<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.agent {
  .el-table thead {
    color: #333;
  }
  .el-table th {
    padding: 8px 5px;
  }
  .el-table td {
    padding: 0;
  }
  .title {
    background-color: #fafafc;
    text-align: left;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    .left {
      text-align: left;
      .text1 {
        padding-top: 10px;
        margin: 10px 0 12px 20px;
      }
    }
  }
  .el-dialog__body {
    padding: 0px 20px 20px 20px;
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
      <div class='left'>
        <div class='text1'>当前位置：经纪人管理 ➟ 在职经纪人</div>
        <div class="search-block">
          <el-input v-model="searchObj.search" class='query' placeholder="可查询云算号/经纪人姓名"></el-input>
          <el-button @click="search()" icon="el-icon-search" circle></el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData" class="mt-20" border style="width: 100%">
      <el-table-column prop="" label="序号" align='center' width="70px">
        <template slot-scope="scope">{{getIndex(scope)}}</template>
      </el-table-column>
      <el-table-column prop="account" label="云算号" align='center' width="100px"></el-table-column>
      <el-table-column prop="name" label="名称" align='center'></el-table-column>
      <el-table-column label="性别" align='center'>
        <template slot-scope="scope">{{getSex(scope.row.sex)}}</template>
      </el-table-column>
      <!-- <el-table-column prop="x" label="年龄" align='center' width="70px"></el-table-column> -->
      <el-table-column prop="tel" label="联系方式" align='center'></el-table-column>
      <el-table-column prop="store_type" label="角色" align='center'></el-table-column>
      <!-- <el-table-column prop="department" label="曾任职" align='center' width="140px"></el-table-column> -->
      <!-- <el-table-column prop="city_name" label="是否有专业证书" align='center' width="140px"></el-table-column> -->
      <el-table-column prop="is_staff" label="是否为员工" align='center'></el-table-column>
      <!-- <el-table-column prop="entry_time" label="申请时间" align='center'></el-table-column> -->
      <!-- <el-table-column prop="entry_time" label="审核次数" align='center' width="90px"></el-table-column> -->
      <el-table-column label="操作" align='center' width="140px">
        <template slot-scope="scope">
          <el-button type="text" @click='showQuit(scope.row)'>离职</el-button>
          <el-button type="text" @click='showSee(scope.row)'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
    </el-pagination>

    <el-dialog title="离职申请" :visible.sync="dialogFormVisible" class='dialog' @close="cancel">
      <el-form :model="form">
        <el-form-item label="离职原因">
          <el-input v-model="form.remark" class='textarea' type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sumbit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看详情" :visible.sync="showInfo" class='dialog'>
      <div class='showInfo'>
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
            <div>入职时间</div>
            <div class='border'>{{examinePeople.entry_time}}</div>
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
            <div class='border1'>{{examinePeople.city_name+examinePeople.district_name+examinePeople.absolute_address}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>身份证号码</div>
            <div class='border'>{{examinePeople.id_card}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>绑定银行</div>
            <div class='border'>{{examinePeople.bank_name}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>银行卡号</div>
            <div class='border'>{{examinePeople.bank_card}}</div>
          </el-form-item>
          <el-form-item class='input1'>
            <div>证件照片</div>
            <div class='border  img'>
              <span>(证件照片为正反两面)</span>
              <el-button type='text' @click='seeIdCard'>点击查看</el-button>
            </div>
          </el-form-item>
          <el-form-item class='input2'>
            <div>个人介绍</div>
            <div class='border height'>{{examinePeople.slef_desc}}</div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="工牌照照片" :visible.sync="showImgUrl">
      <img class='heightWidth' v-if='examinePeople.img_url' :src="this.base + examinePeople.img_url" />
      <img class='heightWidth' v-else src="../../assets/images/head.png" />
    </el-dialog>
    <el-dialog title="证件照照片" :visible.sync="showIdCard" class='showIdCard'>
      <img class='heightWidth' v-if='examinePeople.card_front' :src="this.base + examinePeople.card_front" />
      <img class='heightWidth' v-else src="../../assets/images/idCard.png" />
      <img class='heightWidth' v-if='examinePeople.card_back' :src=" + examinePeople.card_back" />
      <img class='heightWidth' v-else src="../../assets/images/Document_2@2x.png" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchObj: {
        search: "",
        page: 1
      },
      pageSize: 0,
      total: 0,
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
        remark: "",
        agent_id: ""
      },
      showImgUrl: false,
      showIdCard: false
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    seeimgUrl() {
      this.showImgUrl = true;
    },
    seeIdCard() {
      this.showIdCard = true;
    },
    async sumbit() {
      let res = await this.api.quitAgentStore(this.form);
      if (res.code == 200) {
        this.$message({ type: "success", message: "离职成功" });
        this.search();
        this.cancel();
      }
    },
    async showSee(row) {
      this.showInfo = true;
      let res = await this.api.getAgentStoreInfo({
        agent_id: row.agent_id,
        id: row.id
      });
      if (res.code == 200) {
        Object.assign(this.examinePeople, res.data);
      }
    },
    getSex(row) {
      if (row == 1) {
        return "男";
      } else if (row == 2) {
        return "女";
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
      this.form.agent_id = row.agent_id;
      this.dialogFormVisible = true;
    },
    showCancel() {
      this.showInfo = false;
    },
    cancel() {
      Object.assign(this.form, this.$options.data()["form"]);
      this.dialogFormVisible = false;
    },
    pageChange(page) {
      this.search(page);
    },
    getIndex(row) {
      let index = row.$index + 1 + (this.searchObj.page - 1) * this.pageSize;
      return index;
    },
    async search(page) {
      if (page) {
        this.searchObj.page = page;
      } else {
        this.searchObj.page = 1;
      }
      let res = await this.api.getAgentStorePassList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    }
  }
};
</script>


