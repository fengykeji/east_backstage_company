<style lang="less" scoped src="./index.less">
</style>
<style lang="less">
.addPurchaseContract {
  .el-form-item {
    margin: 0;
  }
  .el-input__inner {
    height: 30px;
  }
  .el-form-item__label {
    line-height: 22px;
  }
  .el-button {
    padding: 8px 18px;
  }
}
</style>

<template>
    <div class='addPurchaseContract'>
        <div class="addPurchaseContract-wrapper">
            <div class="addPurchaseContract-wrapper-inner">
                <div class='title-top'>
                    <span>申请代购合同信息</span>
                    <span class="title-btn">
                        <el-button type="primary" @click='examine'>审核</el-button>
                        <el-button @click='cancel'>取消</el-button>
                    </span>
                </div>
                <div class='table_box'>
                    <el-form :model="form" class='form'>
                        <div class='title-text'>客户信息（甲方）</div>
                        <el-form-item label="代购合同编号" class='input'>
                            <el-input v-model="form.agent_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="证件类型" class='input'>
                            <el-input v-model="form.agent_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="客户姓名" class='input'>
                            <el-input v-model="form.agent_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="证件编号" class='input'>
                            <el-input v-model="form.agent_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话1" class='input'>
                            <el-input v-model="form.agent_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="通讯地址" class='input_adr'>
                            <el-input v-model="form.agent_name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="form" class='form'>
                        <div class='title-text'>经办人信息（乙方）</div>
                        <el-form-item label="代办人" class='input'>
                            <el-input v-model="form.agent_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" class='input'>
                            <el-input v-model="form.agent_tel" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="登记日期" class='input'>
                            <el-input v-model="form.create_time" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="form" class='form'>
                        <div class='title-text'>房源信息
                            <div class='huose_btn'>选房</div>
                        </div>
                        <el-form-item label="房源编号" class='input'>
                            <el-input v-model="form.house_code" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑面积" class='input'>
                            <el-input v-model="form.build_area" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所属项目" class='input'>
                            <el-input v-model="form.project_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="房屋所有权证号" class='input'>
                            <el-input v-model="form.permit_code" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="房号" class='input'>
                            <el-input :value="form.build_name+form.unit_name+form.house_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="国土使用证号" class='input'>
                            <el-input v-model="form.land_use_permit_code" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="项目地址" class='input_adr'>
                            <el-input v-model="form.project_name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="form" class='form'>
                        <div class='title-text'>交易信息</div>
                        <el-form-item label="交易总价" class='input'>
                            <el-input v-model="form.total_price" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="付款方式" class='input'>
                            <el-select v-model="form.pay_way_name" placeholder="请选择付款方式">
                                <el-option v-for="item in pay_wayOptions" :key="item.id" :label="item.param" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="诚意金" class='input'>
                            <el-input v-model="form.earnest_money" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="约定签约时间" class='input'>
                            <el-input v-model="form.appoint_construct_time" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="违约金" class='input'>
                            <el-input v-model="form.break_money" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="佣金" class='input'>
                            <el-input v-model="form.broker_num" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="审核人" class='input' v-if='this.operationType!=4'>
                            <el-input v-model="form.check_person" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="审核时间" class='input' v-if='this.operationType!=4'>
                            <el-input v-model="form.check_time" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      pay_wayOptions: [],
      sub_id: "",
      operationType: "" //0 新增 1打印 2查看 3 挞定 4审核
    };
  },
  mounted() {
    this.operationType = this.$route.query.operationType;
    this.sub_id = this.$route.query.sub_id;
    this.getContractExInfo();
  },
  methods: {
    async examine() {
      let temp = {};
      temp.sub_id = this.sub_id;
      temp.total_price = this.form.total_price;
      temp.earnest_money = this.form.earnest_money;
      temp.break_money = this.form.break_money;
      temp.broker_num = this.form.broker_num;
      temp.appoint_construct_time = this.form.appoint_construct_time;
      temp.pay_way = this.form.pay_way_name;

      let res = await this.api.contractExSubmit(temp);
      if (res.code == 200) {
      }
    },
    async getContractExInfo() {
      let res = await this.api.getContractExInfo({ sub_id: this.sub_id });
      if (res.code == 200) {
        this.form = res.data;
        this.pay_wayOptions = res.data.pay_way;
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
