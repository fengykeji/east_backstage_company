<style lang="less" scoped src='./index.less'>
</style>


<template>
    <div class='maidInfo'>
        <div class='table'>
            <div class='title'>
                <div class='title-text'>结佣申请列表</div>
                <el-button class='pos-btn' type="primary" @click='cancel'>关闭</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" align='center'> </el-table-column>
                <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
                <el-table-column prop="begin_time" label="开始执行时间" align='center' width="120px"></el-table-column>
                <el-table-column prop="end_time" label="截至执行时间" align='center' width="120px"></el-table-column>
                <el-table-column prop="developer_name" label="房产商" align='center'></el-table-column>
                <el-table-column prop="city" label="区域" align='center'></el-table-column>
                <el-table-column prop="project_hold_name" label="项目负责人" align='center' width="110px"></el-table-column>
                <el-table-column prop="project_hold_phone" label="联系方式" align='center'></el-table-column>
                <el-table-column prop="all_price" label="累计金额" align='center'></el-table-column>
                <el-table-column prop="y_price" label="已结金额" align='center'></el-table-column>
                <el-table-column prop="chargebacks_price" label="扣款金额" align='center'></el-table-column>
                <el-table-column prop="n_price" label="未结金额" align='center'></el-table-column>
                <el-table-column prop="notice" label="提醒状态" align='center'></el-table-column>
                <el-table-column prop="state" label="状态" align='center'>
                    <template slot-scope="scope">{{state(scope.row)}}</template>
                </el-table-column>
                <el-table-column label="操作" align='center' width="230px">
                    <template slot-scope="scope">
                        <el-button>查看</el-button>
                        <el-button>修改佣金</el-button>
                        <el-button>付款申请</el-button>
                        <el-button>付款情况</el-button>
                        <el-button>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
                 <div class='title-text'>付款申请列表</div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" align='center'> </el-table-column>
                <el-table-column prop="project_name" label="项目名称" align='center'></el-table-column>
                <el-table-column prop="begin_time" label="开始执行时间" align='center' width="120px"></el-table-column>
                <el-table-column prop="end_time" label="截至执行时间" align='center' width="120px"></el-table-column>
                <el-table-column prop="developer_name" label="房产商" align='center'></el-table-column>
                <el-table-column prop="city" label="区域" align='center'></el-table-column>
                <el-table-column prop="project_hold_name" label="项目负责人" align='center' width="110px"></el-table-column>
                <el-table-column prop="project_hold_phone" label="联系方式" align='center'></el-table-column>
                <el-table-column prop="all_price" label="累计金额" align='center'></el-table-column>
                <el-table-column prop="y_price" label="已结金额" align='center'></el-table-column>
                <el-table-column prop="chargebacks_price" label="扣款金额" align='center'></el-table-column>
                <el-table-column prop="n_price" label="未结金额" align='center'></el-table-column>
                <el-table-column prop="notice" label="提醒状态" align='center'></el-table-column>
                <el-table-column prop="state" label="状态" align='center'>
                    <template slot-scope="scope">{{state(scope.row)}}</template>
                </el-table-column>
                <el-table-column label="操作" align='center' width="230px">
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
      tableData: []
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.$router.push({
        name: "distri_commission"
      });
    }
  }
};
</script>

