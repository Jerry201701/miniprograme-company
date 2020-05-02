const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    companyBasic: {},
    id: 0
  },
  onLoad: function(e) {
    this.loginDialog = this.selectComponent("#loginDialog");
    wx.setNavigationBarTitle({
      //title: wx.getStorageSync('mallName')
      title: '公司信息'
    })
    WXAPI.getCompanyDetailById(e.id).then(res => {
      this.setData({
        companyBasic: res.data,
        id: e.id
      })

      //console.log(this.data.companyBasic)
    })


  },
  onShow: function(e) {
    // console.log(e)

  },



  onShareAppMessage: function() {
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },



  locationAddress(e) {
    wx.openLocation({
      latitude: this.data.companyBasic.latitude,
      longitude: this.data.companyBasic.longitude,
      name: this.data.companyBasic.fullName,
      address: this.data.companyBasic.address
    })
  },

  joinCompany() {
    const userId = wx.getStorageSync('userId');
    if(!userId){
      this.loginDialog.showDialog();
    }
    if(userId){
    WXAPI.findManagerStatus(this.data.id, userId).then(res => {
      
      if (res.data===5) {
        wx.navigateTo({
          url: './manager-info?id=' + this.data.id,
        })
      }
      if (res.data === 1) {
        wx.navigateTo({
          url: './notify-status?id=' + this.data.id,
        })
      }
  
    })
    }
  },
  comeBack: function () {
    this.loginDialog.hideDialog();
    // this.setData({
    //   dark: false,
    //   condition: true,
    //   status: false
    // });

  }

})