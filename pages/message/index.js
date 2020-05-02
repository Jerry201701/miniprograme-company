const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    options: [{
      city_id: '001',
      city_name: '北京'
    }, {
      city_id: '002',
      city_name: '上海'
    }, {
      city_id: '003',
      city_name: '深圳'
    }],
    selected: {},
    messageArray: [],
    tempUrl:'https://picture2019-1256835711.cos.ap-beijing.myqcloud.com/recruit/emp.jpg',
    picArray:[]

  },
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: '消息'
    })
   
   
  },
  onShow: function () {
    const that = this
    const companyId = wx.getStorageSync('companyId');
    WXAPI.listMessageByCompanyId(companyId).then(res => {
      res.data.forEach((item, i) => {
        WXAPI.getApplicantBasic(item.applicantId).then(r=>{
        item.headUrl=r.data.headUrl,
        item.applicantName=r.data.applicantName
        })
      })
      setTimeout(function () {
        console.log(res.data)
        that.setData({
        messageArray: res.data
      })
      }, 500)
    })
   
  },

  onShareAppMessage: function () {
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },

  change(e) {
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },
  clearHistory() {
    console.log('清空历史记录')

  },
  showUnread(){
    console.log('查看未读信息')

  },
  startChat: function(e){
  //  console.log(e)
    // WXAPI.changeMessageStatus(e.currentTarget.dataset.id).then(res => {

    //   if (res.code === 200) {
    
    //   }
    // })
    wx.navigateTo({
      url: '/pages/chat/index?jobId=' + e.currentTarget.dataset.jobid + '&applicantId=' + e.currentTarget.dataset.applicantid + '&messageId=' + e.currentTarget.dataset.id
    })



  }



})