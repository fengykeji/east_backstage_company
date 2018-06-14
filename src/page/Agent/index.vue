<style lang="less" scoped src="./index.less" ></style>
<template>
    <div class='box'>
        <div class='title'>
            <span></span>
            <span class='left'>
                <div class='text1'>当前位置：经纪人管理</div>
                 <div>
                    <span class='tip'>全部</span>
                    <span class='tip'>待审核</span>
                    <span class='tip'>审核通过</span>
                    <span class='tip'>审核不通过</span>
                    <span class='tip'>已离职</span>
                 </div>
            </span>
                 <el-input class='query'></el-input>
                <el-button icon="el-icon-search" circle></el-button>
            <span class='right'>
                <el-button type="primary">审核</el-button>
               <el-button type="primary">离职</el-button>
            </span>
        </div>
        <template>
  <el-table :data="tableData"  border  style="width: 100%">
    <el-table-column  prop="address" label="序号"  align='center'> </el-table-column>
    <el-table-column  prop="address"  label="云算号"  align='center'></el-table-column>
    <el-table-column  prop="address" label="名称" align='center'></el-table-column>
    <el-table-column  prop="address" label="联系方式" align='center'></el-table-column>
    <el-table-column  prop="address" label="申请项目" align='center'></el-table-column>
    <el-table-column  prop="address" label="角色" align='center'></el-table-column>
    <el-table-column  prop="address" label="所属部门" align='center'></el-table-column>
    <el-table-column  prop="address" label="职位" align='center'></el-table-column>
    <el-table-column  prop="address" label="申请时间" align='center'></el-table-column>
    <el-table-column  prop="address" label="城市" align='center'></el-table-column>
    <el-table-column  prop="address" label="区域" align='center'></el-table-column>
    <el-table-column  prop="address" label="入职时间" align='center'></el-table-column>
    <el-table-column  prop="address" label="离职时间" align='center'></el-table-column>
    <el-table-column  prop="address" label="审核状态" align='center'></el-table-column>
    <el-table-column  prop="address" label="工作状态" align='center'></el-table-column>
     <el-table-column property="address" label="操作" align='center'>
        <template slot-scope="scope">
          <el-button type="text" @click='see'>查看</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>
    </div>
</template>
<script>
export default {
  data() {
    return {
        tableData:[],
    };
  }
};
</script>


