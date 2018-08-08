<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.contractDealNewTwo {
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
    <div class='contractDealNewTwo'>
        <div class='info'>
            <div class='title-info'>
                当前位置：交易管理 ➟ 合同详情
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
                                <div class='input-title'>建筑面积(㎡)：</div>
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
                                <div class='input-title'>套内面积(㎡)：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>房号：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>总价(￥)：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div><br>

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
                                <div class='input-title'>建筑成交单价 (￥)：</div>
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
                                <div class='input-title'>套内成交单价 (￥)：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>

                            <div class='block-info'>
                                <div class='input-title'>登记人员：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-32px'>未付金额(￥)：</div>
                                <el-form-item class='input '>
                                    {{"押一付三"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>登记日期：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-32px'>已付金额(￥)：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>

                <div>
                    <div class='content'>
                        <div class='content_title'>银行按揭</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>首付款(￥)：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title pd-r-10px'>首付分期：</div>
                                <el-form-item class='input'>
                                    {{"押一付三"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>按揭银行：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>

                            <div class='block-info'>
                                <div class='input-title pd-r-10px'>贷款金额：</div>
                                <el-form-item class='input'>{{"600000.00"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>贷款年限：</div>
                                <el-form-item class='input '>
                                    {{"20年"}}
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>

                <div>
                    <div class='content'>
                        <div class='content_title'>公积金按揭</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>公积金首付款(￥)：</div>
                                <el-form-item class='input-1'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title pd-r-10px'>公积金首付分期：</div>
                                <el-form-item class='input-1'>
                                    {{"押一付三"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title-1'>公积金按揭银行：</div>
                                <el-form-item class='input-1'>
                                </el-form-item>
                            </div>

                            <div class='block-info'>
                                <div class='input-title pd-r-10px'>公积金贷款金额：</div>
                                <el-form-item class='input-1'>{{"600000.00"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title-1'>公积金贷款年限：</div>
                                <el-form-item class='input-1'>
                                    {{"20年"}}
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>组合贷款</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>首付款(￥)：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title pd-r-10px'>首付分期：</div>
                                <el-form-item class='input'>
                                    {{"押一付三"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>公积金按揭银行：</div>
                                <el-form-item class='input-1'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title  pd-r-10px'>按揭银行：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>

                            <div class='block-info'>
                                <div class='input-title'>公积金贷款金额：</div>
                                <el-form-item class='input-1'>{{"600000.00"}}
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title pd-r-10px'>贷款金额：</div>
                                <el-form-item class='input'>{{"600000.00"}}
                                </el-form-item>
                            </div>
                               <div class='block-info'>
                                <div class='input-title'>公积金贷款年限：</div>
                                <el-form-item class='input-1'>
                                    {{"20年"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-10px'>贷款年限：</div>
                                <el-form-item class='input'>
                                    {{"20年"}}
                                </el-form-item>
                            </div>

                            

                        </el-form>
                    </div>
                </div>

                <div>
                    <div class='content'>
                        <div class='content_title'>分期</div>
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="" label="序号" align='center' width="70px">
                                <template slot-scope="scope">{{getIndex(scope)}}</template>
                            </el-table-column>
                            <el-table-column prop="store_code" label="时间" align='center' ></el-table-column>
                            <el-table-column prop="gave_code" label="金额" align='center'></el-table-column>
                            <el-table-column prop="contact" label="提醒时间" align='center'></el-table-column>
                            <el-table-column prop="contact_tel" label="备注" align='center'></el-table-column>
                        </el-table>

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
      sumbitForm: {},
      tableData:[]
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
