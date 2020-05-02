const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    company:{}
  },
  onLoad: function (e) {
    console.log(e)
    wx.setNavigationBarTitle({
      //title: wx.getStorageSync('mallName')
      title: '通知状态'
    })
    WXAPI.getCompanyDetailById(e.id).then(res => {
      this.setData({
        company: res.data
      })
    })
    this.setData({
      status:e.status
    })
  },
  remind:function(){
    const that=this
    console.log(that.data.company.id)
    WXAPI.remindAdmin({
      companyId:that.data.company.id,
      messageContent:'提醒管理员审核',
      messageType:5,
      unread:true
    }).then(res=>{
      wx.showToast({
        title: '已经提醒管理员,请等待',
        icon: 'success',
        duration: 3000
      });
    })
   
    // wx.switchTab({
    //   url: '/pages/release/list/list',
    // })

  }
  

 





})