<style lang="less" scoped>
</style>
<template>
    <div>
        <el-select :value="province_id" placeholder="请选择省份" class='select-1' @change="changeProvince" :disabled="disabled">
            <el-option v-for="item in provinceOptions" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
        <el-select :value="city_id" placeholder="请选择城市" class='select-1' @change="changeCity" :disabled="disabled">
            <el-option v-for="item in cityOptions" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
        <el-select :value="district_id" placeholder="请选择区/县" class='select-1' @change="changedistrict" :disabled="disabled">
            <el-option v-for="item in districtOptions" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
    </div>
</template>
<script>
export default {
  props: ["province", "city", "district" , "disabled"],
  computed: {
    province_id() {
      this.getCityList();
      return this.province;
    },
    city_id() {
      this.getdistrictList();
      return this.city;
    },
    district_id() {
      return this.district;
    }
  },
  data() {
    return {
      provinceOptions: [],
      cityOptions: [],
      districtOptions: []
    };
  },
  mounted() {
    console.log(this);
    this.getProvinceList();
  },
  methods: {
    async getProvinceList() {
      let res = await this.api.getProvinceList();
      if (res.code == 200) {
        this.provinceOptions = res.data;
      }
    },
    async getCityList() {
      let res = await this.api.getCityList({ provinceCode: this.province });
      if (res.code == 200) {
        this.cityOptions = res.data;
      }
    },
    async getdistrictList() {
      let res = await this.api.getDistrictList({ cityCode: this.city });
      if (res.code == 200) {
        this.districtOptions = res.data;
      }
    },
    changeProvince(value) {
      this.$emit("update:province", value);
      this.$emit("update:city", "");
      this.$emit("update:district", "");
    },
    changeCity(value) {
      this.$emit("update:city", value);
      this.$emit("update:district", "");
    },
    changedistrict(value) {
      this.$emit("update:district", value);
      let province = "";
      let city = "";
      let district = "";
      for (let option of this.provinceOptions) {
        if (option.code == this.province_id) {
          province = option.name;
        }
      }
      for (let option of this.cityOptions) {
        if (option.code == this.city_id) {
          city = option.name;
        }
      }
      for (let option of this.districtOptions) {
        if (option.code == value) {
          district = option.name;
        }
      }
      let address = province + city + district ;
      this.$emit("changeDistrict" , address);
    }
  }
};
</script>


