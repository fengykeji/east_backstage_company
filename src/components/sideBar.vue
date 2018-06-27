<style scoped lang="less">
.sidebar-menu {
  position: fixed !important;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
  width: 160px;
  border-right: 1px solid #aaaaaa;
  padding-top: 90px;
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
.title {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #fff;
  z-index: 110;
  text-align: left;
}
.top-name {
  position: absolute;
  top: 28px;
  right: 200px;
   font-size: 15px;
}
.top-text {
  position: absolute;
  top: 20px;
  right: 50px;
  font-size: 15px;
}
.tou {
  height: 55px;
  width: 110px;
  padding-left: 28px;
  padding-top: 10px;
  display: inline-block;
  vertical-align: middle;
}
.img {
  width: 100%;
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 0px;
  margin: 0;
}
</style>
<template>
  <div class='box'>
    <div class='title'>
      <span class='tou'>
        <img class='img' src='../assets/images/logo.png' />
      </span>
      <span class='top-name'>公司名称</span>
      <el-button type='text' class='top-text'>退出</el-button>
    </div>
    <el-menu :default-active="activeIndex" class="sidebar-menu" @open="menuOpen" @close="menuOpen">
      <el-menu-item index="project" class='text' @click="handleSelect('project')">项目管理</el-menu-item>
      <el-menu-item index="distribution" class='text' @click="handleSelect('distribution')">分销管理</el-menu-item>
      <el-menu-item index="commission" class='text' @click="handleSelect('commission')">项目佣金管理</el-menu-item>
      <el-menu-item index="distri_commission" class='text' @click="handleSelect('distri_commission')">分销佣金管理</el-menu-item>
      <el-submenu index=''>
        <template slot="title">
          <span class='delent'>经纪人管理</span>
        </template>
        <el-menu-item index="agent" class='people' @click="handleSelect('agent')">在职经纪人</el-menu-item>
        <el-menu-item index="examinePeople" class='people' @click="handleSelect('examinePeople')">审核经纪人</el-menu-item>
        <el-menu-item index="quitPeople" class='people' @click="handleSelect('quitPeople')">离职经纪人</el-menu-item>
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

