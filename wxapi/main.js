// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
const API_BASE_URL = 'http://localhost:9001'


const request = (url, needSubDomain, method, data) => {
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

const http = (url, needSubDomain, method, data) => {
  let _url = API_BASE_URL  + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  queryMobileLocation: (data) => {
    return request('/common/mobile-segment/location', false, 'get', data)
  },
  queryConfigBatch: (keys) => {
    return request('/config/values', true, 'get', { keys })
  },
  
  login: (code) => {
    return request('/user/wxapp/login', true, 'post', {
      code,
      type: 2
    })
  },

  uploadFile: (token, tempFilePath) => {
    const uploadUrl = API_BASE_URL + '/' + CONFIG.subDomain + '/dfs/upload/file'
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: uploadUrl,
        filePath: tempFilePath,
        name: 'upfile',
        formData: {
          'token': token
        },
        success(res) {
          resolve(JSON.parse(res.data))
        },
        fail(error) {
          reject(error)
        },
        complete(aaa) {
          // 加载完成
        }
      })
    })
  },
  refundApply: (token, orderId, type, logisticsStatus, reason, amount, remark, pic) => {
    return request('/order/refundApply/apply', true, 'post', {
      token,
      orderId,
      type,
      logisticsStatus,
      reason,
      amount,
      remark,
      pic
    })
  },
  saveCompanyInfo: (data) => {
    return http('/company/save', false, 'post', data)
  },
  editCompanyInfo:(data)=>{
    return http('/company/update', false, 'post', data)
  },
  saveUserInfo: (data) => {
    return http('/job/register', false, 'post', data)
  },
  editJobInfo: (data) => {
    return http('/job/info/update', false, 'post', data)
  },
  decodePhoneNumber:(data)=>{
    return http('/wei/decode/phone',false,'post',data)
  },
  saveJobInfo:(data)=>{
    return http('/job/info/save', false, 'post', data)
  },
  showAllJobs:(companyId)=>{
    return request('/job/info/list', false, 'get',{companyId})
  },
  getCompanyDetail:(code)=>{
    return request('/company/get/detail',false,'get',{
      code
    })
  },

  getCompanyDetailById:(id)=>{
    return request('/company/detail/by/id',false,'get',{
      id
    })
  },

  weiFirstLoad:(code)=>{
    return http('/wei/company',false,'get',{
      code
    })
  },

  raleaseJobDetail:(jobId)=>{
    return request('/company/post/detail',false,'get',{
      jobId
    })
  },
  saveApplicantInfo: (data) => {
    return http('/applicant/save', false, 'post', data)
  },

  getOneByOpenId: (openId) => {
    return http('/applicant/detail/open', false, 'get', {
      openId
    })
  },


  getOneById: (id) => {
    return http('/applicant/get/detail/id', false, 'get', {
      id
    })
  },


  getWorkExperienceById: (id) => {
    return http('/work/get/one', false, 'get', {
      id
    })
  },

  getEducationExperienceById: (id) => {
    return http('/education/get/one', false, 'get', {
      id
    })
  },


  editApplicantById: (data) => {
    return http('/applicant/update', false, 'post', data)
  },

  saveWorkExperience: (data) => {
    return http('/work/add', false, 'post', data)
  },

  saveEducationExperience: (data) => {
    return http('/education/add', false, 'post', data)
  },

  editWorkExperience: (data) => {
    return http('/work/update', false, 'post', data)
  },

  editEducationExperience: (data) => {
    return http('/education/update', false, 'post', data)
  },

  moveWorkExperience: (id) => {
    return http('/work/move', false, 'get', {
      id
    })
  },

  moveEducationExperience: (id) => {
    return http('/education/move', false, 'get', {
        id
    })
  },
  listAllCompany:()=>{
    return request('/company/list',false,'get')
  },
  deliveryResume:(data)=>{
    return http('/applicant/delivery/resume',false,'post',data)
  },
  getResumeByCompany:(companyId)=>{
    return request('/applicant/show/resume',false,'get',{
      companyId
    })
  },
  interviewResult: (data) => {
    return http('/job/info/interview', false, 'post', data)
  },
  handleBathcInterview: (data) => {
    return http('/job/info/batch/handle', false, 'post', data)
  },
  getUnionId: (data)=>{
    return http('/job/union/id',false,'post',data)
  },

  saveManager: (data)=>{
    return http('/company/manager/add',false,'post',data)
  },
  getManagerById: (id)=>{
    return http('/company/detail/manager',false,'get',{id})
  },
  findCompanyByKeyWord:(keyword,choose)=>{
    return http('/company/search', false, 'get', {keyword,choose})
  },
  
  companyBasicByOpenid:(openid)=>{
    return http('/company/basic/openid', false, 'get', {openid})
  },

  findManagerStatus: (companyId,userId) => {
    return http('/company/find/manager/status', false, 'get', {companyId,userId})
},
  applicantResumeDetail: (applicantId) => {
    return http('/company/show/resume/detail', false, 'get', {applicantId})
},
showChatJobInfo:(deliveryId)=>{
  return http('/job/info/chat', false, 'get', {deliveryId})
},
listMessageByCompanyId:(companyId)=>{
  return http('/company/message/list', false, 'get', {companyId})
},
changeMessageStatus: (messageId) => {
  return http('/applicant/message/status', false, 'get', { messageId })
},
showJobDetail:(jobId)=>{
  return http('/company/show/job/detail', false, 'get', {jobId})
},
getJobInfoByDelivery:(deliveryId)=>{
  return http('/company/delivery/single', false, 'get', { deliveryId})
},
addChatRecord:(data)=>{
  return http('/company/chat/record', false, 'post', data)
},
saveChatRecordToMongo:(data)=>{
  return http('/wei/mongo/add', false, 'post', data)
},

showHistoryChatRecord:(data)=>{
  return http('/company/history/chat', false, 'post', data)
},
listChatRecord:(messageId)=>{
  return http('/company/message/record', false, 'get', {messageId})

},
findUnreadChatRecord:(data)=>{
  return http('/company/message/record', false, 'post', data)
},
listJobByCompany:(companyId)=>{
  return http('/company/jobs/release', false, 'get', { companyId })
},

listAllApplicant:()=>{
return http('/applicant/all', false, 'get')
},

searchApplicantBykeyword:(data)=>{
  return http('/company/key/word/employee', false, 'post', data)
},
findJobCategoryTree:(parentId)=>{
  return http('/company/tree/job/category', false, 'get', {parentId})
},
findCompanyCenterNumber:(companyId)=>{
  return http('/company/center/count', false, 'get', { companyId })
},

listManagersByCompany:(companyId)=>{
  return http('/company/managers/list', false, 'get', { companyId })
},
approvesManager:(data)=>{

  return http('/company/approves/manager', false, 'post', data)
},
addWeiUser:(data)=>{

  return http('/company/add/wei/user', false, 'post', data)
},
remindAdmin:(data)=>{
  return http('/company/remind/admin', false, 'post', data)
},
getSingleCompanyById:(id)=>{
  return http('/company/single', false, 'get', { id })
},
register:(data)=>{
  return http('/wei/register', false, 'post', data)
},
findSenderAndReceiver:(jobId,applicantId)=>{
  return http('/company/conversation/basic', false, 'get', {jobId,applicantId})

},
getCompanyNameForChat:(companyId)=>{
  return http('/company/name/to/chat', false, 'get', { companyId})

},

getApplicantBasic:(applicantId)=>{
  return http('/company/applicant/basic', false, 'get', {applicantId})
  
}




}