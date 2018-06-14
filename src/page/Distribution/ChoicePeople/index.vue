<style lang="less" scoped>
.addPerson {
  width: 760px;
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
  font-size: 20px;
}
.cancel {
  margin-top: 20px;
  text-align: right;
}
.button{
  position: relative;
  top: 16px;
}
.btn{
 position: relative;
 left: 320px;
  .btn-1{
    margin-right: 120px;
  }
}
.box{
  padding-left: 20px;
  padding-bottom: 30px;
}
.el-form-item{
  margin: 2px 0;
}
.query{
    width: 200px;
    margin:12px 0;
}
</style>
<template>
    <div class='addPerson'>
        <div class='box'>
            <span class='num_set'>选择经纪人</span>
             <div>
                 <el-input class='query'></el-input>
                 <el-button icon="el-icon-search" circle></el-button>
                 <span class='btn'>
                    <el-button type="primary">确定</el-button>
                    <el-button class='btn-1' @click="close">返回</el-button>
                 </span>
             </div>
            <el-table :data="person" border>
                <el-table-column property="id" label="序号" align='center'></el-table-column>
                <el-table-column property="name" label="云算号" align='center'></el-table-column>
                <el-table-column property="name" label="经纪人名称" align='center'></el-table-column>
                <el-table-column property="phone" label="联系电话" align='center'></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        person:[],
    };
  },
  mounted(){
      this.addAgent();
  },
  methods:{
      async addAgent(){
          let res=await this.api.addAgent();
          if(res.code==0){
              this.person=res.data;
          }
      },
    
    close(){
        this.$router.push({ name: "addPerson", params: this.$route.params });
    },

  }
};
</script>


