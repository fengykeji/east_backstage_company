<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.apply {
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
  .el-table th {
    padding: 3px 0;
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
}
</style>

<template>
  <div class="apply">
    <div class="apply-wrapper">
      <div class="apply-wrapper-inner">
        <div class='title-top'>
          <span>发起申请</span>
          <span class="title-btn">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </span>
        </div>
        <el-form :model="form" class='form'>
          <el-form-item label="项目名称" class='input chioces' prop="project_name">
            <el-input v-model="form.project_name" auto-complete="off" placeholder="请选择项目名称"></el-input>
            <el-button type="primary" class='chioce' @click='chioce'>选择</el-button>
          </el-form-item><br>

          <el-form-item label="负责人" class='input' prop="project_name">
            <el-input v-model="form.project_name" auto-complete="off" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" class='input' prop="project_name">
            <el-input v-model="form.project_name" auto-complete="off" placeholder="请输入负责人电话"></el-input>
          </el-form-item>
          <el-form-item class='input' prop="absolute_address" label="项目地址">
            <el-input v-model="form.project_name" auto-complete="off" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog class='choice_dialog' title="选择" :visible="dialogFormVisible" @close="closeDialog">
      <div class="choice">
        <div>
          <div class='content'>
            <div class="search-block">
              <city-selector class="city-selector" :province.sync="form.province" :city.sync="form.city" :district.sync="form.district" @changeDistrict="changeDistrict" />
              <div class='search-btn'>
                <el-input v-model="searchObj.search" class='query' placeholder="可按公司名称/公司编号"></el-input>
                <el-button type="primary" class='search'>查询</el-button>
              </div>
            </div>
            <el-table class="mt-15" :data="applyHouse" border>
              <el-table-column prop="" label="序号" align='center' width="70px">
                <template slot-scope="scope">{{getIndex(scope)}}</template>
              </el-table-column>
              <el-table-column prop="name" label="项目编号" align='center'></el-table-column>
              <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
              <el-table-column prop="city" label="项目负责人" align='center'></el-table-column>
              <el-table-column prop="quyu" label="联系方式" align='center'></el-table-column>
              <el-table-column prop="tel" label="地址" align='center' width="200px"></el-table-column>
              <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                  <el-button type="text" @click="choise(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CitySelector from "@/components/CitySelector";
export default {
  data() {
    return {
      form: {
        province: "",
        city: "",
        district: ""
      },
      area: "",
      dialogFormVisible: false,
      searchObj: {
        search: "",
        tag_search: "",
        page: 1
      },
      applyHouse: []
    };
  },
  mounted() {
    this.operationType = this.$route.query.operationType;
  },
  methods: {
    submit() {},
    async getApplyHouse() {
      let res = await this.api.getApplyHouse(this.searchObj);
      if (res.code == 200) {
        this.applyHouse = res.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    changeDistrict() {},
    closeDialog() {
      this.dialogFormVisible = false;
    },
    chioce() {
      this.dialogFormVisible = true;
      this.getApplyHouse();
    },
    cancel() {
      this.$router.push({ name: "twoHouse" });
    }
  },
  components: {
    CitySelector: CitySelector
  }
};
</script>
