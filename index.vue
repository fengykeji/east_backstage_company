<style lang="less" scoped src="./index.less" ></style>
<style>
.el-form-item__label {
  float: none;
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
</style>
<template>
    <div class='box'>
        <div class='title'>
            <span></span>
            <span class='left'>
                <div class='text1'>当前位置：项目管理</div>
                 <div>
                    <span class='tip'>全部</span>
                    <span class='tip'>待审核</span>
                    <span class='tip'>审核不通过</span>
                    <span class='tip'>未认证</span>
                    <span class='tip'>已认证</span>
                    <span class='tip'>已转出</span>
                 </div>
            </span>
             <el-input class='query'></el-input>
              <el-button icon="el-icon-search" circle></el-button>
            <span class='right'>
                 <el-button type="primary" @click='showAdd(0)'>新增</el-button>
            </span>
        </div>
        <div class='search'>
          <div>
              <span class='block'>
                  <div>
                      <span class='row'>项目编号：</span>
                      <el-input class='input'></el-input>
                  </div>
                  <div>
                      <span class='row'>开发商名：</span>
                      <el-input class='input'></el-input>
                  </div>
              </span>
              <span class='block'>
                 <div>
                      <span class='row'>项目名称：</span>
                      <el-input class='input'></el-input>
                  </div>
                  <div>
                      <span class='row'>所属单位：</span>
                      <el-input class='input'></el-input>
                  </div>
              </span>
              <span class='block'>
                 <div>
                      <span class='row'>区域：</span>
                      <el-select v-model="value" placeholder="请选择">
                         <el-option v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                      </el-select>
                  </div>
                  <div>
                      <span class='row'>来源：</span>
                      <el-select v-model="value" placeholder="请选择">
                         <el-option v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                      </el-select>
                  </div>
              </span>
          </div>
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="project_id" label="序号"  align='center' width="50px"> </el-table-column>
    <el-table-column  prop="project_code"  label="项目编号"  align='center' width="100px"></el-table-column>
    <el-table-column  prop="project_name" label="项目名称" align='center' width="100px"></el-table-column>
       <!-- 项目状态函数 -->
     <el-table-column prop="state" label="项目状态" align='center' width="110px">
        <template slot-scope="scope">{{projectState(scope.row.state)}}</template>
    </el-table-column>

    <el-table-column  prop="district" label="区域" align='center' width="100px"></el-table-column>
    <el-table-column  prop="absolute_address" label="地址" align='center' width="220px"></el-table-column>
    <el-table-column  prop="developer_name" label="开发商" align='center' width="100px"></el-table-column>
    <el-table-column  prop="company_relation" label="与项目关系" align='center' width="100px"></el-table-column>
    <el-table-column  prop="subordinate_company" label="所属单位" align='center' width="120px"></el-table-column>
    <el-table-column prop="source" label="来源" align='center' width="110px">
         <template slot-scope="scope">{{scopeState (scope.row.source)}}</template>
    </el-table-column>
    <el-table-column prop="authentication" label="认证状态" align='center' width="100px">
         <template slot-scope="scope">{{authenticationState (scope.row.authentication)}}</template>
    </el-table-column>
    <el-table-column  prop="" label="申请人" align='center' width="100px"></el-table-column>
    <el-table-column  prop="create_time" label="申请时间" align='center' width="100px"></el-table-column>
          <!-- 审核状态函数 -->
    <el-table-column prop="auditing_state" label="审核状态" align='center' width="110px">
           <template slot-scope="scope">{{auditingState(scope.row.auditing_state)}}</template>
    </el-table-column>

    <el-table-column  prop="auditing_name" label="审核人" align='center' width="100px"></el-table-column>
    <el-table-column  prop="auditing_time" label="审核时间" align='center' width="100px"></el-table-column>
    <el-table-column property="operation" label="操作" align='center' width="120px">
        <template slot-scope="scope">
          <el-button type="text" @click='showAdd(2, scope.row)'>查看</el-button>
          <el-button type="text" @click='showAdd(1, scope.row)'>修改</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>
    <!-- 新增项目 -->
   <el-dialog title="申请项目信息" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form" class='form'>
          <el-form-item label="项目名称" class='input'>
            <el-input v-model="form.project_name" auto-complete="off" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目地址" class='select'>
              <!-- 下拉组建 -->
             <city-selector :province.sync="form.province" :city.sync="form.city" :district.sync="form.district" @changeDistrict="changeDistrict" />
          </el-form-item>
          <el-form-item label="" class='input'>
            <el-input v-model="form.absolute_address" auto-complete="off" class='input-1' placeholder="请输入具体地址"></el-input>
          </el-form-item>
        <!-- 地图 -->
        <el-button type="text" @click='showMapDetails'>查看地图</el-button>

        <div id="map" class='map'></div>

      <template>
        <!-- 物业类型 -->
        <div>物业类型</div>
          <el-checkbox-group v-model="form.property_type">
              <el-checkbox v-for="item in typeOptions" :key="item.param_id" :label="item.param" :value="item.param_id"></el-checkbox>
          </el-checkbox-group>
      </template>
          <el-form-item label="开发商" class='input'>
          <el-input v-model="form.developer_name" auto-complete="off" placeholder="请输入开发商名称"></el-input>
        </el-form-item>
          <el-form-item label="与项目关系" class='select'> 
           <el-radio-group v-model="form.company_relation">
              <el-radio label="开发商"></el-radio>
              <el-radio label="代理"></el-radio>
              <el-radio label="分销"></el-radio>
              <el-radio label="渠道"></el-radio>
              <el-radio label="其他"></el-radio>
           </el-radio-group>
        </el-form-item>
          <el-form-item label="结佣单位" class='input'>
          <el-input v-model="form.statement_company" auto-complete="off" placeholder="请输入结佣单位名称"></el-input>
        </el-form-item>
          <el-form-item label="项目负责人" class='input'>
          <el-input v-model="form.project_hold_name" auto-complete="off" placeholder="请输入项目负责人姓名"></el-input>
        </el-form-item>
          <el-form-item label="联系电话" class='input'>
          <el-input v-model="form.project_hold_phone" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
         <el-form-item label="备注"  class='textarea'>
             <el-input v-model="form.remark" type="textarea" ></el-input>
         </el-form-item>
      </el-form>
      <div class='tableIn-btn'>
            <el-button type="primary" @click='showUser'>新增账号</el-button>
      </div>
      <!-- 用户显示 -->
  <el-table :data="UserShow" border>
      <el-table-column property="account" label="帐号" align='center'></el-table-column>
      <el-table-column property="name" label="对接人" align='center'></el-table-column>
      <el-table-column property="phone" label="电话号码" align='center'></el-table-column>
      <el-table-column property="operation" label="操作" align='center' v-if='addEditDelete!==0'>
        <template slot-scope="scope">
          <el-button type="text" @click='editUser(scope.row)'>修改</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
    <!-- 附件上传 -->
    <div>
      <el-upload class="uploadFile"  :auto-upload="false" action="" :on-change="fileUpload">
        <el-button class="uploadBtn" ref="uploadBtn" size="small" type="primary" :show-file-list="false">点击上传</el-button>
      </el-upload>
    </div>
    <div class='tableIn-btn'>
          <el-button type="primary" @click='showUploadFile'>文件上传确定</el-button>
    </div>
   <el-table :data="Enclosure" border>
      <el-table-column property="file_name" label="文件名称" align='center'></el-table-column>
      <el-table-column label="附件" align='center'>
        <template slot-scope='scope'>
            <a href="">查看附件</a>
        </template>
      </el-table-column>
      <el-table-column property="create_name" label="上传人员" align='center'></el-table-column>
      <el-table-column property="create_time" label="上传时间" align='center'></el-table-column>
  </el-table>
  <div v-if="operationType!=0">
        <div class='num_set'>审核项目信息</div>
        <el-form :model="form"  class='form'>
              <el-form-item label="审核人员" class='inputAud'>
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
                <el-form-item label="审核时间" class='inputAud'>
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
                <el-form-item label="审核状态" class='inputAud'>
              <el-select v-model="form.city_id" class='select-1' @change="auditStatus" >
                      <el-option v-for="item in auditOptions" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="备注"  class='textarea'>
                  <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
                <el-form-item label="项目对接人" class='inputAud'>
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item> 
              <el-form-item label="联系电话" class='inputAud'>
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
        </el-form> 
        <div class='num_set'>认证信息</div>
        <el-form :model="form" :data='authentication' class='form'>
              <el-form-item label="保证金金额（￥）：" class='inputAud'>
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
                <el-form-item label="未结佣金总额（￥）：" class='inputAud'>
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="项目状态" class='inputAud state'>
              <span>已认证</span>
              </el-form-item>
              <div class='num_details'>保证金详情</div>
              <el-table :data="gridData" border>
                  <el-table-column  type="selection"></el-table-column>
                  <el-table-column property="date" label="序号" align='center'></el-table-column>
                  <el-table-column property="name" label="付款户名" align='center'></el-table-column>
                  <el-table-column property="address" label="收款户名" align='center'></el-table-column>
                  <el-table-column property="address" label="金额（￥）" align='center'></el-table-column>
                  <el-table-column property="address" label="联系人" align='center'></el-table-column>
                  <el-table-column property="address" label="联系电话" align='center'></el-table-column>  
                  <el-table-column property="address" label="类型" align='center'></el-table-column>
                  <el-table-column property="address" label="交易人" align='center'></el-table-column>
                  <el-table-column property="address" label="交易时间" align='center'></el-table-column>
              </el-table>
        </el-form>
        <div v-if="operationType==2">
          <div class='num_set'>项目历史</div>
          <el-table :data="gridData" border>
              <el-table-column property="nub" label="序号" align='center'></el-table-column>
              <el-table-column property="name" label="公司名称" align='center'></el-table-column>
              <el-table-column property="address" label="与项目关系" align='center'></el-table-column>
              <el-table-column property="address" label="开始时间" align='center'></el-table-column>
              <el-table-column property="address" label="结束时间" align='center'></el-table-column>
              <el-table-column property="address" label="负责人" align='center'></el-table-column>
              <el-table-column property="address" label="联系方式" align='center'></el-table-column>
          </el-table>
        </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click='cancel'>取 消</el-button>
      <el-button type="primary" @click='submit'>提 交</el-button>
    </div>
</el-dialog>
    <!-- 帐号添加 -->
     <el-dialog title="新建账号" :visible.sync="dialogFormVisibleAccounts"  class='tableUser'>
      <el-form>
          <el-form-item label="设定帐号" class='input'>
          <el-input v-model="form.project_user.account" auto-complete="off" placeholder="请输入帐号"></el-input>
        </el-form-item>
          <el-form-item label="设定密码" class='input'>
          <el-input v-model="form.project_user.password" auto-complete="off" type='password' placeholder="请输入密码"></el-input>
        </el-form-item>
          <el-form-item label="对接人" class='input'>
          <el-input v-model="form.project_user.name" auto-complete="off" placeholder="请输入对接人姓名"></el-input>
        </el-form-item>
          <el-form-item label="联系电话" class='input'>
          <el-input v-model="form.project_user.phone" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click='cancelUser'>关 闭</el-button>
        <el-button type="primary" @click='submitUser'>确 定</el-button>
      </div> 
</el-dialog>
  </div>
</template>

<script>
import CitySelector from "../../components/CitySelector";

export default {
  data() {
    return {
      map: null,
      sendata:{},
      tableData: [],
      gridData: [],
      UserShow: [],
      Enclosure: [],
      typeOptions: [],
      dialogFormVisibleAdd: false,
      dialogFormVisibleAccounts: false,
      showMap: false,
      isEdit: false,
      auditOptions: [],
      options: [
        {
          value: "选项1",
          label: "区域"
        }
      ],
      value: "",
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
        project_agreement: {
            file_name: "",
            url: "",
            create_name: "",
            create_time: ""
          },

        project_user:{
          account: "",
          password: "",
          name: "",
          phone: ""
          }
        
      },
      fileObject: {},
      operationType: 0, //0 新增  1 修改  2 查看
      addEditDelete: 0 //0 无新增  1 无修改  2 无查看
    };
  },
  mounted() {
    this.getProjectList();
    this.getType();
  },
  methods: {
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

      this.map.addEventListener("click", e => {
        //移除旧坐标
        this.map.clearOverlays();
        //获得新坐标
        let lng = e.point.lng; //经度
        let lat = e.point.lat; //纬度
        this.form.longitude = lng;
        this.form.latitude = lat;
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(new BMap.Point(lng, lat), result => {
          if (result) {
            this.form.absolute_address = result.address;
            this.map.addOverlay(new BMap.Marker(new BMap.Point(lng, lat)));
          }
        });
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
    async getType() {
      let res = await this.api.getTags();
      if (res.code == 200) {
        this.typeOptions = res.data;
      }
    },
    async getProjectList() {
      let res = await this.api.getProjectList();
      if (res.code == 200) {
        this.tableData = res.data;
      }
    },
    async submit() {
     
      this.sendata={...this.form};
      this.sendata.project_user=this.UserShow;
      this.sendata.project_agreement=this.Enclosure;
       let res = await this.api.getCreateProject(this.sendata);
      console.log(this.sendata);
      return;
      if (res.code == 200) {
        this.getProjectList();
      }
      this.dialogFormVisibleAdd = false;
    },
    async submitUser() {
      let temp = Object.assign({}, this.form.project_user);
      if (this.isEdit) {
        this.UserShow.push(temp);
        this.cancelUser();
        this.addEditDelete = false;
      } else {
        let temp = Object.assign({}, this.form.project_user);
        this.UserShow.push(temp);
        this.cancelUser();

      }
    },
    cancelUser() {
      this.dialogFormVisibleAccounts = false;
      let originAccountsForm = this.$options.data()["form.project_user"];
      Object.assign(this.form.project_user, originAccountsForm);
    },
    showUser() {
      this.isEdit = false;
      this.dialogFormVisibleAccounts = true;
    },

    async showAdd(type, row) {
      this.operationType = type;
      //新增 0 修改 1 查看 2
      if (type == 0) {
      } else if (type == 1) {
        Object.assign(this.form, row);
        let res = await this.api.getUpdateProject();
        if (res.code == 0) {
        }

        this.addEditDelete = true;
        this.Enclosure.push(this.form.project_agreement);
        this.getProjectList();
      } else if (type == 2) {
        Object.assign(this.form, row);
        console.log(this.form);

        this.Enclosure.push(this.form.project_agreement);
      }
      this.dialogFormVisibleAdd = true;
      this.$nextTick(() => {
        this.initMap(row);
      });
    },
    cancel() {
      this.dialogFormVisibleAdd = false;
      let originForm = this.$options.data()["form"];
      Object.assign(this.form, originForm);
      this.Enclosure = [];
    },
    async see(row) {
      this.operationType = 2;
      this.dialogFormVisibleAdd = true;
      let res = await this.api.getSeeProjectInfo(this.form);
      if (res.code == 200) {
        Object.assign(this.form, row);
      }
    },
    editUser(row) {
      this.isEdit = true;
      this.dialogFormVisibleAccounts = true;
      this.form.project_agreement.account = row.account;
      this.form.project_agreement.phone = row.phone;
      this.form.project_agreement.name = row.name;
      this.encloform.project_agreementsure.id = row.id;
    },
    auditingState(row) {
      if (row == 0) {
        return "待审核";
      } else if (row == 1) {
        return "通过";
      } else if (row == 2) {
        return "拒绝";
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
    authenticationState(row) {
      if (row == 1) {
        return "未认证";
      } else if (row == 2) {
        return "已认证";
      }
    },
    scopeState(row) {
      if (row == 1) {
        return "自行申请";
      } else if (row == 2) {
        return "平台分配";
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
        this.fileObject.name.indexOf(".doc") > -1
      ) {
        flag = true;
      }
      if (!flag) {
        this.$message({
          type: "error",
          message: "文件上传格式有误，请上传docx或者doc格式"
        });
        return;
      }
      let file = this.fileObject.raw;
      let formData = new FormData();
      formData.append("url", file);
      let res = await this.api.uploadProjectAgreement(formData);
      if (res.code == 200) {
        this.form.project_agreement.create_time = res.data.create_time;
        this.form.project_agreement.create_name = res.data.create_name;
        this.form.project_agreement.url = fileObj.url;
        this.form.project_agreement.file_name = fileObj.name;
        this.Enclosure.push(this.form.project_agreement);
      }
      console.log(this.form.project_agreement);
      this.getProjectList();
    },

    async fileUploadSubmit() {
      let file = this.fileObject.raw;
      let formData = new FormData();
      formData.append("url", file);
      let res = await this.api.uploadProjectAgreement(formData);
      if (res.code == 200) {
        this.Enclosure.push(this.form.project_agreement);
      }
    },

    showMapDetails() {
      let row = document.querySelector(".map");
      row.classList.toggle("active");
    },

    auditStatus() {}
  },

  components: {
    CitySelector: CitySelector
  }
};
</script>


