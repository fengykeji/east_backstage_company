<style lang="less" scoped>
.map-tool {
}
</style>
<template>
    <div id="map" class='map map-tool'></div>
</template>
<script>
export default {
  props: ["longitude","latitude"],
  data() {
    return {
      area: "",
      isOpenAutoComplete: false,
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap(options) {
      if (!this.map) {
        this.map = new BMap.Map("map");
      }
      this.map.addControl(new BMap.NavigationControl());
      this.map.enableScrollWheelZoom(true);
      if (options) {
        var point = new BMap.Point(options.longitude, options.latitude);
        this.map.centerAndZoom(point, 15);
        this.map.clearOverlays();
        this.map.addOverlay(new BMap.Marker(point));
      } else {
        var point = new BMap.Point(116.404, 39.915);
        this.map.centerAndZoom(point, 15);
      }
      this.$emit("load", this.map);
    },
    focusAddress(address) {
        this.focusPoint(address, this.area);
    },
    focusArea(area) {
      this.area = area;
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(area, point => {
        if (point) {
          this.map.centerAndZoom(point, 16);
        }
      });
    },
    focusPoint(address, area) {
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(
        address,
        point => {
          if (point) {
            let lng = point.lng; //经度
            let lat = point.lat; //纬度
            this.$emit("update:longitude" , lng);
            this.$emit("update:latitude" , lat);
            this.map.centerAndZoom(point, 16);
            this.map.clearOverlays();
            this.map.addOverlay(new BMap.Marker(point));
          } else {
            this.map.clearOverlays();
          }
        },
        area
      );
    }
  }
};

// this.map.addEventListener("click", e => {
//   //移除旧坐标
//   this.map.clearOverlays();
//   //获得新坐标
//   let lng = e.point.lng; //经度
//   let lat = e.point.lat; //纬度
//   this.form.longitude = lng;
//   this.form.latitude = lat;
//   var myGeo = new BMap.Geocoder();
//   myGeo.getLocation(new BMap.Point(lng, lat), result => {
//     if (result) {
//       this.form.absolute_address = result.address;
//       this.map.addOverlay(new BMap.Marker(new BMap.Point(lng, lat)));
//     }
//   });
// });
</script>


