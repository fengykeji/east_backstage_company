<style lang="less" scoped>
.addPerson {
  width: 950px;
  margin: 0 auto;
  border: 1px solid #999;
  text-align: left;
  padding: 15px 30px;
  margin-top: 40px;
}
.input1 {
  width: 200px;
  display: inline-block;
  padding-right: 30px;
  vertical-align: middle;
}
.border {
  border: 1px solid #888;
  padding: 0 10px;
  border-radius: 4px;
  height: 40px;
  margin-top: 32px;
}
.el-form-item {
  margin-bottom: 5px;
}
.num_set {
  padding-top: 15px;
  font-size: 24px;
  text-align: left;
}
.cancel {
  margin-top: 20px;
  text-align: right;
}
.box {
  padding-left: 20px;
  padding-bottom: 30px;
}
.el-form-item {
  margin: 2px 0;
}
.query {
  width: 200px;
}
.selectDis {
  display: inline-block;
}
.btn {
  position: relative;
  height: 40px;
}
.pos-right {
  position: absolute;
  right: 0;
}
.relative {
  position: relative;
  margin: 15px 0;
}
</style>
<style lang="less" >
.addPerson {
  .el-select {
    width: 150px;
  }
}
</style>


<template>
  <div class='addPerson'>
    <div class='box'>
      <div class='relative'>
        <city-selector class='selectDis' :province.sync="searchObj.province" :city.sync="searchObj.city" :district.sync="searchObj.district" />
        <el-input class='query' v-model="searchObj.search"></el-input>
        <span class='pos-abs'>
          <el-button @click="search" icon="el-icon-search" circle></el-button>
          <el-button type="primary" class="pos-right" @click="close">返回</el-button>
        </span>
      </div>
    </div>
    <el-table :data="sumbitForm" border>
      <el-table-column property="id" label="序号" align='center' width="70px"></el-table-column>
      <el-table-column property="project_name" label="项目名称" align='center'></el-table-column>
      <el-table-column property="absolute_address" label="地址" align='center' width="320px">
        <template slot-scope="scope">
          <span>{{scope.row.province_name + scope.row.city_name + scope.row.district_name+scope.row.absolute_address}}</span>
        </template>
      </el-table-column>
      <el-table-column property="project_code" label="项目编号" align='center'></el-table-column>
      <el-table-column property="project_hold_name" label="项目负责人" align='center'></el-table-column>
      <el-table-column property="project_hold_phone" label="联系方式" align='center' width="120px"></el-table-column>
      <el-table-column property="operation" label="操作" align='center'>
        <template slot-scope="scope">
          <el-button @click='sumbit(scope.row)'>提交</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import CitySelector from "../../../components/CitySelector";
export default {
  data() {
    return {
      searchObj: {
        search: "",
        province: "",
        city: "",
        district: ""
      },
      sumbitForm: [],
      project_id: ""
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    async search() {
      let res = await this.api.changeProjectList(this.searchObj);
      if (res.code == 200) {
        this.sumbitForm = res.data;
      }
    },
    sumbit(row) {
      console.log(row);
      this.$router.push({
        name: "projectInfo",
        params: {
          project_id: row.project_id
        }
      });
    },
    close() {
      this.$router.push({ name: "distribution", params: this.$route.params });
    }
  },
  components: {
    CitySelector: CitySelector
  }
};
</script>


