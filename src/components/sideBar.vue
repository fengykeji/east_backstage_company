<style scoped>
.el-menu-demo {
   position: fixed;
    left: 0;
    top:0;
    height: 100%;
    z-index:100;
    width: 160px;
    border-right: 1px solid #aaaaaa;
}
.text {
  font-size: 16px;
  color: #999;
 width: 160px;
}
.delent{
    font-size: 16px;
    color: #999;
    width:160px;
    text-align: center;
}
.box {
  background-color: #fff;
}
.el-submenu .el-menu-item{
  min-width:0px;
  width: 140px;
  margin: 0;
}
</style>
<template>
<div class='box'>
<el-menu :default-active="activeIndex" class='el-menu-demo' mode="horizontal" @select="handleSelect">
  <el-menu-item index="project" class='text' @click="handleSelect('project')">项目管理</el-menu-item>
  <el-submenu index='' class='delent'>
      <template slot="title">
       <el-menu-item index="distribution" class='text'  @click="handleSelect('distribution')">分销管理</el-menu-item>
      </template>
      <el-menu-item index="fastDistribution" class='people'>分配到访确认人</el-menu-item>
  </el-submenu>
  <el-menu-item index="commission" class='text' @click="handleSelect('commission')">项目佣金管理</el-menu-item>
  <el-menu-item index="distri_commission" class='text' @click="handleSelect('distri_commission')">分销佣金管理</el-menu-item>
   <el-menu-item index="agent" class='text' @click="handleSelect('agent')">经纪人管理</el-menu-item>
</el-menu>
</div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "",
    };
  },
  created() {
    this.activeIndex = this.$route.name;
  },
  methods: {
    handleSelect(param) {
      this.$router.push(param);
    }
  }
};
</script>

