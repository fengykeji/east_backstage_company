<style lang="less" scoped src="./icon.less"></style>

<style scoped lang="less">
.sidebar-menu {
  position: fixed !important;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 100;
  width: 200px;
  margin-top: 60px;
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
  height: 60px;
  background: #fff;
  z-index: 110;
  text-align: left;
  border-bottom: 1px solid #eee;
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
  padding-top: 4px;
  padding-left: 11px;
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
      <el-submenu index=''>
        <template slot="title">
          <span class='delent'>
            <i class="icon-project"></i>项目管理</span>
        </template>
        <el-menu-item index="project" class='people' @click="handleSelect('project')" v-if='this.store_id==0'>新房</el-menu-item>
        <el-menu-item index="twoHouse" class='people' @click="handleSelect('twoHouse')">二手房</el-menu-item>
      </el-submenu>
      <el-menu-item index="distribution" class='text' @click="handleSelect('distribution')" v-if='this.store_id==0'>
        <i class="icon-distribution"></i>分销管理</el-menu-item>
      <el-menu-item index="peopleProject" class='text' @click="handleSelect('peopleProject')" v-if='this.store_id==0'>
        <i class="icon-peopleProject"></i>全民项目管理</el-menu-item>
      <el-menu-item index="commission" class='text' @click="handleSelect('commission')" v-if='this.store_id==0'>
        <i class="icon-commission"></i>项目佣金管理</el-menu-item>
      <el-menu-item index="distri_commission" class='text' @click="handleSelect('distri_commission')" v-if='this.store_id==0'>
        <i class="icon-distri_commission"></i>分销佣金管理</el-menu-item>
      <el-submenu index='agent' v-if='this.store_id==0'>
        <template slot="title">
          <span class='delent'>
            <i class="icon-agent"></i>经纪人管理</span>
        </template>
        <el-menu-item index="agent" class='people' @click="handleSelect('agent')">在职经纪人</el-menu-item>
        <el-menu-item index="examinePeople" class='people' @click="handleSelect('examinePeople')">审核经纪人</el-menu-item>
        <el-menu-item index="quitPeople" class='people' @click="handleSelect('quitPeople')">离职经纪人</el-menu-item>
      </el-submenu>

      <el-submenu index='agentStore' v-if='this.store_id!=0'>
        <template slot="title">
          <span class='delent'>
            <i class="icon-agent"></i>经纪人审核</span>
        </template>
        <el-menu-item index="agentStore" class='people' @click="handleSelect('agentStore')">在职经纪人</el-menu-item>
        <el-menu-item index="examinePeopleStore" class='people' @click="handleSelect('examinePeopleStore')">审核经纪人</el-menu-item>
        <el-menu-item index="quitPeopleStore" class='people' @click="handleSelect('quitPeopleStore')">离职经纪人</el-menu-item>
      </el-submenu>

      <el-menu-item index="storeAuthorization" class='text' @click="handleSelect('storeAuthorization')" v-if='this.store_id==0'>
        <i class="icon-store"></i>门店管理</el-menu-item>

      <el-submenu index='houseTwoHouse' v-if='this.store_id==0'>
        <template slot="title">
          <i class="icon-house"></i>
          <span class='delent'>
            房源管理</span>
        </template>
        <el-menu-item index="houseTwoHouse" class='people' @click="handleSelect('houseTwoHouse')">二手房</el-menu-item>
        <el-menu-item index="rentHouse" class='people' @click="handleSelect('rentHouse')">租房</el-menu-item>
      </el-submenu>
      <el-submenu index='storeHouseTwoHouse' v-if='this.store_id!=0'>
        <template slot="title">
          <i class="icon-house"></i>
          <span class='delent'>
            房源管理(门店)</span>
        </template>
        <el-menu-item index="storeHouseTwoHouse" class='people' @click="handleSelect('storeHouseTwoHouse')">二手房</el-menu-item>
        <el-menu-item index="storeRentHouse" class='people' @click="handleSelect('storeRentHouse')">租房</el-menu-item>
      </el-submenu>
      <el-submenu index='customerNewHouse' v-if='this.store_id!=0'>
        <template slot="title">
          <i class="icon-house"></i>
          <span class='delent'>
            客户管理(门店)</span>
        </template>
        <el-menu-item index="customerNewHouse" class='people' @click="handleSelect('customerNewHouse')">新房</el-menu-item>
        <el-menu-item index="customerHouseTwoHouse" class='people' @click="handleSelect('customerHouseTwoHouse')">二手房</el-menu-item>
        <el-menu-item index="customerRentHouse" class='people' @click="handleSelect('customerRentHouse')">租房</el-menu-item>
      </el-submenu>
      <el-submenu index='dealNewHouse' v-if='this.store_id==0'>
        <template slot="title">
          <i class="icon-transaction"></i>
          <span class='delent'>
            交易管理</span>
        </template>
        <el-menu-item index="dealNewHouse" class='people' @click="handleSelect('dealNewHouse')">新房</el-menu-item>
        <el-menu-item index="dealTwoHouse" class='people' @click="handleSelect('dealTwoHouse')">二手房</el-menu-item>
        <el-menu-item index="dealRenting" class='people' @click="handleSelect('dealRenting')">租房</el-menu-item>
      </el-submenu>
      <el-menu-item index="purchaseContract" class='text' @click="handleSelect('purchaseContract')">
        <i class="icon-store"></i>代购合同管理</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "",
      company_name: "",
      name: "",
      store_id: ""
    };
  },
  created() {
    this.activeIndex = this.$route.name;
  },
  mounted() {
    this.name = localStorage.getItem("name");
    this.company_name = localStorage.getItem("company_name");
    this.store_id = localStorage.getItem("store_id");
    console.log(this.store_id);
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

