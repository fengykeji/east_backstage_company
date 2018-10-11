<style lang="less" scoped src="./index.less" ></style>
<style lang="less">
body {
  background-color: #fafafc;
}
.contract {
  text-align: left;
font-size: 15px;
  .title{
    text-align: center;
  font-size: 24px;
  }
  .row{
      text-indent: 35px;
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
      <maintain-list v-if="searchObj.tag_search == 1" :pageSize="pageSize" :page="searchObj.page" :tableData="tableData" @examine='examine' @printing='printing'></maintain-list>
      <el-pagination background class='page' layout="prev, pager, next" :page-size="pageSize" :current-page="searchObj.page" :total="total" @current-change="pageChange">
      </el-pagination>
    </div>

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
      tipActiveIndex: "",
      pageSize: 0,
      total: 0,
      tableData: [],
      operationType: 0, //0 新增 1打印 2查看 3 挞定 4审核
      store_id: ""
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
    //审核
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
      //保存以前页面
      let old = document.body.innerHTML;
      let html = "";
      html += "<div class='contract'>";
      html += "<div class='title'>房屋代购协议书</div>";
      html +=
        "<div class='row'>委托方（甲方）：_____________________    身份证号码：______________________________</div>";
      html +=
        "<div>受托方（乙方）：_____________________    身份证号码：______________________________</div>";
      html +=
        "<div>根据《中华人民共和国合同法》等有关法律、法规规定，甲、乙双方在协商一致的基础上，就甲方委托乙方代为购买房屋事宜，达成如下协议：</div>";
      html += "<div>一、委托事项：</div>";
      html +=
        "<div>1、甲方委托乙方以乙方名义购买房屋，房价款由甲方实际支付。乙方以自己的名义与xxxxxxxxxxxxxxxxx签订《房屋买卖合同》，并负责办理登记在乙方名义下的房屋产权证等相关手续。</div>";
      html += "<div>2、委托代购房屋的基本情况：</div>";
      html +=
        "<div>2.1代购房屋位于_________________ 市 __________ 区 ___________ 路/街 __________ 号 ________花园/大厦</div>";
      html +=
        "<div>_____________ 座/栋 __________ 单元 ___________ 层 __________ 单位</div>";
      html +=
        "<div>_____________ 房屋所有权证号为 __________ ；国土使用证号为 ___________ 。（以房产证相关有效法律文件为准）</div>";
      html +=
        "<div>2.2代购房屋面积约为 _____________㎡  最终建筑面积以产权登记面积为准；</div>";
      html +=
        "<div>2.3代购房屋的单价为人民币 ______________元/平方米， 总价款为人民币 _______________________________元，（￥_____________）。</div>";
      html +=
        "<div>2.4乙方所代购的房屋所有权归甲方所有，甲方享有该房屋占有、使用、收益及处分的权利，乙方对受甲方委托购买的房屋无权行使甲方享有的前述权利，亦不得对受甲方委托购买的房屋进行侵占、破坏、转卖、出租、抵押及赠与等。</div>";
      html += "<div>二、房屋价款的支付方式：</div>";
      html +=
        "<div>1、甲、乙双方确认：本协议签订之日，乙方以自己的名义向银行申请按揭贷款，签订《借款合同》。按揭贷款人民币元，用于一次性支付代购房屋的购房款；</div>";
      html +=
        "<div>2、按揭的本金及利息由甲方按照上述《借款合同》的约定，负责偿还。甲方承担的房价款受国家政策或银行利率调整等因素影响，导致甲方需增加或减少支付按揭贷款的本金及利息，与乙方无关。</div>";
      html += "<div>三、甲方的权利义务：</div>";
      html +=
        "<div>1、甲方有权在按揭付清之日后随时要求乙方将该代购房屋的房屋产权证等一切相关证明变更到甲方名下，从而享有实际购房者的全部权利；</div>";
      html +=
        "<div>2、甲方应按照《借款合同》的约定按期向银行支付按揭贷款本金及利息。</div>";
      html +=
        "<div>3、上述房屋产权证暂办至乙方名下，产权证由甲方保管，甲方有权在任何时间将产权变更至本人名下或甲方指定的其他人名下，或转让、出租及抵押该房屋，乙方应当协助甲方办理相关手续。</div>";
      html +=
        "<div>4、甲方如需在上述房屋取得产权证之前转让该房屋，乙方应当协助甲方办理更名手续。</div>";
      html +=
        "<div>5、开发商交付房屋时，由甲方收房；甲方对该房屋进行的装修及在该房屋内添置的所有家具、家电及物品等均归甲方所有。</div>";
      html +=
        "<div>6、甲方有权随时解除本协议，解除本协议后十日内，乙方有义务协助将受甲方委托购买的房屋更名到甲方名下或甲方指定的其他人名下。</div>";
      html += "<div>四、乙方的权利义务：</div>";
      html +=
        "<div>1、乙方应保证按照本协议第一条确认的内容与________________________签订《房屋买卖合同》；</div>";
      html +=
        "<div>2、乙方应在本协议签订之日，及时向银行申请与购房款数额相等的按揭贷款，用于一次性支付购房款；</div>";
      html +=
        "<div>3、乙方应保证在甲方完成变更代购房屋产权证等相关证明之前，在该房屋上没有任何包括但不限于抵押权等他项权利存在；</div>";
      html +=
        "<div>4、乙方在甲方行使权利，要求变更登记代购房屋产权证时，应积极予以协助和配合。在完成变更登记后，该房屋的一切权利即归甲方所有，与乙方无关。</div>";
      html +=
        "<div>5、甲方保证乙方因代理甲方购买该房屋所产生的一切费用概由甲方承担，乙方不承担任何费用。</div>";
      html +=
        "<div>6、乙方有义务将本协议代理购房事宜通知乙方的所有利害关系人（包括但不限于父母、子女及配偶），保证其利害关系人不得主张上述房屋所有权利。 乙方保证，除非根据有关法律、法规的规定应向有关政府主管部门或各方上级主管部门办理有关批准、备案的手续；或为履行在本协议下的义务或声明与保证须向第三人披露，或经协议甲方事先书面同意，乙方负有保密义务（除已在公共渠道获得的信息外）。</div>";
      html += "<div>五、违约责任：</div>";
      html +=
        "<div>1、因甲方原因，导致本协议无法履行，乙方有权要求甲方向乙方支付违约金人民币 ______________ 元。</div>";
      html +=
        "<div>2、因甲方原因，未按照《借款合同》约定偿还银行按揭贷款本金及利息，乙方有权要求解除本协议。</div>";
      html +=
        "<div>3、因乙方原因，导致《房屋买卖合同》无法签订，甲方有权要求乙方向甲方支付违约金人民币 ______________ 元</div>";
      html +=
        "<div>4、在签订《房屋买卖合同》后，因乙方原因，导致本协议无法履行或可能无法履行时，甲方有权立即要求乙方将代购房屋的房屋产权证变更到甲方名下，乙方应予以配合。并由乙方承担由此造成的一切损失。</div>";
      html += "<div>六、本协议的的有效期：</div>";
      html += "<div>1、本协议自双方签字确认之日起生效；</div>";
      html += "<div>2、本协议在下列情况下失效：</div>";
      html += "<div>2.1代购房屋的房屋产权证等相关证明变更到甲方名下。</div>";
      html +=
        "<div>2.2乙方在本协议签订生效之日后      日内仍无法签订正式《房屋买卖合同》。</div>";
      html += "<div>七、其他</div>";
      html +=
        "<div>1、本协议未尽事宜，可由双方协商签订补充协议，该补充协议与本协议具有同等法律效力。</div>";
      html +=
        "<div>2、本协议产生争议的，双方应友好协商解决；协商不成的，由合同签订地法院管辖。</div>";
      html += "<div>3、本协议壹式四份，双方各执两份，具有同等法律效力。</div>";
      html += "<div>甲    方：_____________________________</div>";
      html += "<div>乙    方：_____________________________</div>";
      html += "<div>（签字或盖章）：</div>";
      html += "<div>（签字或盖章）：</div>";
      html += "<div>____________年____________月____________日</div>";
      html += "<div>____________年____________月____________日</div>";
      html +=
        "<div>合同签订地：___________________________________________________________________________</div>";
      html += "</div>";
      //设置当前页
      document.body.innerHTML = html;
      window.print();
      window.location.reload();
    }
  },
  components: {
    contractExamine,
    maintainList
  }
};
</script>


