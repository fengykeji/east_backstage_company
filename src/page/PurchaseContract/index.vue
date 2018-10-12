<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.contract {
  text-align: left;
  font-size: 15px;
  text-indent: 35px;
  .title {
    text-align: center;
    font-size: 24px;
  }
  .row_center {
    text-align: left;
    width: 100%;
  }
  .display {
    display: inline-block;
    width: 40%;
    margin-top: 10px;
  }
  .margin-30px {
    margin: 40px 0;
  }
  .margin-t-20px {
    margin-top: 20px;
  }
}

.purchaseContract {
  .el-form-item__label {
    float: none;
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .el-dialog {
    width: 63%;
    top: -10%;
  }
  .el-table--border,
  .el-table--group {
    margin-top: 5px;
  }
  .el-table th {
    padding: 8px 0px;
    font-size: 14px;
    color: #333;
  }
  .el-table td {
    padding: 0;
    color: #333;
  }
  .el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .printExcel {
    display: none;
  }
}
.contract {
  .underline {
    text-decoration: underline;
    display: inline;
    padding: 0 5px;
  }
}
</style>
<template>
  <div class='purchaseContract project'>
    <div class='title'>
      <div class='left'>
        <div class="tab-block">
          <div class='text1'>当前位置：代购合同管理</div>
          <div class="tab-block-inner">
            <el-input v-model="searchObj.search" class='query' placeholder="可按项目编号/项目名称进行查询"></el-input>
            <el-button @click="search" icon="el-icon-search" circle></el-button>
            <!-- <el-button type="primary" @click='showAdd(0)'>新增</el-button> -->
          </div>
        </div>
        <div>
          <el-button class='tip' :class="tipActiveIndex==0?'active':''" type="text" @click="clickTip(0)">待审核列表</el-button>
          <el-button class='tip' :class="tipActiveIndex==1?'active':''" type="text" @click="clickTip(1)">维护列表</el-button>
        </div>
      </div>
    </div>
    <div>
      <contract-examine v-if="searchObj.tag_search == 0" :pageSize="pageSize" :page="searchObj.page" :tableData="tableData" @examine='examine' @printing='printing'></contract-examine>
      <maintain-list v-if="searchObj.tag_search == 1" :pageSize="pageSize" :page="searchObj.page" :tableData="tableData" @examine='examine' @tart='tart' @printing='printing'></maintain-list>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>

    <div class="printExcel">
      <div class='contract'>
        <div class='title'>房屋代购协议书</div>
        <div>委托方（甲方）：
          <span class="underline"> {{test.name}} </span> 身份证号码：
          <span class="underline"> {{test.name}} </span>
        </div>
        <div>受托方（乙方）：
          <span class="underline"> {{test.name}} </span> 身份证号码：
          <span class="underline"> {{test.name}} </span>
        </div>
        <div>根据《中华人民共和国合同法》等有关法律、法规规定，甲、乙双方在协商一致的基础上，就甲方委托乙方代为购买房屋事宜，达成如下协议：</div>
        <div>一、委托事项：</div>
        <div>1、甲方委托乙方以乙方名义购买房屋，房价款由甲方实际支付。乙方以自己的名义与xxxxxxxxxxxxxxxxx签订《房屋买卖合同》，并负责办理登记在乙方名义下的房屋产权证等相关手续。</div>
        <div>2、委托代购房屋的基本情况：</div>
        <div>2.1代购房屋位于
          <span class="underline"> {{test.name}} </span> 市
          <span class="underline"> {{test.name}} </span>区
          <span class="underline"> {{test.name}} </span>路/街
          <span class="underline"> {{test.name}} </span>号
          <span class="underline"> {{test.name}} </span>座/栋
          <span class="underline"> {{test.name}} </span>单元
          <span class="underline"> {{test.name}} </span>号
        </div>
        <div>
          <span class="underline"> {{test.name}} </span>房屋所有权证号为
          <span class="underline"> {{test.name}} </span>；国土使用证号为
          <span class="underline"> {{test.name}} </span>。（以房产证相关有效法律文件为准）</div>
        <div>2.2代购房屋面积约为
          <span class="underline"> {{test.name}} </span>㎡ 最终建筑面积以产权登记面积为准；</div>
        <div>2.3代购房屋的单价为人民币
          <span class="underline"> {{test.name}} </span>元/平方米， 总价款为人民币
          <span class="underline"> {{test.name}} </span>元， （￥）
          <span class="underline"> {{test.name}} </span>元。</div>
        <div>2.4乙方所代购的房屋所有权归甲方所有，甲方享有该房屋占有、使用、收益及处分的权利，乙方对受甲方委托购买的房屋无权行使甲方享有的前述权利，亦不得对受甲方委托购买的房屋进行侵占、破坏、转卖、出租、抵押及赠与等。</div>
        <div>二、房屋价款的支付方式：</div>
        <div>1、甲、乙双方确认：本协议签订之日，乙方以自己的名义向银行申请按揭贷款，签订《借款合同》。按揭贷款人民币元，用于一次性支付代购房屋的购房款；</div>
        <div>2、按揭的本金及利息由甲方按照上述《借款合同》的约定，负责偿还。甲方承担的房价款受国家政策或银行利率调整等因素影响，导致甲方需增加或减少支付按揭贷款的本金及利息，与乙方无关。</div>
        <div>三、甲方的权利义务：</div>
        <div>1、甲方有权在按揭付清之日后随时要求乙方将该代购房屋的房屋产权证等一切相关证明变更到甲方名下，从而享有实际购房者的全部权利；</div>
        <div>2、甲方应按照《借款合同》的约定按期向银行支付按揭贷款本金及利息。</div>
        <div>3、上述房屋产权证暂办至乙方名下，产权证由甲方保管，甲方有权在任何时间将产权变更至本人名下或甲方指定的其他人名下，或转让、出租及抵押该房屋，乙方应当协助甲方办理相关手续。</div>
        <div>4、甲方如需在上述房屋取得产权证之前转让该房屋，乙方应当协助甲方办理更名手续。</div>
        <div>5、开发商交付房屋时，由甲方收房；甲方对该房屋进行的装修及在该房屋内添置的所有家具、家电及物品等均归甲方所有。</div>
        <div>6、甲方有权随时解除本协议，解除本协议后十日内，乙方有义务协助将受甲方委托购买的房屋更名到甲方名下或甲方指定的其他人名下。</div>
        <div>四、乙方的权利义务：</div>
        <div>1、乙方应保证按照本协议第一条确认的内容与
          <span class="underline"> {{test.name}} </span>签订《房屋买卖合同》；</div>
        <div>2、乙方应在本协议签订之日，及时向银行申请与购房款数额相等的按揭贷款，用于一次性支付购房款；</div>
        <div>3、乙方应保证在甲方完成变更代购房屋产权证等相关证明之前，在该房屋上没有任何包括但不限于抵押权等他项权利存在；</div>
        <div>4、乙方在甲方行使权利，要求变更登记代购房屋产权证时，应积极予以协助和配合。在完成变更登记后，该房屋的一切权利即归甲方所有，与乙方无关。</div>
        <div>5、甲方保证乙方因代理甲方购买该房屋所产生的一切费用概由甲方承担，乙方不承担任何费用。</div>
        <div>6、乙方有义务将本协议代理购房事宜通知乙方的所有利害关系人（包括但不限于父母、子女及配偶），保证其利害关系人不得主张上述房屋所有权利。 乙方保证，除非根据有关法律、法规的规定应向有关政府主管部门或各方上级主管部门办理有关批准、备案的手续；或为履行在本协议下的义务或声明与保证须向第三人披露，或经协议甲方事先书面同意，乙方负有保密义务（除已在公共渠道获得的信息外）。</div>
        <div>五、违约责任：</div>
        <div>1、因甲方原因，导致本协议无法履行，乙方有权要求甲方向乙方支付违约金人民币
          <span class="underline"> {{test.name}} </span>元。</div>
        <div>2、因甲方原因，未按照《借款合同》约定偿还银行按揭贷款本金及利息，乙方有权要求解除本协议。</div>
        <div>3、因乙方原因，导致《房屋买卖合同》无法签订，甲方有权要求乙方向甲方支付违约金人民币
          <span class="underline"> {{test.name}} </span>元</div>
        <div>4、在签订《房屋买卖合同》后，因乙方原因，导致本协议无法履行或可能无法履行时，甲方有权立即要求乙方将代购房屋的房屋产权证变更到甲方名下，乙方应予以配合。并由乙方承担由此造成的一切损失。</div>
        <div>六、本协议的的有效期：</div>
        <div>1、本协议自双方签字确认之日起生效；</div>
        <div>2、本协议在下列情况下失效：</div>
        <div>2.1代购房屋的房屋产权证等相关证明变更到甲方名下。</div>
        <div>2.2乙方在本协议签订生效之日后 日内仍无法签订正式《房屋买卖合同》。</div>
        <div>七、其他</div>
        <div>1、本协议未尽事宜，可由双方协商签订补充协议，该补充协议与本协议具有同等法律效力。</div>
        <div>2、本协议产生争议的，双方应友好协商解决；协商不成的，由合同签订地法院管辖。</div>
        <div>3、本协议壹式四份，双方各执两份，具有同等法律效力。</div>
        <div class='row_center'>
          <span class='display'>
            甲 方：
            <span class="underline"> {{test.name}} </span>
            <div class='margin-30px'>（签字或盖章）：</div>
            <div>
              <span class="underline"> {{test.name}} </span>年
              <span class="underline"> {{test.name}} </span>月
              <span class="underline"> {{test.name}} </span>日
            </div>
          </span>
          <span class='display'>
            乙 方：
            <span class="underline"> {{test.name}} </span>
            <div class='margin-30px'>（签字或盖章）：</div>
            <div>
              <span class="underline"> {{test.name}} </span>年
              <span class="underline"> {{test.name}} </span>月
              <span class="underline"> {{test.name}} </span>日
            </div>
          </span>
        </div>

        <div class='margin-t-20px'>合同签订地：
          <span class="underline"> {{test.name}} </span>
        </div>
      </div>
    </div>

    <el-dialog title="挞定原因" :visible.sync="tartInfo" class='dialog' @close="cancelTartInfo">
      <el-form>
        <el-form-item label="挞定类型" class='select'>
          <el-select v-model="disabled_state" placeholder="请选择挞定类型">
            <el-option v-for="item in tartOptions" :key="item.id" :label="item.param" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="break_desc" class='textarea' type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTartInfo">取 消</el-button>
        <el-button type="primary" @click="check">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import contractExamine from "@/modules/PurchaseContract/contractExamine";
import maintainList from "@/modules/PurchaseContract/maintainList";
export default {
  data() {
    return {
      searchObj: {
        search: "",
        tag_search: "",
        page: 1
      },
      tartInfo: false,
      tipActiveIndex: "",
      pageSize: 0,
      total: 0,
      tableData: [],
      operationType: 0, //0 新增 1打印 2查看 3 挞定 4审核
      store_id: "",
      test: {
        name: ""
      },
      disabled_state: "", //挞定类型
      break_desc: "",
      sub_id: "",
      tartOptions: []
    };
  },
  created() {
    if (this.$route.query.tag_search) {
      this.searchObj.tag_search = this.$route.query.tag_search;
      this.tipActiveIndex = this.searchObj.tag_search;
    }
  },
  mounted() {
    if (this.searchObj.tag_search == 0) {
      this.getContractExList(); //待审核
    } else if (this.searchObj.tag_search == 1) {
      this.getContractList(); //维护
    }
  },
  methods: {
    //挞定
    async tart(row, type) {
      this.tartInfo = true;
      this.sub_id = row.sub_id;
      this.getBreakType();
    },
    //  获取挞定类型
    async getBreakType() {
      let res = await this.api.getBreakType();
      if (res.code == 200) {
        this.tartOptions = res.data;
      }
    },
    async check() {
      let temp = {};
      temp.break_desc = this.break_desc;
      temp.sub_id = this.sub_id;
      temp.disabled_state = this.disabled_state;
      let res = await this.api.break(temp);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "将挞定成功!"
        });
      }
      this.cancelTartInfo();
      this.getContractList();
    },
    cancelTartInfo() {
      this.disabled_state = '';
      this.break_desc = "";
      this.tartInfo = false;
    },
    //审核  //查看
    examine(row, type) {
      this.$router.push({
        name: "addPurchaseContract",
        query: {
          operationType: type,
          tag_search: this.searchObj.tag_search,
          sub_id: row.sub_id
        }
      });
    },
    async edit(row, type) {
      this.$router.push({
        name: "previewInfo",
        query: {
          operationType: type,
          store_id: row.store_id
        }
      });
    },
    // showAdd(type) {
    //   //新增0
    //   this.$router.push({
    //     name: "addPurchaseContract",
    //     query: {
    //       operationType: type
    //     }
    //   });
    // },
    search() {
      this.searchObj.page = 1;
      this.getContractExList();
    },
    async getContractExList() {
      let res = await this.api.getContractExList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    async getContractList() {
      let res = await this.api.getContractList(this.searchObj);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.per_page;
      }
    },
    clickTip(index) {
      this.searchObj.tag_search = index;
      let href = location.href;
      let p = href.indexOf("?");
      if (p != -1) {
        href = href.substring(0, p);
      }
      location.href = href + "?tag_search=" + this.searchObj.tag_search;
      this.tipActiveIndex = index;
      if (index == 0) {
        this.getContractExList();
      } else if (index == 1) {
        this.getContractList();
      }
    },
    pageChange(page) {
      this.searchObj.page = page;
      this.getContractExList();
    },
    //打印
    printing(row, type) {
      console.log(row);
      this.test.name = 123;

      this.$nextTick(() => {
        //保存以前页面
        let old = document.body.innerHTML;

        let htmlTest = document.querySelector(".printExcel");
        let content = htmlTest.innerHTML;

        //替换整个页面
        document.body.innerHTML = content;
        window.print();
        //刷新页面
        window.location.reload();

        //页面回到之前用下面
        // document.body.innerHTML = old;
      });
    }
  },
  components: {
    contractExamine,
    maintainList
  }
};
</script>


