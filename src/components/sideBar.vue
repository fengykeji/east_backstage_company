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
.el-menu--horizontal>.el-menu-item.is-active{
  background-color:rgb(167, 193, 241);
  color: #fff;
  border: none;
}
.box {
  background-color: #fff;
}
</style>
<template>
<div class='box'>
<el-menu :default-active="activeIndex" class='el-menu-demo' mode="horizontal" @select="handleSelect">
  <el-menu-item index="project" class='text' @click="handleSelect('project')">项目管理</el-menu-item>
  <el-menu-item index="distribution" class='text' @click="handleSelect('distribution')">分销管理</el-menu-item>
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

