<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.companyType{
  .el-table--border,
  .el-table--group {
    margin-top: 20px;
  }
  .el-table th {
    padding: 8px 0px;
  }
  .el-table td {
    padding: 0;
  }
  .el-dialog__body {
    padding-top: 0;
  }
}
</style>

<template>
    <div class='companyType'>
        <div class='table'>
            <div class='title'>
                <span class='title-text'>公司累计列表</span>
                <el-input v-model="searchObj.search" class='query' placeholder="可查询项目名称"></el-input>
                <el-button @click="getCompanyAll" icon="el-icon-search" circle></el-button>
                <el-button class='pos-btn' type="primary" @click='cancel'>关闭</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="" label="序号" align='center' width="70px"></el-table-column>
                <el-table-column prop="company_name" label="公司名称" align='center'></el-table-column>
                <el-table-column prop="absolute_address" label="公司地址" align='center' width="280px"></el-table-column>
                <el-table-column prop="project_hold_name" label="负责人" align='center'></el-table-column>
                <el-table-column prop="project_hold_phone" label="联系电话" align='center' width="110px"></el-table-column>
                <el-table-column prop="begin_time" label="开始执行时间" align='center'></el-table-column>
                <el-table-column prop="end_time" label="截至执行时间" align='center'></el-table-column>
                <el-table-column prop="price" label="累计金额" align='center' v-if='companyType==0'></el-table-column>
                <el-table-column prop="price" label="已结金额" align='center' v-if='companyType==1'></el-table-column>
                <el-table-column prop="price" label="未结金额" align='center' v-if='companyType==2'></el-table-column>
                <el-table-column property="operation" label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button type="text" @click='showAdd(scope.row)'>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      searchObj: {
        search: ""
      },
      companyType: 0, //0公司累计金额   1  公司已结金额  2 公司未结金额
      project_id: ""
    };
  },
  mounted() {
    this.companyType = this.$route.params.companyType;
    this.project_id = this.$route.params.project_id;
    if (this.project_id) {
      this.getCompanyAll();
    }else{
      this.$router.push({name:'commission'});
    }
  },
  methods: {
    async getCompanyAll() {
      console.log(this.companyType)
      if (this.companyType == 0) {
        let res = await this.api.getCompanyAll({
          project_id: this.project_id,
          search: this.searchObj.search
        });
        if (res.code == 200) {
          this.tableData = res.data.data;
        }
      } else if (this.companyType == 1) {
        let res = await this.api.getCompanyY({ project_id: this.project_id });
        if (res.code == 200) {
          this.tableData = res.data.data;
        }
      }
    },
    cancel() {
      this.$router.push({
        name: "commission"
      });
    },
    async showAdd(row) {
      this.$router.push({
        name: "companyPriceInfo",
        params: {
          project_id: row.project_id,
          company_rule_id:row.company_rule_id,
          companyType:this.companyType,
        }
      });
    }
  }
};
</script>
