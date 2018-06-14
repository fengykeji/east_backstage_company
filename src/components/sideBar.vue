<style scoped <style lang="less">
.sidebar-menu {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
  width: 160px;
  border-right: 1px solid #aaaaaa;
}
.text {
  font-size: 16px;
  color: #999;
  width: 160px;
  &.is-active {
    color: #409eff;
    background-color: rgb(236, 245, 255);
  }
}
.delent {
  font-size: 16px;
  color: #999;
  width: 160px;
  text-align: center;
}
.box {
  background-color: #fff;
}
.el-submenu .el-menu-item {
  min-width: 0px;
  margin: 0;
}
</style>
<template>
<div class='box'>
<el-menu :default-active="activeIndex" class="sidebar-menu" @open="menuOpen" @close="menuOpen">
  <el-menu-item index="project" class='text' @click="handleSelect('project')">项目管理</el-menu-item>
  <el-submenu index='distribution' >
      <template slot="title" >
       <span class='delent' >分销管理</span>
      </template>
      <el-menu-item index="fastDistribution" class='people'  @click="handleSelect('fastDistribution')">分配到访确认人</el-menu-item>
  </el-submenu>
  <el-menu-item index="commission" class='text' @click="handleSelect('commission')">项目佣金管理</el-menu-item>
  <el-menu-item index="distri_commission" class='text' @click="handleSelect('distri_commission')">分销佣金管理</el-menu-item>
   <el-menu-item index="agent" class='text' @click="handleSelect('agent')">经纪人管理</el-menu-item>
</el-menu>
<!-- <el-menu
      default-active="2"
      class="sidebar-menu"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <span>导航一</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
    </el-menu> -->
</div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: ""
    };
  },
  created() {
    console.log(this.$route)
    this.activeIndex = this.$route.name;
  },
  methods: {
    handleSelect(param) {
      this.$router.push({ name: param });
    },
    menuOpen(index) {
      this.handleSelect(index);
    }
  }
};
</script>

