<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.addApply {
  .el-button {
    padding: 7px 18px;
  }
  .el-input__inner {
    height: 31px;
    line-height: 31px;
  }
  .el-form-item__content {
    line-height: 0;
  }
  .el-table td {
    padding: 2px 0;
  }
  .el-dialog {
    width: 70%;
    text-align: left;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  .citySelector {
    width: auto;
  }

  .el-dialog__header {
    padding: 10px 20px 0 20px;
    background: #409eff;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #fefefe;
    position: relative;
  }

  .el-dialog__headerbtn {
    top: initial;
  }

  .el-dialog__title {
    color: #fefefe;
    position: relative;
    top: -4px;
  }
  .map-tool {
    width: 625px;
    height: 300px;
  }
  .el-form-item__label{
    float:none;
  }
  .el-form-item{
  margin-bottom:10px;
  }
}
</style>

<template>
  <div class="addApply">
    <div class="apply-wrapper">
      <div class="apply-wrapper-inner">
        <div class='title-top'>
          <span>新增项目</span>
          <span class="title-btn">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </span>
        </div>
        <el-form :model="form" class='form' :rules="rules" ref="sumbitForm">
          <el-form-item label="项目名称" class='input chioces' prop="project_name">
            <el-input v-model="form.project_name" auto-complete="off" placeholder="请选择项目名称"></el-input>
          </el-form-item>
          <el-form-item label="负责人" class='input' prop="project_hold_name">
            <el-input v-model="form.project_hold_name" auto-complete="off" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" class='input' prop="project_hold_phone">
            <el-input v-model="form.project_hold_phone" auto-complete="off" placeholder="请输入负责人电话"></el-input>
          </el-form-item>
          <el-form-item prop="province" label="项目地址">
            <!-- 下拉组建 -->
            <city-selector ref="citySelector" :province.sync="form.province" :city.sync="form.city" :district.sync="form.district" @changeDistrict="areaChange" />
          </el-form-item>
          <el-form-item class='input-address' prop="absolute_address">
            <map-tool-input v-model="form.absolute_address" :area="area" ref="mapToolInput" @change="addressChange" />
          </el-form-item>
          <!-- 地图 -->
          <map-tool class="map-tool" ref="mapTool" @load="mapLoad" :longitude.sync="form.longitude" :latitude.sync="form.latitude" />
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import CitySelector from "@/components/CitySelector";
export default {
  data() {
    return {
      rules: {
        project_name: [
          {
            required: true,
            message: "请输入项目名称,长度为1-20个字符",
            change: "change",
            max: 20,
            min: 1
          }
        ],
        project_hold_name: [
          {
            required: true,
            message: "请输入姓名,2-5个字符，必须是中文",
            change: "change",
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
          }
        ],
        project_hold_phone: [
          {
            required: true,
            message: "请输入电话号码，11位手机号码格式",
            change: "change",
            pattern: /^1[34578]\d{9}$/
          }
        ],
        province: [{ required: true, message: "请选择城市", change: "change" }],
        absolute_address: [
          { required: true, message: "请输入具体地址", change: "change" }
        ]
      },
      form: {
        province: "",
        city: "",
        district: ""
      },
      area: "",
      searchObj: {
        search: "",
        tag_search: "",
        page: 1
      },
      applyHouse: []
    };
  },
  mounted() {},
  methods: {
    async submit() {
      this.$refs["sumbitForm"].validate(async valid => {
        if (valid) {
          this.$confirm("此操作将新增成功, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              let res = await this.api.addHouse(this.form);

              if (res.code == 200) {
                this.$message({ type: "success", message: "新增成功!" });
                this.cancel();
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消新增项目"
              });
            });
        } else {
          return false;
        }
      });
    },
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    changeDistrict() {},
    cancel() {
      this.$router.push({ name: "twoHouse" });
    },
    mapLoad(map) {
      this.$refs["mapToolInput"].init(map);
    },
    areaChange(area) {
      this.area = area;
      this.$refs["mapTool"].focusArea(area);
    },
    addressChange(address) {
      this.form.absolute_address = address;
      let addStr = this.area + address;
      if (address) {
        this.$refs["mapTool"].focusAddress(addStr);
      } else {
        this.$refs["mapTool"].focusArea(this.area);
      }
    }
  },
  components: {
    CitySelector: CitySelector
  }
};
</script>
