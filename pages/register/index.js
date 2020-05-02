const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
var jobData = require('../../utils/city.js')
const COS = require('../../utils/cos-wx-sdk-v5')
const utils = require("../../utils/util.js")
//获取应用实例
var app = getApp()
Page({
  data: {
      loginPhone:'',
      openid:'',
      userId: 0
   
  },

  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: '注册食才企业招聘版'
    })
    // const openid = wx.getStorageSync('openid');
    // WXAPI.companyBasicByOpenid(openid).then(res => {
    //   if (res.code === 200) {
    //     this.setData({
    //       userId: res.data.userId
    //     })
    //   }
    // })
    
  },

 
  /**
   * input事件
   */
  phoneInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          loginPhone: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          loginPhone: ''
        })
        break;
      default:
        break;
    }
  },


  codeInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          ['companyInfo.fullName']: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          ['companyInfo.fullName']: ''
        })
        break;
      default:
        break;
    }
  },


  brandInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          ['companyInfo.brand']: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          ['companyInfo.brand']: ''
        })
        break;
      default:
        break;
    }
  },
 

  /**
  * 保存
  */
  register: function () {
    const _this = this
    const openid = wx.getStorageSync('openid')
    var user = {
      loginPhone: _this.data.loginPhone,
      openid:openid,
      loginType:1

    }

    WXAPI.register(user).then(res => {
      wx.reLaunch({
        url: '/pages/first/first',
      })
      // wx.navigateBack({
      //   delta: 2
      // })
    // wx.navigateTo({
    //   url: '/pages/first/fist',
    // })

      
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})