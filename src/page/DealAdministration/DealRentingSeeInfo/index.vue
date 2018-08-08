<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.dealRentingSeeInfo {
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
    <div class='dealRentingSeeInfo'>
        <div class='info'>
            <div class='title-info'>
                当前位置：交易管理 ➟ 租房 ➟ 查看详情
            </div>
            <div class='company'>
                <div class='company-block-one'>
                    <div class='title'>
                        <el-button type="primary" class='title-btn' @click='cancel'>关闭</el-button>
                    </div>
                    <div class='content'>
                        <div class='content_title'>
                            <el-button type="primary" class='somme-btn' @click='lookMore'>查看更多</el-button>
                            成交信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>合同编号：</div>
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
                                <div class='input-title'>合同总价：</div>
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
                                <div class='input-title pd-r-14px'>月租金：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>带看信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>抢单时间：</div>
                                <el-form-item class='input'>
                                    {{"居住"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>预约带看时间：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>带看经纪人：</div>
                                <el-form-item class='input-w-186px'>
                                    {{"2"}}人
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>带看经纪人电话：</div>
                                <el-form-item class='input-w-186px'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>带看完成时间：</div>
                                <el-form-item class='input-w-172px'>
                                </el-form-item>
                            </div>

                            <div class='block-info1'>
                                <div class='input-title1'>带看成交房源</div>
                                <el-form-item class='img'>
                                    <img/>
                                </el-form-item>
                                <span class='house-info'>
                                    <div class='house-info-text'>
                                        {{'新希望国际大厦 套三 清水房 可小刀'}}
                                    </div>
                                    <div class='house-info-text'>
                                        {{'房源编号：CD - YSGG -20180314 - 1[F]'}}
                                    </div>
                                    <div class='house-info-text'>
                                        {{'3室2厅/103㎡/东南/天鹅湖小区'}}
                                    </div>
                                    <div class='house-info-text'>
                                        {{'108万 10342元/㎡'}}
                                    </div>
                                </span>

                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>推荐信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>推荐编号：</div>
                                <el-form-item class='input'>
                                    {{"001"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>推荐经纪人：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>推荐时间：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>推荐人电话：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>客户信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>姓名：</div>
                                <el-form-item class='input pd-r-28px'>
                                    {{"001"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>联系电话1：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>性别：</div>
                                <el-form-item class='input pd-r-28px'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>联系电话2：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>年龄：</div>
                                <el-form-item class='input pd-r-28px'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>联系电话3：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>证件类型：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>

                            <div class='block-info'>
                                <div class='input-title'>出生年月：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>证件类型：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>证件号码：</div>
                                <el-form-item class='input'>
                                    {{"2018-9-9"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>通讯地址：</div>
                                <el-form-item class='input-width'>
                                    {{"四川省成都市犀浦"}}
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
