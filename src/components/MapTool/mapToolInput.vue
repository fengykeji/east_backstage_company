<style lang="less" scoped>
.mapToolInput {
  position: relative;

  &:hover .mapToolInput-list {
     display: inline-block;
  }
}
.mapToolInput-list {
  display: none ; 
  position: absolute;
  top: 100%;
  left: 0 ;
  list-style: none;
  border: 1px solid #ebeef5 ;
  padding: 0;
  margin: 0;
  background: #fff;
  z-index: 20;
  border-radius: 8px;


  li {
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;

    &:hover {
      background: #f5f7fa;
    }
  }
}
</style>
<template>
  <div class="mapToolInput"  >
      <ul class="mapToolInput-list" :class="visible?'show':''">
        <li @click.stop="selectOption(item)" v-for="item in addOptions">{{item.label}}</li>
      </ul>
      <el-input :disabled="disabled"  :value="value" @input="input" @change="change" placeholder="请输入详细地址" />
  </div>
</template>
<script>
export default {
  props: ["value", "area" , "disabled"],
  data() {
    return {
      local: null,
      map: null,
      test: "",
      addOptions: [],
      loading: false,
      visible: false
    };
  },
  methods: {
    selectOption(item) {
      this.$emit("change" , item.label);
    },
    input(value) {
      this.autoComplete(this.area + value);
      this.$emit("input" , value) ; 
    },
    change(value) {
      this.$emit("change" , value);
    },
    autoComplete(v) {
      if (!this.local) {
        var options = {
          onSearchComplete: results => {
            // 判断状态是否正确
            if (this.local.getStatus() == BMAP_STATUS_SUCCESS) {
              var s = [];
              this.addOptions = [];
              for (var i = 0; i < results.getCurrentNumPois(); i++) {
                let poi = results.getPoi(i);
                let address = this.cutPrefix(poi.address);
                if (!address) continue;
                this.addOptions.push({ label: address, value: poi.uid });
              }
            } else {
              this.addOptions = [];
            }
          }
        };
        this.local = new BMap.LocalSearch(this.map, options);
      }
      this.local.search(v);
    },
    init(map) {
      this.map = map;
    },
    remoteMethod(value) {
      let address = this.area + value;
      this.autoComplete(address);
    },
    cutPrefix(address) {
      if (!address) return "";
      let pindex = address.indexOf("省");
      if (pindex > -1) {
        address = address.substring(pindex + 1);
      }
      let cindex = address.indexOf("市");
      if (cindex > -1) {
        address = address.substring(cindex + 1);
      }

      let dindex = address.indexOf("区");
      if (dindex > -1) {
        address = address.substring(dindex + 1);
      }

      return address;
    }
  }
};
</script>

