<style lang="less" scoped src="./index.less" ></style>
<style>
.el-form-item__label {
  float: none;
}
.el-dialog__body {
  padding-top: 0;
}
</style>
<template>
    <div class='box'>
        <div class='title'>
            <span></span>
            <span class='left'>
                <div class='text1'>当前位置：项目分销</div>
                 <div>
                    <el-button class='tip' type="text" @click="search(0)">全部</el-button>
                    <el-button class='tip' type="text" @click="search(1)">待审核</el-button>
                    <el-button class='tip' type="text" @click="search(2)">已通过</el-button>
                    <el-button class='tip' type="text" @click="search(3)">以终止</el-button>
                 </div>
            </span>
              <el-input class='query'></el-input>
                <el-button icon="el-icon-search" circle></el-button>
            <span class='right'>
                 <el-button type="primary">发起申请</el-button>
                 <el-button type="primary" @click='fastDistribution'>分配到访确认人</el-button>
            </span>
        </div>
         <div class='search'>
          <div>
              <span class='block'>
                  <div>
                      <span class='row'>项目编号：</span>
                      <el-input class='input'></el-input>
                  </div>
                  <div>
                      <span class='row'>开发商名：</span>
                      <el-input class='input'></el-input>
                  </div>
              </span>
              <span class='block'>
                 <div>
                      <span class='row'>项目名称：</span>
                      <el-input class='input'></el-input>
                  </div>
                  <div>
                      <span class='row'>所属单位：</span>
                      <el-input class='input'></el-input>
                  </div>
              </span>
              <span class='block'>
                 <div>
                      <span class='row'>区域：</span>
                      <el-select v-model="value" placeholder="请选择">
                         <el-option v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                      </el-select>
                  </div>
                  <div>
                       <span class='row'>来源：</span>
                       <el-select v-model="value" placeholder="请选择">
                         <el-option v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
                       </el-select>
                  </div>
              </span>
          </div>
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="" label="序号"  align='center' width="70px"> </el-table-column>
    <el-table-column  prop="project_code"  label="项目编号"  align='center'></el-table-column>
    <el-table-column  prop="project_name" label="项目名称" align='center'></el-table-column>
    <el-table-column  prop="end_state" label="项目状态" align='center' width="90px">
        <template slot-scope="scope">{{projectState(scope.row.end_state)}}</template>
    </el-table-column>
    <el-table-column  prop="city" label="区域" align='center'></el-table-column>
    <el-table-column  prop="absolute_address" label="地址" align='center'></el-table-column>
    <el-table-column  prop="subordinate_company" label="项目所属单位" align='center'></el-table-column>
    <el-table-column  prop="company_relation" label="与项目关系" align='center'></el-table-column>
    <el-table-column  prop="developer_name" label="所属单位" align='center'></el-table-column>
    <el-table-column  prop="source" label="来源" align='center' width="80px">
         <template slot-scope="scope">{{scopeState (scope.row.source)}}</template>
    </el-table-column>
    <el-table-column prop="state" label="审核状态" align='center' width="90px">
           <template slot-scope="scope">{{auditingState(scope.row.state)}}</template>
    </el-table-column>
    <el-table-column  prop="is_distribution" label="分配状态" align='center'></el-table-column>
    <el-table-column prop="operation" label="操作" align='center'>
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
          <el-button type="text">修改</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>
  <!-- <el-dialog title="项目分销详情" :visible.sync="dialogFormVisible">
      <el-form :model="form" class='form'>
      <div>
            <el-form-item label="项目编号" class='input'>
          <el-input v-model="form.project_code" auto-complete="off" placeholder="请输入项目名称"></el-input>
        </el-form-item>
         <el-form-item label="项目名称" class='input-right'>
          <el-input v-model="form.project_name" auto-complete="off" placeholder="请输入项目名称"></el-input>
        </el-form-item>
      </div>
          <el-form-item label="现住地址" class='select'>
              <el-select v-model="form.city_id" class='select-1' @change="blockList" >
                <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="form.block_id"  class='select-1'>
                  <el-option v-for="item in blockOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="form.block_id"  class='select-1'>
                  <el-option v-for="item in blockOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-input class='input-address'></el-input>
          </el-form-item>
        <el-form-item label="物业类型" class='select'> 
           <el-radio-group v-model="form.resource">
              <el-radio label="住宅"></el-radio>
              <el-radio label="公寓"></el-radio>
               <el-radio label="别墅"></el-radio>
              <el-radio label="商铺"></el-radio>
               <el-radio label="写字楼"></el-radio>
              <el-radio label="车位"></el-radio>
           </el-radio-group>
        </el-form-item>
          <el-form-item label="项目状态" class='input'>
          <el-input v-model="form.end_state" auto-complete="off"></el-input>
        </el-form-item><br/>
          <el-form-item label="项目负责人" class='input'>
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
          <el-form-item label="联系电话" class='input-right'>
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
          <el-form-item label="开发商" class='input'>
          <el-input v-model="form.developer_name" auto-complete="off"></el-input>
        </el-form-item>
          <el-form-item label="结佣单位" class='input-right'>
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="所属单位" class='input'>
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
          <el-button type="text">查看</el-button>
           <span class='select-tip'>
                <el-form-item label="与项目关系"> 
                <el-radio-group v-model="form.resource">
                    <el-radio label="分销"></el-radio>
                </el-radio-group>
            </el-form-item>
           </span>
      </el-form>
    <div class='num_set'>结佣规则</div>
   <el-table :data="gridData" border>
      <el-table-column  type="selection"></el-table-column>
      <el-table-column prop="date" label="序号" align='center'></el-table-column>
      <el-table-column prop="name" label="计划开始日期" align='center'></el-table-column>
      <el-table-column prop="address" label="计划截至日期" align='center'></el-table-column>
      <el-table-column prop="address" label="实际开始日期" align='center'></el-table-column>
      <el-table-column prop="address" label="实际截至日期" align='center'></el-table-column>
      <el-table-column prop="address" label="申请状态" align='center'></el-table-column>
      <el-table-column prop="address" label="执行状态" align='center'></el-table-column>
      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
        <el-button>查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button @click='cancel'>关 闭</el-button>
    <el-button type="primary" @click='submit'>确 定</el-button>
  </div>
</el-dialog> -->
</div>
</template>
<script>
export default {
  data() {
    return {
        tableData:[],
        project_id:'',
        options:[],
          value:'',
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(){
      let res=await this.api.getList();
      if(res.code==200){
        this.tableData=res.data;
      }
    },
    fastDistribution(){
      console.log( this.project_id);
      this.$router.push({
        name: "fastDistribution",
        params: {project_id: this.project_id}
      });
    },
     scopeState(row) {
      if (row == 1) {
        return "自行申请";
      } else if (row == 2) {
        return "项目方选择";
      }
    },
    projectState(row) {
      if (row == 0) {
        return "管理中";
      } else {
        return "以终止";
      }
    },
     auditingState(row) {
      if (row == 0) {
        return "停用";
      } else if (row == 1) {
        return "通过";
      } else if (row == 2) {
        return "审核中";
        
      }
    },
  }
};
</script>


