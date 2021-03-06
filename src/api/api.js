import http from 'axios'
import qs from 'qs'
import Vue from 'vue'
//请求带上cookie
// http.defaults.withCredentials = true;

let base = 'http://120.78.69.178:2902/';
Vue.prototype.base = 'http://120.78.69.178:2902/';    //正式服地址

// let base = 'http://120.27.21.136:2798/';
// Vue.prototype.base = 'http://120.27.21.136:2798/';  //测试服地址

// let base = 'http://47.106.39.169:2797/';
// Vue.prototype.base = 'http://47.106.39.169:2797/';  //演示服地址

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

//返回拦截器s
http.interceptors.response.use(function (res) {
  if (res.data.code == 200) {
  }
  else if (res.data.code == 201) {
    Vue.prototype.$message({ type: 'error', message: '由于您长时间没有操作, 登录已过期, 请重新登录' });
    location.href = base + "admin/company/#/";

  } else {
    if (res.data.msg) {
      Vue.prototype.$message({ type: 'error', message: res.data.msg });
    } else {
      Vue.prototype.$message({ type: 'error', message: "服务器异常，请联系管理员" });
    }
  }
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
  //获取门店列表
  getStoreList: doGet('company/Store/getList'),
  //新增门店
  addStore: doPost('company/Store/addStore'),
  //新增门店帐号
  addStoreAdmin: doPost('company/Store/addStoreAdmin'),
  //修改门店帐号
  updateStoreAdmin: doPost('company/Store/updateStoreAdmin'),
  //获取门店详情
  storeInfo: doGet('company/Store/storeInfo'),
  //修改门店信息
  updateStore: doPost('company/Store/updateStore'),


  //获取可申请二手房列表
  getApplyHouse: doGet('company/house/getApplyHouse'),
  //申请二手房
  applyHouse: doPost('company/house/applyHouse'),
  //新增二手房
  addHouse: doPost('company/house/addHouse'),
  //二手房列表
  getTwoHouseList: doGet('company/house/getList'),
  //申请授权
  applyAuth: doGet('company/Store/applyAuth'),
  // 新增管理员
  addAdminAccout: doPost('company/house/addProjectAdmin'),
  // 禁用/启用管理员
  adminState: doPost('company/house/updateAdminState'),
  //修改管理员 - 获取信息
  getUpdateInfo: doGet('company/house/updateProjectAdmin'),
  //修改管理员 - 提交
  updateAdminAccout: doPost('company/house/updateProjectAdmin'),
  //获取管理员列表
  getAdminList: doGet('company/house/getAdminList'),

  //门店 - 房源管理二手房列表
  storeHousegetList: doGet('company/Room/getList'),

  //门店 - 房源管理查看详情
  getStoreHouseInfo: doGet('company/Room/getInfo'),





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
  //查看到访确认人详情
  getRole: doGet('company/distribution/getRule'),
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
  changeProjectAdd: doPost('company/distribution/applyProject'),
  //佣金规则 - 编辑合同信息
  addRule: doPost('company/distribution/addRule'),
  //佣金规则 - 协议上传
  uploadBrokerCommission: (params) => { return fileUpload(`company/distribution/uploadBrokerAgreement`, params) },
  //佣金规则 - 添加协议
  addBrokerAgreement: doPost('company/distribution/addBrokerAgreement'),
  //佣金规则 - 获取协议
  getBrokerAgreement: doGet('company/distribution/getBrokerAgreement'),
  //佣金规则 - 新增结佣方式
  addBrokeRule: doPost('company/distribution/createCompanyBrokerRule'),
  //佣金规则 - 修改结佣方式
  updateBrokeRule: doPost('company/distribution/updateBrokeRule'),
  //佣金规则 - 删除佣金规则
  delBrokeRule: doGet('company/distribution/deleteBrokerRule'),
  //佣金规则 - 获取提成方式
  getCommissionWay: doGet('company/distribution/getCommissionWay'),
  //佣金规则 - 获取币种
  getMoneyType: doGet('company/distribution/getMoneyType'),
  //佣金规则 - 获取佣金规则详情
  getCommissionRuleInfo: doGet('company/distribution/getRuleInfo'),
  //佣金规则 - 获取跳点规则
  getJumpRuleList: doGet('company/distribution/jumpRuleList'),
  //佣金规则 - 新增跳点规则
  addJumpRule: doPost('company/distribution/setJumpRule'),
  //佣金规则 - 修改跳点规则
  updateJumpRule: doPost('company/distribution/updateJumpRule'),
  //佣金规则 - 删除跳点规则
  deleteJumpRule: doGet('company/distribution/deleteJumpRule'),
  //佣金规则 - 查看合同信息
  getCompanyRuleInfo: doGet('/company/distribution/getCompanyRuleInfo'),
  //佣金规则 - 修改结佣规则 - 获取
  getUpdateBrokeRule: doGet('company/distribution/updateBrokeRule'),

  //经纪人管理   第三板块
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
  //公司已结详情
  getCompanyYInfo: doGet('company/projectCommission/getCompanyYInfo'),
  //公司未结详情
  getCompanyNInfo: doGet('company/projectCommission/getCompanyNInfo'),
  //公司未结列表
  getCompanyNList: doGet('company/projectCommission/getCompanyN'),
  //个人累计列表
  getPersonInfoList: doGet('company/projectCommission/getPersonAllInfo'),
  //个人未结列表
  getPersonNInfo: doGet('company/projectCommission/getPersonNInfo'),



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
  //付款重新申请 - 提交
  rePriceApplySumbit: doPost('company/DistributionCommission/rePriceApply'),

  //删除佣金
  delBroker: doGet('company/DistributionCommission/delBroker'),
  //付款申请详情
  getApplyInfo: doGet('company/DistributionCommission/getApplyInfo'),
  //佣金重新申请 - 获取
  getRePriceApply: doGet('company/DistributionCommission/rePriceApply'),

  //第五模块  全民项目管理
  //获取列表
  getPeopleList: doGet('company/PeopleProject/getList'),
  //查看项目详情
  getPeopleRole: doGet('company/PeopleProject/getRule'),
  //获取规则信息
  getRuleContract: doGet('company/PeopleProject/getRuleInfo'),
  //获取附件信息
  // getBrokerAgreement: doGet('company/PeopleProject/getBrokerAgreement'),    //暂未用
  //全民规则详情
  getPeopleRuleInfo: doGet('company/PeopleProject/brokerInfo'),

  //  门店进来  经纪人审核
  // 经纪人审核 - 审核经纪人列表
  getAgentStoreList: doGet('company/StoreAgent/getExList'),
  // 经纪人审核 - 维护列表
  getAgentStorePassList: doGet('company/StoreAgent/getList'),
  //经纪人审核 - 审核经纪人详情
  getAgentStoreInfo: doGet('company/StoreAgent/ex'),
  //经纪人审核 - 审核
  exAgentStore: doPost('company/StoreAgent/ex'),
  //经纪人审核 - 离职
  quitAgentStore: doPost('company/StoreAgent/quit'),
  //离职列表
  getAgentStoreQuitList: doGet('company/StoreAgent/getQuitList'),



  //客户管理（公司）
  //推荐客户列表
  getRecommendList: doGet('company/NewUser/getRecommendList'),
  //到访客户列表
  getVisitList: doGet('company/NewUser/getVisitList'),
  //成交客户列表
  getDealList: doGet('company/NewUser/getDealList'),
  //客户管理 excel导出
  exportExcel: base + "user/project/exportExcel",


  //代购合同管理
  // 待审核列表
  getContractExList: doGet('company/Contract/getExList'),
  // 维护列表
  getContractList: doGet('company/Contract/getList'),
  // 审核详情
  getContractExInfo: doGet('company/Contract/ex'),
  //审核提交
  contractExSubmit: doPost('company/Contract/ex'),
  //合同查看
  getContractInfo: doGet('company/Contract/getInfo'),
  //挞定
  break: doPost('company/Contract/break'),
  //获取挞定类型
  getBreakType: doGet('company/Contract/break'),
  //打印
  print: doGet('company/Contract/print'),


}






export default api; 
