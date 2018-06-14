import http from 'axios'
import qs from 'qs'
//请求带上cookie
// http.defaults.withCredentials = true;
let base = 'http://120.27.21.136:2798';

const doPost = function (url) {
  return function (params) {
    return params ? http.post(`${base}/${url}`, qs.stringify(params)) : http.post(`${base}/${url}`);
  }
}
const doGet = function (url) {
  return function (params) {
    return params ? http.get(`${base}/${url}`,  {params: params }) : http.get(`${base}/${url}`);
  }
}

const fileUpload = (url, params) => { return http.post(`${base}/${url}`, params, { headers: { 'Content-Type': 'multipart/form-data' } }); }

//返回拦截器
http.interceptors.response.use(function (res) {
  return res.data;
});

// token拦截器
http.interceptors.request.use(function (req) {
let token =localStorage.getItem('token');
if( token !='' ) {
	req.headers["ACCESS-ROLE"]= 'company';
	req.headers["ACCESS-TOKEN"] = token;
}
return req;

});

let api = {
  // 登陆
  gitCode: doPost('company/user/login'),

  //获取省份
  getProvinceList: doGet('getProvinceList'),

  //获取城市列表
  getCityList: doGet('getCityList'),

  //获取区域列表
  getDistrictList: doGet('getDistrictList'),

  //新增项目
  getCreateProject: doPost('company/project/createProject'),

  //获取项目列表
  getProjectList: doGet('company/project/getProjectList'),

  //上传附件
  uploadProjectAgreement: (params) => { return fileUpload(`company/project/uploadProjectAgreement`, params) },
  
  //修改管理员 - 获取信息
  getUpdateProjectAdmin:doGet('company/project/updateProjectAdmin'),

  //修改管理员 - 提交
  updateProjectAdmin:doPost('company/project/updateProjectAdmin'),

  //添加项目管理员   
  addProjectAdmin: doPost('company/project/addProjectAdmin'),
                                
  //查看项目
  getProjectInfo: doGet('company/project/getProjectInfo'),

  //获取物业类型
  getTags:doGet('company/project/getProperty_tags'),

  //修改项目-提交
  getUpdateProject:doPost('company/project/updateProject'),

  //项目-重新申请
  reCreateProject:doPost('company/project/reCreateProject'),

  //获取银行类型
  getBack:doGet('company/project/getBack'),

  //获取缴纳详情
  getBusinessInfo:doGet('company/project/getBusinessInfo'),

  //退款申请
  getRefund:doPost('company/project/refund'),

                             //项目分销   第二板块

  //获取列表
  getList:doGet('company/distribution/getList'),

  //到访确认人 列表
  getAgent:doGet('company/distribution/getAgent'),

  //到访确认人 详情
  getAgentInfo:doGet('company/distribution/getAgentInfo'),

  //结束到访确认人
  endAgent:doGet('company/distribution/endAgent'),

  //审核到访确认人
  exAgent:doPost('company/distribution/exAgent'),

  //添加到访确认人 - 获取经纪人列表
  addAgent:doGet('company/distribution/addAgent'),

  //添加到访确认人 - 提交
  addAgent:doPost('company/distribution/addAgent'),

  //申请分销 - 选择项目
  changeProject:doGet('company/distribution/changeProject'),

  //申请分销 - 提交
  changeProject:doPost('company/distribution/changeProject'),
}

export default api; 
