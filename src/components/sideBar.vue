<style lang="less" scoped src="./icon.less"></style>

<style scoped lang="less">
.sidebar-menu {
  position: fixed !important;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
  width: 200px;
  margin-top: 81px;
  text-align: left;
}
.text {
  font-size: 16px;
  color: #999;
  width: 200px;
  &.is-active {
    color: #409eff;
    background-color: rgb(236, 245, 255);
  }
}
.delent {
  font-size: 16px;
  color: #999;
  width: 200px;
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
  right: 320px;
  font-size: 15px;
}
.top-text {
  position: absolute;
  top: 19px;
  right: 50px;
  font-size: 15px;
}
.top-img {
  vertical-align: top;
  position: relative;
  top: -5px;
  width: 25px;
  height: 25px;
}
.top-one {
  position: absolute;
  top: 28px;
  right: 160px;
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
      <span class='top-name'>{{company_name}}
      </span>
      <span class='top-one'>个人名称: {{name}}
      </span>
      <span @click='cancel'>
        <el-button type='text' class='top-text'><img class='top-img' src='../assets/images/exit@2x.png' />退出</el-button>
      </span>
    </div>
    <el-menu :default-active="activeIndex" class="sidebar-menu" @open="menuOpen" @close="menuOpen">
      <el-menu-item index="project" class='text' @click="handleSelect('project')">
        <i class="icon-project"></i>项目管理</el-menu-item>
      <el-menu-item index="distribution" class='text' @click="handleSelect('distribution')">
        <i class="icon-distribution"></i>分销管理</el-menu-item>
      <el-menu-item index="commission" class='text' @click="handleSelect('commission')">
        <i class="icon-commission"></i>项目佣金管理</el-menu-item>
      <el-menu-item index="distri_commission" class='text' @click="handleSelect('distri_commission')">
        <i class="icon-distri_commission"></i>分销佣金管理</el-menu-item>
      <el-submenu index=''>
        <template slot="title">
          <span class='delent'>
            <i class="icon-agent"></i>经纪人管理</span>
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
      activeIndex: "",
      company_name: "",
      name: ""
    };
  },
  created() {
    this.activeIndex = this.$route.name;
  },
  mounted() {
    this.name = localStorage.getItem("name");
    this.company_name = localStorage.getItem("company_name");
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "login"
      });
    },
    handleSelect(param) {
      this.$router.push({ name: param });
    },
    menuOpen(index) {
      this.handleSelect(index);
    }
  }
};
</script>

