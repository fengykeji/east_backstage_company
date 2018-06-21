<style lang="less" scoped src='./index.less'>
</style>


<template>
    <div class='maidInfo'>
        <div class='table'>
            <div class='title-text'>结佣信息</div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="address" label="序号" align='center'></el-table-column>
                <el-table-column prop="address" label="申请名称" align='center'></el-table-column>
                <el-table-column prop="address" label="申请金额" align='center'></el-table-column>
                <el-table-column prop="address" label="申请笔数" align='center'></el-table-column>
                <el-table-column prop="address" label="扣款金额" align='center'></el-table-column>
                <el-table-column prop="address" label="审核金额" align='center'></el-table-column>
                <el-table-column prop="address" label="已结金额" align='center'></el-table-column>
                <el-table-column prop="address" label="申请人员" align='center'></el-table-column>
                <el-table-column prop="address" label="申请时间" align='center'></el-table-column>
                <el-table-column prop="address" label="审核人员" align='center'></el-table-column>
                <el-table-column prop="address" label="审核时间" align='center'></el-table-column>
                <el-table-column prop="address" label="申请状态" align='center'></el-table-column>
                <el-table-column prop="address" label="付款状态" align='center'></el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button>查看</el-button>
                        <el-button>修改佣金</el-button>
                        <el-button>付款申请</el-button>
                        <el-button>付款情况</el-button>
                        <el-button>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [],
    };
  }
};
</script>

