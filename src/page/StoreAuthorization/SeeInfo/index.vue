<style lang="less" scoped src="../index.less"></style>

<style lang="less">
.SeeInfo {
  width: 1024px;
  margin: 0 auto;
  .el-table td,
  .el-table th {
    padding: 0;
    color: #333;
  }
  .el-form-item.is-error {
    padding-bottom: 20px;
  }
  .el-input__inner {
    line-height: 0px;
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

  .el-form-item {
    display: inline-table;
    margin-right: 35px;
  }
  .property_type {
    font-size: 14px;
    color: #333;
    line-height: 40px;
    padding: 0 10px 0 0;
  }
  .cell {
    padding: 6px 0px;
  }
  .request {
    display: inline-block;
    text-align: right;
  }
  .title-top {
    padding: 20px 0;
    text-align: left;
    position: relative;
    top: 0;
    font-size: 19px;
    .title-btn {
      position: absolute;
      top: 18px;
      right: 0;
    }
  }
  .el-table th {
    padding: 0;
  }
}
</style>
<template>
  <div class="SeeInfo">
    <div class="AddPorject-wrapper">
      <div class="AddPorject-wrapper-inner">
        <div class='title-top'>
          <span>新增门店</span>
          <span class="title-btn">
            <el-button type="primary" @click='submitForm'>提交</el-button>
            <el-button @click="cancel">关闭</el-button>
          </span>
        </div>
        <el-form :model="form" ref="ruleForm" class='form'>
          <el-form-item label="门店编号" class='input'>
            <el-input v-model="form.store_code" auto-complete="off" placeholder="请输入门店编号"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" class='input1'>
            <el-input v-model="form.store_name" auto-complete="off" placeholder="请输入门店名称"></el-input>
          </el-form-item>
          <el-form-item label="门店店长" class='input1'>
            <el-input v-model="form.contact" auto-complete="off" placeholder="请输入门店店长姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" class='input'>
            <el-input v-model="form.contact_tel" auto-complete="off" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="门店地址">
            <!-- 下拉组建 -->
            <city-selector :province.sync="form.province" :city.sync="form.city" :district.sync="form.district" @changeDistrict="changeDistrict" />
          </el-form-item>
          <el-form-item class='input'>
            <el-input id="suggestId" v-model="form.address" auto-complete="off" class='input-1' placeholder="请输入具体地址"></el-input>
            <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
          </el-form-item>
          <!-- 地图 -->
          <div id="map" class='map'></div>
        </el-form>
      </div>
      <!-- 用户显示 -->
      <el-table :data="project_user" border>
        <el-table-column property="account" label="帐号" align='center'></el-table-column>
        <el-table-column property="name" label="管理员" align='center'></el-table-column>
        <el-table-column property="operation" v-if="operationType == 0 || operationType == 1" label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type="text" @click='editUser(scope.row , scope.$index)'>修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加账号" :visible.sync="dialogFormVisibleAccounts" class='tableUser' @close="cancelUser">
        <el-form :model="projectUserForm" ref="projectUserForm">
          <el-form-item label="设定帐号" prop="account" class='input'>
            <el-input v-model="projectUserForm.account" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item v-show="isAccountValid" label="设定密码" prop="password" class='input'>
            <el-input v-model="projectUserForm.password" auto-complete="off" type='password' placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item v-show="!isAccountValid" label="设定密码" class='input'>
            <el-input v-model="projectUserForm.password" auto-complete="off" type='password' placeholder="不设置为之前密码"></el-input>
          </el-form-item>
          <el-form-item label="管理员姓名" prop="name" class='input'>
            <el-input v-model="projectUserForm.name" auto-complete="off" placeholder="请输入管理员姓名"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click='cancelUser'>关 闭</el-button>
          <el-button type="primary" @click='submitUser'>确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>


<script>
import CitySelector from "../../../components/CitySelector";
export default {
  data() {
    return {
      dialogFormVisibleAccounts: false,
      form: {
        district: "",
        province: "",
        city: "",
        latitude: "",
        longitude: "",
        store_code: "",
        store_name: "",
        address: "",
        contact: "",
        store_id: ""
      },
      project_user: [],
      projectUserForm: {
        name: "",
        account: "",
        password: "",
        store_id: "",
        id: ""
      },
      isAccountValid: false,
      map: null,
      dialogFormVisibleAccounts: false,
      showMap: false,
      operationType: 0 //0查看   1 修改  3新增
    };
  },
  computed: {
    userFormRules() {
      if (
        this.projectUserForm.password == "" &&
        this.operationType == 1 &&
        this.isUserEdit == true
      ) {
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
    this.initMap();
    this.operationType = this.$route.query.operationType;
    this.store_id = this.$route.query.store_id;
    this.getSeeInfo();
  },
  methods: {
    async getSeeInfo() {
      let res = await this.api.storeInfo({ store_id: this.store_id });
      if (res.code == 200) {
        this.project_user = res.data.admin;
        this.form = res.data.store;
      }
    },
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    editUser(row, index) {
      this.isUserEdit = true;
      this.dialogFormVisibleAccounts = true;
      Object.assign(this.projectUserForm, row);
      this.userIndex = index;
    },
    async submitUser() {
      this.$refs["projectUserForm"].validate(async valid => {
        if (valid) {
          if (this.isUserEdit) {
            this.projectUserForm.id = this.form.store_id;
            let temp = Object.assign({}, this.projectUserForm);
            console.log(temp);
            let res = await this.api.updateStoreAdmin(temp);
            if (res.code != 200) {
              return;
            }
          } else {
            this.projectUserForm.store_id = this.form.store_id;
            let temp = Object.assign({}, this.projectUserForm);
            console.log(temp);
            let res = await this.api.addStoreAdmin(temp);

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
            Object.assign(this.project_user[this.userIndex], temp);
          } else {
            this.project_user.push(temp);
            this.$message({
              type: "success",
              message: "新增成功!"
            });
          }
          this.cancelUser();
        } else {
          return false;
        }
      });
    },
    checkUserAccout(temp) {
      for (let i = 0; i < this.project_user.length; i++) {
        let user = this.project_user[i];
        if (i === this.userIndex) continue;
        if (user.account == temp.account) {
          this.$message({ type: "error", message: "该账号已存在" });
          return false;
        }
      }
      return true;
    },
    async submitForm() {
      if (this.operationType == 3) {
        let res = await this.api.addStore(this.form);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "新增门店成功!"
          });
          this.form.store_id = res.data;
          setTimeout(() => {
            this.dialogFormVisibleAccounts = true;
          }, 1200);
        }
        this.$nextTick(() => {
          this.initMap();
        });
      }
      if (this.operationType == 1) {
        let temp = {};
        temp.store_name = this.form.store_name;
        temp.address = this.form.address;
        temp.contact_tel = this.form.contact_tel;
        temp.contact = this.form.contact;
        temp.province = this.form.province;
        temp.city = this.form.city;
        temp.district = this.form.district;
        temp.store_id = this.form.store_id;
        temp.latitude=this.form.latitude;
        temp.longitude=this.form.longitude;
        let res = await this.api.updateStore(temp);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "修改门店成功!"
          });
        }
        this.cancel();
        this.$nextTick(() => {
          this.initMap();
        });
      }
    },
    cancelUser() {
      this.dialogFormVisibleAccounts = false;
      let originAccountsForm = this.$options.data()["projectUserForm"];
      Object.assign(this.projectUserForm, originAccountsForm);
      this.$router.push({ name: "storeAuthorization" });
    },
    cancel() {
      this.$router.push({ name: "storeAuthorization" });
    },

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

      if (this.operationType == 1 || this.operationType == 2) {
        return;
      }

      let ac = new BMap.Autocomplete({
        input: "suggestId",
        location: this.map
      });

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
        console.log(e, e.item.value);
        let address = e.item.value;
        let addressStr = address.city + address.district + address.business;
        this.form.address = addressStr;
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
    }
  },
  components: {
    CitySelector: CitySelector
  }
};
</script>

