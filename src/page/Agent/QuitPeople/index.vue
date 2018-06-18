<style lang="less" scoped src='./index.less'>
.quitPeople {
 
}
</style>
<template>
    <div class='quitPeople'>
        <div class='title'>
            <span class='left'>
                <div class='text1'>当前位置：离职经纪人</div>
            </span>
                 <el-input class='query'></el-input>
                <el-button icon="el-icon-search" circle></el-button>
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="" label="序号"  align='center'> </el-table-column>
    <el-table-column  prop="account"  label="云算号"  align='center' width="120px"></el-table-column>
    <el-table-column  prop="name" label="名称" align='center'></el-table-column>
    <el-table-column  prop="tel" label="联系方式" align='center' width="120px"></el-table-column>
    <el-table-column  prop="project_name" label="申请项目" align='center'></el-table-column>
    <el-table-column  prop="role" label="角色" align='center'>
        <template slot-scope="scope">{{getRole(scope.row.role)}}</template>
    </el-table-column>
    <el-table-column  prop="department" label="所属部门" align='center'></el-table-column>
    <el-table-column  prop="position" label="职位" align='center'></el-table-column>
    <el-table-column  prop="city" label="城市" align='center'></el-table-column>
    <el-table-column  prop="district" label="区域" align='center'></el-table-column>
    <el-table-column  prop="state" label="审核状态" align='center'>
        <template slot-scope="scope">{{auditingState(scope.row.state)}}</template>
    </el-table-column>
    <el-table-column  prop="entry_time" label="入职时间" align='center'></el-table-column>
    <el-table-column  prop="create_time" label="离职时间" align='center'></el-table-column>
    <el-table-column  prop="remark" label="离职原因" align='center' width="200px"></el-table-column>
    <el-table-column  label="操作" align='center'>
         <template slot-scope="scope">
                <el-button type="text" @click='showSee(scope.row)'>查看</el-button>
         </template>
    </el-table-column>
  </el-table>
   <el-dialog title="查看" :visible.sync="dialogFormVisible" class='dialog' @close="cancel">
        <div class='btn'>
          <el-button type='primary' @click='cancel'>关闭</el-button>
        </div>
             <div class='num_set'>员工信息</div>
             <el-form v-model="examinePeople">
                <el-form-item class='input1'>
                  <div>姓名</div>
                 <div class='border'>{{examinePeople.name}}</div>
                </el-form-item>
               <el-form-item  class='input1'>
                    <div>角色</div>
                    <div class='border'>
                      {{role(examinePeople.role)}}
                    </div>
                </el-form-item>
                <el-form-item  class='input1'>
                    <div>云算号</div>
                    <div class='border'>{{examinePeople.account}}</div>
                </el-form-item>
                <el-form-item  class='input1'>
                    <div>所属部门</div>
                    <div class='border'>{{examinePeople.department}}</div>
                </el-form-item>
                <el-form-item  class='input1'>
                    <div>职位</div>
                    <div class='border'>{{examinePeople.position}}</div>
                </el-form-item>
                <el-form-item  class='input1'>
                    <div>工牌照片</div>
                    <div class='border  img'>
                        <span class='text'>(证件照片为正反两面)</span>
                            <el-button type='text' @click='showImgUrl'>点击查看</el-button>
                    </div>
                </el-form-item>
                <el-form-item  class='input1'>
                    <div>入职时间</div>
                    <div class='border'>{{examinePeople.entry_time}}</div>
                </el-form-item>
                 <el-form-item  class='input1'>
                     <div>当前状态</div>
                    <div class='border'>{{examinePeople.project_name}}</div>
                </el-form-item>
                <div class='num_set'>基础信息</div>
                 <el-form-item  class='input1'>
                    <div>性别</div>
                    <div class='border'>
                        {{sex(examinePeople.sex)}}
                    </div>
                </el-form-item>
                <el-form-item  class='input1'>
                    <div>电话号码</div>
                    <div class='border'>{{examinePeople.tel}}</div>
                </el-form-item>
                <el-form-item  class='input1'>
                    <div>出生年月</div>
                    <div class='border'>{{examinePeople.birth}}</div>
                </el-form-item>
                <el-form-item  class='input1'>
                    <div>通讯地址</div>
                    <div class='border'>{{examinePeople.tabsolute_addressel}}</div>
                </el-form-item>
                 <el-form-item  class='input1'>
                    <div>身份证</div>
                    <div class='border'>{{examinePeople.id_card}}</div>
                </el-form-item>
                  <el-form-item  class='input1'>
                    <div>证件照片</div>
                    <div class='border  img'>
                        <span class='text'>(证件照片为正反两面)</span>
                            <el-button type='text' @click='showIdCardUrl'>点击查看</el-button>
                    </div>
                </el-form-item>
                 <el-form-item  class='input1'>
                    <div>绑定银行</div>
                    <div class='border'>{{examinePeople.bank_name}}</div>
                </el-form-item>
                 <el-form-item  class='input1'>
                    <div>银行卡号</div>
                    <div class='border'>{{examinePeople.bank_card}}</div>
                </el-form-item>
                 <el-form-item  class='input2'>
                    <div>个人介绍</div>
                    <div class='border height'>{{examinePeople.slef_desc}}</div>
                </el-form-item>
                 <el-form-item  class='input2'>
                    <div>申请时间</div>
                    <div class='border'>{{examinePeople.slef_desc}}</div>
                </el-form-item>
                  <div class='num_set'>离职信息</div>
                   <el-form-item  class='input1'>
                    <div>离职时间</div>
                    <div class='border'>{{examinePeople.quit.create_time}}</div>
                </el-form-item>
                 <el-form-item  class='input1'>
                    <div>离职类型</div>
                    <div class='border'>{{examinePeople.quit.type}}</div>
                </el-form-item>
                 <el-form-item  class='input1'>
                    <div>备注</div>
                    <div class='border height'>{{examinePeople.quit.remark}}</div>
                </el-form-item>
            </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showImg" class='showImg'>
        <div>
            <img :src="'http://120.27.21.136:2798/' + examinePeople.img_url"/>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="showIdCard" class='showImg'>
        <div>
            <img :src="'http://120.27.21.136:2798/' + examinePeople.head_img"/>
        </div>
    </el-dialog>
</template>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      showImg: false,
      showIdCard: false,
      dialogFormVisible: false,
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
        head_img: "",
        id_card: "",
        quit: {
          his_id: "",
          auth_id: "",
          create_time: "",
          type: "",
          remark: ""
        }
      }
    };
  },
  mounted() {
    this.getQuitList();
  },
  methods: {
    getRole(row) {
      if (row == 1) {
        return "经纪人";
      } else if (row == 2) {
        return "对接人";
      }
    },
    async showSee(row) {
      console.log(row);
      this.dialogFormVisible = true;
      Object.assign(this.examinePeople, row);
      this.examinePeople.agent_id = row.agent_id;
      let res = await this.api.getQuitInfo(this.examinePeople);
      console.log(res)
      if (res.code == 200) {
        this.examinePeople = res.data;
      }
    },
    auditingState(row) {
      if (row == 0) {
        return "未通过";
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
    showImgUrl() {
      this.showImg = true;
    },
    showIdCardUrl() {
      this.showIdCard = true;
    },
    async getQuitList() {
      let res = await this.api.getQuitList();

      if ((res.code = 200)) {
        this.tableData = res.data.data;
      }
    }
  }
};
</script>


