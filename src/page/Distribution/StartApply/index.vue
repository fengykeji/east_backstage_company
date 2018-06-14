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
.select {
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
                <span>
                    <el-input class='query' v-model="searchObj.search"></el-input>
                    <el-button icon="el-icon-search" circle></el-button>
                 </span>
                 <el-button type="primary"  class="pos-right" @click="close">返回</el-button>
             </div>
            <el-table :data="startApplyList" border>
                <el-table-column property="id" label="序号" align='center'></el-table-column>
                <el-table-column property="project_name" label="项目名称" align='center'></el-table-column>
                <el-table-column property="absolute_address" label="地址" align='center'>
                  <!-- <template>
                      <span>{{row.province_name + row.city_name + row.district_name}}</span>
                  </template> -->
                </el-table-column>
                <el-table-column property="project_code" label="项目编号" align='center'></el-table-column>
                <el-table-column property="project_hold_name" label="项目负责人" align='center'></el-table-column>
                <el-table-column property="project_hold_phone" label="联系方式" align='center'></el-table-column>
                <el-table-column property="project_hold_phone" label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button>提交</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import CitySelector from "../../../components/CitySelector";
export default {
  data() {
    return {
      searchObj: {
        search:'',
        province: "",
        city: "",
        district: ""
      },
      form: {},
      startApplyList: []
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    async search() {
      let result = await this.api.changeProjectList(this.searchObj);
      if (result.code == 200) {
        // this.startApplyList = result
      }
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


