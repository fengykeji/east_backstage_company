<style lang="less" scoped>
.map-tool {
    width: 500px;
    height: 500px;
}
</style>
<template>
    <div class="test">
        <city-selector :city.sync="city" :province.sync="province" :district.sync="district" @changeDistrict="areaChange" />
        <map-tool class="map-tool" ref="mapTool" @load="mapLoad" />
        <map-tool-input :area="area" ref="mapToolInput" @change="addressChange" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            city: "",
            province : "",
            district: "",
            area: "",
        }
    },
    mounted() {
        this.province = 120000;
        this.city = 120100;
        this.district = 120101;
    },
    methods: {
        mapLoad(map) {
            this.$refs["mapToolInput"].init(map);
        },
        areaChange(area) {
            this.area = area;
            this.$refs["mapTool"].focusArea(area);
        },
        addressChange(address) {
            let addStr = this.area + address
            if(address) {
                this.$refs["mapTool"].focusAddress(addStr);
            }else {
                this.$refs["mapTool"].focusArea(this.area);
            }
        }
    }
};
</script>


