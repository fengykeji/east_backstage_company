// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import api from './api/api';
import store from '../store/store.js';

Vue.use(ElementUI);

import CitySelector from '@/components/CitySelector';
import MapTool from '@/components/MapTool';
import MapToolInput from '@/components/MapTool/mapToolInput';
import '../theme/index.css'

Vue.config.productionTip = false

Vue.prototype.api = api;

//注册组件
Vue.component("map-tool" , MapTool);
Vue.component("map-tool-input" , MapToolInput);
Vue.component("city-selector" , CitySelector);

// Vue.prototype.ajax=function(method,url,onload,param){
//   let xhr=new XMLHttpRequest();
//   let baseUrl='http://doctorman-dev.doctorwork.com/';
//   xhr.open(method,baseUrl+url);
//   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//   xhr.onload=function(res){
//       let resultObject=JSON.parse(res.currentTarget.responseText);
//       onload(resultObject);
//   }
//   xhr.send(param);

// }

/* eslint-disable no-new */
new Vue({
  store : store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
