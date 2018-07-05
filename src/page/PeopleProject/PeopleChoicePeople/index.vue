<style lang="less" scoped>
.addPerson {
  width: 760px;
  margin: 0 auto;
  border: 1px solid #999;
  text-align: left;
  padding: 15px 30px;
  margin-top: 20px;
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
  font-size: 20px;
}
.cancel {
  margin-top: 20px;
  text-align: right;
}
.button {
  position: relative;
  top: 16px;
}
.title {
  position: relative;
  padding-bottom: 30px;
}
.search-block {
  position: absolute;
  right: 0;
  top: -10px;
  white-space: nowrap;
}
.btn {
  position: relative;
  right: 0;
}
.box {
  padding-left: 20px;
  padding-bottom: 30px;
}
.el-form-item {
  margin: 2px 0;
}
.query {
  width: 240px;
  margin: 12px 0;
}
</style>
<style lang="less">
.addPerson {
  .el-table td {
    padding: 0;
  }
  .el-table th {
    padding: 5px 0;
  }
}
</style>

<template>
    <div class='addPerson'>
        <div class='box'>
            <div class='title'>
                <span class='num_set'>选择经纪人</span>
                <span class='search-block'>
                    <el-input class='query' v-model="searchObj.search" placeholder="可按云算号/经纪人姓名进行查询"></el-input>
                    <el-button icon="el-icon-search" @click='agentList' circle></el-button>
                    <span class='btn'>
                        <el-button @click="close">返回</el-button>
                    </span>
                </span>
            </div>
            <el-table :data="agentInfo" border>
                <el-table-column label="序号" align='center'>
                    <template slot-scope="scope">{{getIndex(scope)}}</template>
                </el-table-column>
                <el-table-column property="account" label="云算号" align='center'></el-table-column>
                <el-table-column property="name" label="经纪人名称" align='center'></el-table-column>
                <el-table-column property="tel" label="联系电话" align='center'></el-table-column>
                <el-table-column label="操作" align='center' width="120px">
                    <template slot-scope="scope">
                        <el-button type="text" @click='submit(scope.row)'>选择</el-button>
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
      agentInfo: [],
      project_id: "",
      agent_id: "",
      searchObj: {
        search: "",
        page: 1
      },
      pageSize: 0,
      total: 0
    };
  },
  mounted() {
    this.project_id = this.$route.params.project_id;
    this.agentList();
  },
  methods: {
    // search() {
    //   this.searchObj.page = 1;
    //   this.agentList();
    // },
    getIndex(row) {
      let index = row.$index + 1;
      return index;
    },
    async agentList() {
      let res = await this.api.agentList(this.searchObj);
      if (res.code == 200) {
        this.agentInfo = res.data;
      }
    },
    submit(row) {
      this.$router.push({
        name: "peopleAddPerson",
        params: {
          agentInfo: row,
          agent_id: row.agent_id,
          project_id: this.project_id
        }
      });
    },
    close() {
      this.$router.push({ name: "peopleAddPerson", params: this.$route.params });
    }
  }
};
</script>


