<style lang="less" scoped>
.peopleProject {
    margin-right: 35px;
  .title {
    text-align: left;
    width: 100%;
    z-index: 99;
    .left {
      text-align: left;
      .text1 {
        margin: 20px 0 12px 0px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .query {
      width: 240px;
    }
    .tab-block {
      position: relative;
      .tab-block-inner {
        position: absolute;
        right: 0;
        top: 0px;
      }
    }
  }
}
</style>
<template>
    <div class='peopleProject'>
        <div>
            <div class='title'>
                <div class='left'>
                    <div class="tab-block">
                        <div class='text1'>当前位置：全民项目管理</div>
                        <div class="tab-block-inner">
                            <el-input v-model="searchObj.search" class='query' placeholder="可按项目编号/项目名称进行查询"></el-input>
                            <el-button icon="el-icon-search" circle></el-button>
                            <el-button type="primary">新增</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      searchObj: {
        search: ""
      }
    };
  }
};
</script>
