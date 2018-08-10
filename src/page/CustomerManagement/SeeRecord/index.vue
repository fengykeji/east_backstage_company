<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.customeSeeRecord {
  .el-form-item {
    margin-bottom: 8px;
    margin-right: 5%;
  }
  .el-form-item__content {
    line-height: 25px;
    height: 25px;
  }
}
</style>

<template>
    <div class='customeSeeRecord'>
        <div class='info'>
            <div class='title-info'>
                当前位置：客户管理 ➟ 带看记录
            </div>
            <div class='company'>
                <div class='company-block-one'>
                    <div class='title'>
                        <el-button type="primary" class='title-btn' @click='cancel'>关闭</el-button>
                    </div>
                    <div class='content'>
                        <div class='content_title'>带看记录</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>房源编号：</div>
                                <el-form-item class='input'>
                                    {{"CD - YSGG -20180314 - 1[F]"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-14px'>房号：</div>
                                <el-form-item class='input'>
                                    {{"云算公馆 - 1批次 - 1栋 - 1单元 - 102"}}
                                </el-form-item>
                            </div><br>
                             <div class='block-info'>
                                <div class='input-title'>是否出价：</div>
                                <el-form-item class='input'>
                                    {{"是"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>意向度：</div>
                                <el-form-item class='input'>
                                    {{"200"}}
                                </el-form-item>
                            </div><br>
                           
                            <div class='block-info'>
                                <div class='input-title'>出价金额：</div>
                                <el-form-item class='input'>
                                    {{"200000"}}
                                </el-form-item>
                            </div>
                             <div class='block-info'>
                                <div class='input-title'>附带看：</div>
                                <el-form-item class='input'>
                                    {{"200000"}}
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>付款方式：</div>
                                <el-form-item class='input'>
                                    {{"200000"}}
                                </el-form-item>
                            </div><br>
                           
                            <div class='block-info'>
                                <div class='input-title'>客户中意点：</div>
                                <el-form-item class='input-width-height'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title pd-r-14px'>客户抗性：</div>
                                <el-form-item class='input-width-height'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title pd-r-41px'>备注：</div>
                                <el-form-item class='input-width-height'>
                                </el-form-item>
                            </div><br>

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
      sumbitForm: {},
      tableData: []
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
