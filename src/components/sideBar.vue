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
  <el-menu-item index="distribution" class='text' @click="handleSelect('distribution')">分销管理</el-menu-item>
  <el-menu-item index="commission" class='text' @click="handleSelect('commission')">项目佣金管理</el-menu-item>
  <el-menu-item index="distri_commission" class='text' @click="handleSelect('distri_commission')">分销佣金管理</el-menu-item>
  <el-submenu index='' >
      <template slot="title" >
       <span class='delent'>经纪人管理</span>
      </template>
      <el-menu-item index="agent" class='people'  @click="handleSelect('agent')">在职经纪人</el-menu-item>
      <el-menu-item index="examinePeople" class='people'  @click="handleSelect('examinePeople')">审核经纪人</el-menu-item>
      <el-menu-item index="quitPeople" class='people'  @click="handleSelect('quitPeople')">离职经纪人</el-menu-item>
  </el-submenu>
</el-menu>

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

