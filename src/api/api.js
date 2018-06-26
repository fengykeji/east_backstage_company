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
    return params ? http.get(`${base}/${url}`, { params: params }) : http.get(`${base}/${url}`);
  }
}

const fileUpload = (url, params) => { return http.post(`${base}/${url}`, params, { headers: { 'Content-Type': 'multipart/form-data' } }); }

//返回拦截器
http.interceptors.response.use(function (res) {
  return res.data;
});

// token拦截器
http.interceptors.request.use(function (req) {
  let token = localStorage.getItem('token');
  if (token != '') {
    req.headers["ACCESS-ROLE"] = 'company';
    req.headers["ACCESS-TOKEN"] = token;
  }
  return req;

});

let api = {
  // 登陆
  gitCode: doPost('company/user/login'),

  //禁用丶启用管理员
  updateAdminState: doGet('company/project/updateAdminState'),

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
  getUpdateProjectAdmin: doGet('company/project/updateProjectAdmin'),

  //修改管理员 - 提交
  updateProjectAdmin: doPost('company/project/updateProjectAdmin'),

  //添加项目管理员   
  addProjectAdmin: doPost('company/project/addProjectAdmin'),

  //查看项目
  getProjectInfo: doGet('company/project/getProjectInfo'),

  //获取物业类型
  getTags: doGet('company/project/getProperty_tags'),

  //修改项目-提交
  getUpdateProject: doPost('company/project/updateProject'),

  //项目-重新申请
  reCreateProject: doPost('company/project/reCreateProject'),

  //获取银行类型
  getBack: doGet('company/project/getBack'),

  //获取缴纳详情
  getBusinessInfo: doGet('company/project/getBusinessInfo'),

  //退款申请
  getRefund: doPost('company/project/refund'),

  //项目分销   第二板块

  //获取列表
  getList: doGet('company/distribution/getList'),

  //申请分销 - 项目详情
  applyProject: doGet('company/distribution/applyProject'),

  //到访确认人 列表
  getAgent: doGet('company/distribution/getAgent'),

  //到访确认人 详情
  getAgentInfo: doGet('company/distribution/getAgentInfo'),

  //结束到访确认人
  endAgent: doGet('company/distribution/endAgent'),

  //审核到访确认人
  exAgent: doPost('company/distribution/exAgent'),

  //添加到访确认人 - 获取经纪人列表
  agentList: doGet('company/distribution/addAgent'),

  //添加到访确认人 - 提交
  agentAdd: doPost('company/distribution/addAgent'),

  //申请分销 - 选择项目
  changeProjectList: doGet('company/distribution/changeProject'),

  //申请分销 - 提交
  changeProjectAdd: doPost('company/distribution/changeProject'),

  //经纪人管理   第二板块
  //审核经纪人
  exPeople: doPost('company/CompanyAgent/ex'),

  //离职经纪人
  quitPeople: doPost('company/CompanyAgent/quit'),

  //经纪人审核列表
  getExList: doGet('company/CompanyAgent/getExList'),

  //已离职经纪人列表
  getQuitList: doGet('company/CompanyAgent/getQuitList'),

  //在职经纪人列表
  getPayrollList: doGet('company/CompanyAgent/getPayrollList'),

  //待审核经纪人详情
  getExInfo: doGet('company/CompanyAgent/getExInfo'),

  //离职经纪人详情
  getQuitInfo: doGet('company/CompanyAgent/getQuitInfo'),

  //在职经纪人详情
  getPayrollInfo: doGet('company/CompanyAgent/getPayrollInfo'),

  //已拒绝经纪人详情
  getRefuseInfo: doGet('company/CompanyAgent/getRefuseInfo'),


  //第三板块   项目佣金管理
  //获取列表
  getProjectCommissionList: doGet('company/projectCommission/getList'),
  //公司已结列表
  getCompanyY: doGet('company/projectCommission/getCompanyY'),
  //公司累计详情
  getCompanyAllInfo: doGet('company/projectCommission/getCompanyAllInfo'),
  //公司累计列表
  getCompanyAll: doGet('company/projectCommission/getCompanyAll'),

  //第四板块   分销佣金管理
  //获取列表
  getDistributionList: doGet('company/DistributionCommission/getList'),

  //申请佣金 - 获取佣金条目
  getBrokerApply: doGet('company/DistributionCommission/brokerApply'),
  //申请佣金 - 提交
  brokerApply: doPost('company/DistributionCommission/brokerApply'),
  //查看佣金记录
  seeCommissionList: doGet('company/DistributionCommission/brokerList'),
  //修改佣金 - 获取信息
  updateBroker: doGet('company/DistributionCommission/updateBroker'),
  //查看佣金详情
  getBrokerInfo: doGet('company/DistributionCommission/getBrokerInfo'),
  //修改佣金 - 提交
  updateBrokerSumbit: doPost('company/DistributionCommission/updateBroker'),
  //付款申请 - 获取条目
  getPriceApply: doGet('company/DistributionCommission/priceApply'),
  //付款申请 - 提交
  priceApplySumbit: doPost('company/DistributionCommission/priceApply'),
  //删除佣金
  delBroker: doGet('company/DistributionCommission/delBroker'),
  //付款申请详情
  getApplyInfo: doGet('company/DistributionCommission/getApplyInfo'),
}

export default api; 
