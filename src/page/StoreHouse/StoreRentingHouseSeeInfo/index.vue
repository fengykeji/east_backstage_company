<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.storeRentingHouseSeeInfo {
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
    <div class='storeRentingHouseSeeInfo'>
        <div class='info'>
            <div class='title-info'>
                当前位置：房源管理 ➟ 租房 ➟ 房源详情
            </div>
            <div class='company'>
                <div class='company-block-one'>
                    <div class='title'>
                        <el-button type="primary" class='title-btn' @click='cancel'>关闭</el-button>
                    </div>
                    <div>
                         <div class='content'>
                        <div class='content_title'>挂牌信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>挂牌标题：</div>
                                <el-form-item class='input'>
                                    {{"云算科技"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>月租金：</div>
                                <el-form-item class='input'>
                                    {{"2800"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>看房方式：</div>
                                <el-form-item class='input'>
                                    {{"云算科技"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>租房急迫度：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>出租原由：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>

                            <div class='block-info'>
                                <div class='input-title'>租房意愿度：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>付款方式：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>

                        </el-form>
                    </div>
                    </div>

                    <div>
                        <div class='content'>
                            <div class='content_title'>联系人信息</div>
                            <el-form :model="sumbitForm" class='form'>
                                <div class='block-info'>
                                    <div class='input-title'>姓名：</div>
                                    <el-form-item class='input'>
                                        {{"张三"}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>证件类型：</div>
                                    <el-form-item class='input'>
                                        {{"身份证"}}
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>性别：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info'>

                                    <div class='input-title'>证件号码：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>类型：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>联系电话1：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info left-200px'>
                                    <div class='input-title'>联系电话2：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>通讯地址：</div>
                                    <el-form-item class='input-width'>
                                    </el-form-item>
                                </div>

                            </el-form>
                        </div>
                    </div>
                    <div>
                        <div class='content'>
                            <div class='content_title'>房源信息</div>
                            <el-form :model="sumbitForm" class='form'>
                                <div class='block-info'>
                                    <div class='input-title'>产权编号：</div>
                                    <el-form-item class='input'>
                                        {{"001"}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>楼层：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>拿证时间：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>房号：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div><br>

                                <div class='block-info'>
                                    <div class='input-title'>物业类型：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>朝向：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>楼层类型：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>年代：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>产权面积：</div>
                                    <el-form-item class='input'>
                                        {{"120/㎡"}}
                                    </el-form-item>
                                </div>

                                <div class='block-info'>
                                    <div class='input-title'>房型：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title pd-r-14px'>楼户比：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>装修：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>项目地址：</div>
                                    <el-form-item class='input-width'>
                                        {{"四川省成都市犀浦"}}
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                    </div>
                    <div>
                        <div class='content'>
                            <div class='content_title'>图片信息</div>
                            <el-form :model="sumbitForm" class='form'>
                                <div class='block-info'>
                                    <div class='input-title'>户型图片</div>
                                    <el-form-item class='img'>
                                        <img/>
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>房源图片</div>
                                    <el-form-item class='img'>
                                        <img/>
                                    </el-form-item>
                                </div><br>
                            </el-form>
                        </div>
                    </div>
                    <div class='content'>
                        <div class='content_title'>报备信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>项目名称：</div>
                                <el-form-item class='input'>
                                    {{"天鹅湖项目 - 17栋 - 2单元 - 103"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>报备经纪人：</div>
                                <el-form-item class='input'>
                                    {{"阿斯顿"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>房源编号：</div>
                                <el-form-item class='input'>
                                    {{"CD - TEH - 20170810 - 1（F）"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>报备人电话：</div>
                                <el-form-item class='input'>
                                    {{"13666666666"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>

                                <div class='input-title'>报备时间：</div>
                                <el-form-item class='input'>
                                    {{"2018-9-9"}}
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>勘察信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>抢单时间：</div>
                                <el-form-item class='input-1'>
                                    {{"2018-8-8"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>勘察经纪人：</div>
                                <el-form-item class='input-1'>
                                    {{"阿斯顿"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>预约勘察时间：</div>
                                <el-form-item class='input-1'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>勘察经纪人电话：</div>
                                <el-form-item class='input-1'>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>失效信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>失效时间：</div>
                                <el-form-item class='input'>
                                    {{"2018-6-6"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>失效类型：</div>
                                <el-form-item class='input'>{{'N小时内未判断房源真实性'}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>失效描述：</div>
                                <el-form-item class='input-width-height'>{{'24小时内未判断房源真实性，失效！'}}
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
