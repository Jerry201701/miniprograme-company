const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    companyArray: [],
    list: true,
    conditions: false,
    logoUrl: 'https://picture2019-1256835711.cos.ap-beijing.myqcloud.com/recruit/1.jpg',
    choose: 0


  },


  onLoad: function(e) {
    this.loginDialog = this.selectComponent("#loginDialog");
    wx.setNavigationBarTitle({
      //title: wx.getStorageSync('mallName')
      title: '食才'
    })
    // WXAPI.listAllCompany().then(res => {
    //   if (res.code === 0) {
    //     console.log(res.data)
    //     this.setData({
    //       companyArray: res.data
    //     })
    //   }
    // })

  },
  onShow: function() {
    try {
      wx.removeStorageSync('userId')
      // wx.removeStorageSync('sessionKey')
      // wx.removeStorageSync('openid')
      // wx.removeStorageSync('companyId')
      // wx.removeStorageSync('managerId')
    } catch (e) {
      // Do something when catch error
    }
  },

  showCompanyBasic(e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: "./company-basic?id=" + e.currentTarget.dataset.id
      // url: "./company-basic?id=" + e.currentTarget.dataset.id
    })
  },




  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },


  onShareAppMessage: function() {
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },

  toSearch: function() {
    WXAPI.findCompanyByKeyWord(this.data.inputVal,this.data.choose).then(res => {
      if (res.data.length > 0) {
        this.setData({
          companyArray: res.data,
          list: false,
          conditions: false
        })
      }
      if (res.data.length == 0) {
        this.setData({
          conditions: true
        })

        //  wx.showToast({
        //    title: '已完成',
        //    icon: 'success',
        //    duration: 3000
        //  });
      }

    })
    // this.setData({
    //   curPage: 1
    // });
    // this.getGoodsList(this.data.activeCategoryId);
  },
  onReachBottom: function() {
    this.setData({
      curPage: this.data.curPage + 1
    });
    //  this.getGoodsList(this.data.activeCategoryId, true)
  },
  onPullDownRefresh: function() {
    this.setData({
      curPage: 1
    });

    wx.stopPullDownRefresh()
  },
  // 以下为搜索框事件
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  toCreate: function() {
     const userId = wx.getStorageSync('userId')
    
    if (userId) {
      wx.navigateTo({
        url: '/pages/create-company/create-company',
      })
    }else{
         this.loginDialog.showDialog();
    }
    
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      choose: e.detail.value
    })
  }




})