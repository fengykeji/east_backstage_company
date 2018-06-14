<style lang="less" scoped>
.addPerson {
  width: 950px;
  margin: 0 auto;
  border: 1px solid #999;
  text-align: left;
  padding: 15px 30px;
  margin-top: 40px;
}
.input1 {
  width: 200px;
  display: inline-block;
  padding-right: 30px;
    vertical-align: middle;
}
.border {
  border: 1px solid #888;
  padding: 0 10px;
  border-radius: 4px;
  height: 40px;
  margin-top: 32px;
}
.el-form-item {
  margin-bottom: 5px;
}
.num_set {
  padding-top: 15px;
  font-size: 24px;
  text-align: left;
}
.cancel {
  margin-top: 20px;
  text-align: right;
}
.box{
  padding-left: 20px;
  padding-bottom: 30px;
  text-align: right;
}
.el-form-item{
  margin: 2px 0;
}
.query{
    width: 200px;
    margin:12px 0;
}
.select{
}
.selectDis{
 display: inline-block;
}
</style>
<template>
    <div class='addPerson'>
        <div class='box'>
                <div class='num_set'>选择</div>
                <div class='btn'>
                     <el-button type="primary">确定</el-button>
                     <el-button  @click="close">返回</el-button>
                </div>
                   <!-- <span class='selectDis'>
                         <city-selector class='select' :province.sync="form.province" :city.sync="form.city" :district.sync="form.district"/>
                   </span> -->
                <span>
                    <el-input class='query'></el-input>
                    <el-button icon="el-icon-search" circle></el-button>
                 </span>
             <div>
             </div>
            <el-table :data="startApply" border>
                <el-table-column property="id" label="序号" align='center'></el-table-column>
                <el-table-column property="name" label="项目名称" align='center'></el-table-column>
                <el-table-column property="name" label="地址" align='center'></el-table-column>
                <el-table-column property="phone" label="项目编号" align='center'></el-table-column>
                <el-table-column property="phone" label="项目负责人" align='center'></el-table-column>
                <el-table-column property="phone" label="联系方式" align='center'></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
// import CitySelector from "../../../components/CitySelector";
export default {
  data() {
    return {
        form:{

        },  
        startApply:[],
    };
  },
  mounted(){
  },
  methods:{



    close(){
        this.$router.push({ name: "distribution", params: this.$route.params });
    },

  },
  // components: {
  //   CitySelector: CitySelector
  // }
};
</script>


