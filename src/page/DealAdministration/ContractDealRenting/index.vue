<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.contractDealRenting {
  .el-form-item {
    margin-bottom: 8px;
    margin-right: 10%;
  }
  .el-form-item__content {
    line-height: 25px;
    height: 25px;
  }
}
</style>

<template>
    <div class='contractDealRenting'>
        <div class='info'>
            <div class='title-info'>
                当前位置：交易管理 ➟ 租房 ➟ 合同详情
            </div>
            <div class='company'>
                <div class='company-block-one'>
                    <div class='title'>
                        <el-button type="primary" class='title-btn' @click='cancel'>关闭</el-button>
                    </div>
                    <div class='content'>
                        <div class='content_title'>房源信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>项目名称：</div>
                                <el-form-item class='input1'>
                                    {{"1561564634153"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>合同开始时间：</div>
                                <el-form-item class='input1'>
                                    {{"2512412.00"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>物业类型：</div>
                                <el-form-item class='input1'>
                                    {{"200"}}㎡
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>合同结束时间：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>合同总价：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-35px'>月租金：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>房号：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>合同信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>合同编号：</div>
                                <el-form-item class='input'>
                                    {{"200"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>已付金额(￥)：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>付款方式：</div>
                                <el-form-item class='input'>
                                    {{"押一付三"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>未付金额(￥)：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>登记人员：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>

                             <div class='block-info'>
                                <div class='input-title'>登记日期：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                        </el-form>
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
      sumbitForm: {}
    };
  },
  mounted() {},
  methods: {
    lookMore() {
      this.$router.push({ name: "contractDealRenting" });
    },

    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
