<style lang="less" scoped src='./index.less'>
</style>
<style lang="less">
.storeHouseSeeInfo {
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
    <div class='storeHouseSeeInfo'>
        <div class='info'>
            <div class='title-info'>
                当前位置：房源管理 ➟ 二手房 ➟ 房源详情
            </div>
            <div class='company'>
                <div class='company-block-one'>
                    <div class='title'>
                        <el-button type="primary" class='title-btn' @click='cancel'>关闭</el-button>
                    </div>
                    <div>
                        <div class='content'>
                            <div class='content_title'>挂牌信息</div>
                            <el-form :model="wear" class='form'>
                                <div class='block-info'>
                                    <div class='input-title'>挂牌标题：</div>
                                    <el-form-item class='input'>
                                        {{wear.title}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>看房方式：</div>
                                    <el-form-item class='input'>
                                        {{wear.check_way}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>对外报价：</div>
                                    <el-form-item class='input'>
                                        {{wear.price}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>

                                    <div class='input-title'>付款方式：</div>
                                    <el-form-item class='input'>
                                        {{wear.pay_way}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>产权所属：</div>
                                    <el-form-item class='input'>
                                        {{wear.property_belong}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>抵押信息：</div>
                                    <el-form-item class='input'>
                                        {{wear.is_mortgage}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>产权年限：</div>
                                    <el-form-item class='input'>
                                        {{wear.property_limit}}
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>卖房意愿度：</div>
                                    <el-form-item class='input'>
                                        {{wear.intent}}
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>卖房急迫度：</div>
                                    <el-form-item class='input'>
                                        {{wear.urgency}}
                                    </el-form-item>
                                </div>

                            </el-form>
                        </div>
                    </div>
                    <div>
                        <div class='content'>
                            <div class='content_title'>下架信息</div>
                            <el-form :model="house_disabled" class='form'>
                                <div class='block-info'>
                                    <div class='input-title'>下架时间：</div>
                                    <el-form-item class='input'>
                                        <!-- {{house_disabled.update_time}} -->
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>下架类型：</div>
                                    <el-form-item class='input'>
                                        <!-- {{house_disabled.disabled_type}} -->
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>下架描述：</div>
                                    <el-form-item class='input-width-height'>
                                        <!-- {{house_disabled.disabled_reason}} -->
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
                                        {{}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>证件类型：</div>
                                    <el-form-item class='input'>
                                        {{}}
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
                                    <div class='input-title'>联系电话：</div>
                                    <el-form-item class='input'>
                                    </el-form-item>
                                </div>
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
                            <el-form :model="house_info" class='form'>
                                <div class='block-info'>
                                    <div class='input-title'>产权编号：</div>
                                    <el-form-item class='input'>
                                        {{house_info.permit_code}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>楼层：</div>
                                    <el-form-item class='input'>
                                        {{house_info.floor_num}}
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>拿证时间：</div>
                                    <el-form-item class='input'>
                                        {{house_info.permit_time}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>房号：</div>
                                    <el-form-item class='input'>
                                        {{house_info.house_name}}
                                    </el-form-item>
                                </div><br>

                                <div class='block-info'>
                                    <div class='input-title'>物业类型：</div>
                                    <el-form-item class='input'>
                                        {{house_info.property_type}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>朝向：</div>
                                    <el-form-item class='input'>
                                        {{house_info.orientation}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>产权面积：</div>
                                    <el-form-item class='input'>
                                        {{house_info.build_area}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title'>房型：</div>
                                    <el-form-item class='input'>
                                        {{house_info.house_type_name}}
                                    </el-form-item>
                                </div>
                                <div class='block-info'>
                                    <div class='input-title  pd-r-28px'>装修：</div>
                                    <el-form-item class='input'>
                                        {{house_info.decoration}}
                                    </el-form-item>
                                </div><br>
                                <div class='block-info'>
                                    <div class='input-title'>项目地址：</div>
                                    <el-form-item class='input-width'>
                                        {{house_info.absolute_address}}
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                    </div>
                    <div>
                        <div class='content'>
                            <div class='content_title'>图片信息</div>
                            <div class='block-info'>
                                <div class='input-title'>户型图片</div>
                                <!-- 请换掉以下的东西 使用 element-ui -->
                                <!-- <mt-swipe :auto="0">
                                    <mt-swipe-item v-for="(img,index) in house_imgs" :key="index">
                                        <span class="img">
                                            <img :src="base + img.img_url" />
                                        </span>
                                    </mt-swipe-item>
                                    <mt-swipe-item v-for="(img,index) in house_imgs">
                                        <span class="img">
                                            <img :src="base + img.img_url" />
                                        </span>
                                    </mt-swipe-item>
                                </mt-swipe> -->
                            </div><br>
                            <div class='block-info'>
                                <div class='input-title'>房源图片</div>
                                <img/>
                            </div><br>
                        </div>
                    </div>
                    <div class='content'>
                        <div class='content_title'>报备信息</div>
                        <el-form :model="record" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>项目名称：</div>
                                <el-form-item class='input'>
                                    {{record.project_name}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>报备经纪人：</div>
                                <el-form-item class='input'>
                                    {{record.agent_name}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>报备时间：</div>
                                <el-form-item class='input'>
                                    {{record.create_time}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>报备人电话：</div>
                                <el-form-item class='input'>
                                    {{record.agent_tel}}
                                </el-form-item>
                            </div>

                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>勘察信息</div>
                        <el-form :model="survey" class='form'>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>抢单时间：</div>
                                <el-form-item class='input-1'>
                                    {{survey.create_time}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title pd-r-28px'>勘察经纪人：</div>
                                <el-form-item class='input-1'>
                                    {{survey.agent_name}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>预约勘察时间：</div>
                                <el-form-item class='input-1'>
                                    {{survey.reserve_time}}
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>勘察经纪人电话：</div>
                                <el-form-item class='input-1'>
                                    {{survey.agent_tel}}
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
                <div>
                    <div class='content'>
                        <div class='content_title'>失效信息</div>
                        <el-form :model="survey_disabled" class='form'>
                            <div class='block-info'>
                                <div class='input-title'>失效时间：</div>
                                <el-form-item class='input'>
                                    <!-- {{survey_disabled.update_time}} -->
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>失效类型：</div>
                                <el-form-item class='input'>
                                    <!-- {{survey_disabled.disabled_type}} -->
                                </el-form-item>
                            </div>
                            <div class='block-info'>
                                <div class='input-title'>失效描述：</div>
                                <el-form-item class='input-width-height'>
                                    <!-- {{survey_disabled.disabled_reason}} -->
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
      sumbitForm: {},
      record: {},
      survey: {},
      house_imgs: [],
      house_info: {},
      house_disabled: {},
      survey_disabled: {},
      wear: {},
      record_id: "",
      current_state: "",
      state: ""
    };
  },

  mounted() {
    this.record_id = this.$route.query.record_id;
    this.current_state = this.$route.query.current_state;
    this.state = this.$route.query.state;
    this.getStoreHouseInfo();
  },
  methods: {
    async getStoreHouseInfo() {
      let res = await this.api.getStoreHouseInfo({
        record_id: this.record_id,
        current_state: this.current_state,
        state: this.state
      });
      if (res.code == 200) {
        this.sumbitForm = res.data.record;
        this.record = res.data.record;
        this.survey = res.data.survey;
        this.house_imgs = res.data.house_img;
        this.house_info = res.data.house_info;
        // this.house_disabled = res.data.house_disabled;
        // this.survey_disabled = res.data.survey_disabled;
        this.wear = res.data.wear;
      }
    },
    lookMore() {
      this.$router.push({ name: "contractDealNewTwo" });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
