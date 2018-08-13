<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.seeHouseInfo {
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
    <div class='seeHouseInfo'>
        <div class='info'>
            <div class='title-info'>
                当前位置：房源管理 ➟ 二手房 ➟ 房源详情
            </div>
            <div class='company'>
                <div class='company-block-one'>
                    <div class='title'>
                        <el-button type="primary" class='title-btn' @click='cancel'>关闭</el-button>
                    </div>
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
                                <div class='input-title'>看房方式：</div>
                                <el-form-item class='input'>
                                    {{"云算科技"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>对外报价：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>

                                <div class='input-title'>付款方式：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>产权所属：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>出售原由：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>抵押信息：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>产权年限：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>卖房意愿度：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>卖房急迫度：</div>
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

                <div>
                    <div class='content'>
                        <div class='content_title'>勘察信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>抢单时间：</div>
                                <el-form-item class='input1'>
                                    {{"2017-12-15 15:22"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>勘察经纪人：</div>
                                <el-form-item class='input1'>
                                    {{"张三"}}
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>勘察完成时间：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>勘察经纪人电话：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>报备信息</div>
                        <el-form :model="sumbitForm" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>项目名称：</div>
                                <el-form-item class='input'>
                                    {{"天鹅湖项目-17栋-2单元-103"}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>报备经纪人：</div>
                                <el-form-item class='input1'>
                                    {{"张三"}}
                                </el-form-item>
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>房源编号：</div>
                                <el-form-item class='input'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>报备经纪人电话：</div>
                                <el-form-item class='input1'>
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>报备时间：</div>
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
  mounted() {
      this.getStoreHouseInfo();
  },
  methods: {
      async getStoreHouseInfo(){
          let res=await this.api.getStoreHouseInfo();
          if(res.code==200){
              this.sumbitForm=res.data;
          }
      },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
