<style lang="less" scoped>
.mapSearchInput {
}
</style>
<template>
    <div class="mapSearchInput">
        <el-input :value="value" @input="input" placeholder="请输入详细地址" />
    </div>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      area: null,
      local: null,
      map: null
    };
  },
  methods: {
    setArea(area) {
      this.area = area;
    },
    input(value) {
      this.$emit("input", value);
      if (this.map) {
        this.initAutoComplete(value);
      }
    },
    initAutoComplete(v) {
      if (!this.local) {
        var options = {
          onSearchComplete: results => {
            // 判断状态是否正确
            if (this.local.getStatus() == BMAP_STATUS_SUCCESS) {
              var s = [];
              for (var i = 0; i < results.getCurrentNumPois(); i++) {
                console.log(results.getPoi(i));
              }
            } else {
              console.log("未找到数据");
            }
          }
        };
        this.local = new BMap.LocalSearch(this.map, options);
      }
      console.log(this.area+v);
      this.local.search(this.area + v);
    },
    setMap(map) {
      this.map = map;
    }
  }
};
</script>

