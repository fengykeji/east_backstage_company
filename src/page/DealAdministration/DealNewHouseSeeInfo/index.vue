<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.dealSeeInfo {
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
    <div class='dealSeeInfo'>
        <div class='info'>
            <div class='title-info'>
                当前位置：交易管理 ➟ 新房 ➟ 查看详情
            </div>
            <div class='company'>
                <div class='company-block-one'>
                    <div class='title'>
                        <el-button type="primary" class='title-btn' @click='cancel'>关闭</el-button>
                    </div>
                    <div class='content'>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>推荐编号：</div>
                                <el-form-item class='input'>
                                    {{"TB001"}}
                                </el-form-item>
                            </div>
                        </el-form>

                        <div class='content_title'>
                            <el-button type="primary" class='somme-btn' @click='lookMore'>查看更多</el-button>
                            成交信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>合同编号：</div>
                                <el-form-item class='input'>
                                    {{"1561564634153"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>成交总价：</div>
                                <el-form-item class='input'>
                                    {{"2512412.00"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>套内面积：</div>
                                <el-form-item class='input'>
                                    {{"200"}}㎡
                                </el-form-item>
                            </div>
                            <div class='block-info'>

                                <div class='input-title'>成交时间：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>到访信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>置业目的：</div>
                                <el-form-item class='input'>
                                    {{"居住"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>到访人数：</div>
                                <el-form-item class='input'>
                                    {{"2"}}人
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>到访时间：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>置业顾问：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>签字人名：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>

                            <div class='block-info'>
                                <div class='input-title'>选择的置业顾问：</div>
                                <el-form-item class='input-w-140px'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>备注：</div>
                                <el-form-item class='input-width-height'>
                                </el-form-item>
                            </div>
                            <div class='block-info1'>
                                <div class='input-title1'>身份证照片</div>
                                <el-form-item class='img'>
                                    <img/>
                                </el-form-item>
                            </div>
                            <div class='block-info1'>
                                <div class='input-title1'>到访照片</div>
                                <el-form-item class='img'>
                                    <img/>
                                </el-form-item>
                            </div>
                            <div class='block-info1'>
                                <div class='input-title1'>确认单图片</div>
                                <el-form-item class='img'>
                                    <img/>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>确认信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>对接人：</div>
                                <el-form-item class='input pd-r-14px'>
                                    {{"001"}}
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>联系电话：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>联系电话2：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>
                            <div class='border-1px'></div>
                            <div class='block-info'>
                                <div class='input-title'>客户姓名：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>证件类型：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>客户电话1：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>证件号码：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>客户电话2：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>确认时间：</div>
                                <el-form-item class='input'>
                                    {{"2018-9-9"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>客户电话3：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>通讯地址：</div>
                                <el-form-item class='input-width'>
                                    {{"四川省成都市犀浦"}}
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>推荐信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>推荐人：</div>
                                <el-form-item class='input pd-r-14px'>
                                    {{"001"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>联系电话1：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>所属公司：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>联系电话2：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='border-1px'></div>
                            <div class='block-info'>
                                <div class='input-title'>客户姓名：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>证件类型：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>客户电话1：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>证件号码：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>客户电话2：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>推荐时间：</div>
                                <el-form-item class='input'>
                                    {{"2018-9-9"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>客户电话3：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>
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
      this.$router.push({ name: "contractDealNewTwo" });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
