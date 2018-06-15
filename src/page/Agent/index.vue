<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
// .agent{
//     .dialog{
//         width: 900px;
//         position: fixed;
//         top:10%;
//         left:20%;
//         text-align: left;
//     }
//    .textarea{
//        width: 400px;
//    }
//    .el-dialog__body{
//        padding: 0px 20px;
//    }
// }
.agent{
    margin-left: 180px;
    margin-top: 150px;
    .title{
        background-color: #fafafc;
        text-align: left;
        padding-left: 180px;
        position: fixed;
        top: 0;
        left: 0;
        height: 100px;
        width: 100%;
        z-index: 99;
       
        .left{
            text-align: left;
            display: inline-block;
        .text1{
            padding-top: 10px;
            margin:10px 0 12px 20px;
        }
        }
    }
}
</style>

<template>
    <div class='agent'>
        <div class='title'>
            <span class='left'>
                <div class='text1'>当前位置：在职经纪人</div>
            </span>
                 <el-input class='query'></el-input>
                <el-button icon="el-icon-search" circle></el-button>
        </div>
        <template>
            <el-table :data="tableData"  border  style="width: 100%">
                <el-table-column  prop="" label="序号"  align='center'> </el-table-column>
                <el-table-column  prop="account"  label="云算号"  align='center'></el-table-column>
                <el-table-column  prop="name" label="名称" align='center'></el-table-column>
                <el-table-column  prop="tel" label="联系方式" align='center'></el-table-column>
                <el-table-column  prop="project_name" label="申请项目" align='center'></el-table-column>
                <el-table-column  prop="role" label="角色" align='center'>
                    <template slot-scope="scope">{{getRole(scope.row.role)}}</template>
                </el-table-column>
                <el-table-column  prop="department" label="所属部门" align='center'></el-table-column>
                <el-table-column  prop="position" label="职位" align='center'></el-table-column>
                <el-table-column  prop="city_name" label="城市" align='center'></el-table-column>
                <el-table-column  prop="district_name" label="区域" align='center'></el-table-column>
                <el-table-column  prop="entry_time" label="入职时间" align='center'></el-table-column>
                <el-table-column  label="操作" align='center'>
                    <template slot-scope="scope">
                    <el-button type="text" @click='showQuit(scope.row)'>离职</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-dialog title="离职申请" :visible.sync="dialogFormVisible" class='dialog'>
            <el-form :model="form">
                <el-form-item label="离职原因">
                    <el-input class='textarea' type="textarea"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="sumbit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
        tableData:[],
        dialogFormVisible:false,
        form:{},
    };
  },
  mounted(){
      this.getPayrollList();
  },
  methods:{

      getRole(row){
        if(row==1){
            return "经纪人"
        }else if(row==2){
            return "对接人"
        }
      },
      sumbit(){
      },
      async showQuit(row){
             console.log(row.id)
          let res=await this.api.quitPeople({id:row.id});
          if(res.code==200){
               this.$message({ type: "success", message: "离职成功" });
          }
          this.getPayrollList();
      },
      cancel(){
          this.dialogFormVisible=false;
      },
      async getPayrollList(){
          let res=await this.api.getPayrollList();

          if(res.code=200){
              this.tableData=res.data.data;
          } 
      }
  }

};
</script>


