const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    showDialog: false,
    dark:null,
    condition:null,
    status:null
  },
  onLoad: function (e) {
    this.loginDialog = this.selectComponent("#loginDialog");
    const that = this
    wx.setNavigationBarTitle({
      title: '食才'
    })

    wx.login({
      success(res) {
        if (res.code) {
          WXAPI.weiFirstLoad(res.code).then(res=>{
            if (res.data.openid) {
              const openid = res.data.openid;
              const sessionKey = res.data.sessionKey;
              wx.setStorageSync('openid', openid);
              wx.setStorageSync('sessionKey', sessionKey);
              WXAPI.companyBasicByOpenid(res.data.openid).then(res => {
                if (res.data === 1) {
                  that.setData({
                    dark: false,
                    condition: false,
                    status: true
                  });
                } 

                //管理员等待审核
                if(res.data.status===1||res.data.status===4){
                  console.log('等待审核')
                  wx.navigateTo({
                    url: '/pages/search/notify-status?id='+res.data.companyId+'&status='+res.data.status,
                  })

                }
                if(res.data.userId&&!res.data.companyId){
                       wx.setStorageSync('userId', res.data.userId);
                    that.setData({
                      dark: false,
                      condition: true,
                      status: false
                    });
                   // console.log('没有公司')


                }

                //已经成为管理员
                if(res.data.status===2){
                  if (res.data.companyId) {
                    wx.setStorageSync('userId', res.data.userId);
                    wx.setStorageSync('companyId', res.data.companyId);
                    wx.setStorageSync('managerId', res.data.managerId);
                    WXAPI.getSingleCompanyById(res.data.companyId).then(res => {

                      if (res.data.flag === 3) {
                        wx.switchTab({
                          url: '/pages/release/list/list',
                        })
                      }
                      if (res.data.flag === 2) {
                        wx.reLaunch({
                          url: '/pages/company-detail/company-detail?companyId=' + res.data.id,
                        })
                      }
                      if (res.data.flag === 1) {
                        wx.reLaunch({
                          url: '/pages/company-detail/company-detail?companyId=' + res.data.id,
                        })
                      }

                    })

                  }
                  
                  
                  //  else {
                  //   wx.setStorageSync('userId', res.data.userId);
                  //   that.setData({
                  //     dark: false,
                  //     condition: true,
                  //     status: false
                  //   });
                  // }


                }
                
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },


  onShow:function(){
    

  },


  // 以下为搜索框事件
  showInput: function () {
    console.log('2')
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    console.log('3')
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    console.log('4')
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
  //  console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    });
  },
  testLogin:function(){
    wx.navigateTo({
      url: '/pages/login/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  loadTo(){
    this.setData({
      istrue: true
    })
  },
  openConfirm: function () {
    wx.showModal({
      showCancel:true,
      title: '登录或者注册食才',
      content: '',
      confirmText: "注册账户",
      cancelText: "辅助操作",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  openDialog: function () {
    this.setData({
      istrue: true
    })
    
  },
  closeDialog: function () {
    this.setData({
      istrue: false,
      dark:false
    })
  },
  testDialog:function(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      showCancel:true,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  
  },
  weiLoad:function(e){
   
    this.setData({
      istrue: true,
      dark:true
    });
   this.loginDialog.showDialog();
  },


  getPhoneNumber: function (e) {
    console.log('1234')
    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'http://localhost/index/users/decodePhone',
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: that.data.session_key,
          uid: "",
        },
        method: "post",
        success: function (res) {
          console.log(res);
        }
      })
    }
  },
  authPhoneNumberSuccess:function(e){
    console.log(e)
    console.log('组件触发')
  },
  comeBack:function(){
    this.loginDialog.hideDialog();
    this.setData({
      dark:false,
      condition: true,
      status: false
    });
    
  },
  
  quitLoad:function(){
    this.setData({
      dark: false,
      condition: false,
      status: true
    });

  },
  createCompany:function(){
    const userId=wx.getStorageSync('userId')
    wx.getUserInfo({
      fail:function(res){
          console.log(res)
      },
      success: function (res) {
        wx.setStorage({
          key: 'nickName',
          data:res.userInfo.nickName
        })
        wx.navigateTo({
            url: '/pages/create-company/create-company',
          })
        // WXAPI.addWeiUser({
        //     id:userId,
        //     nickName:res.userInfo.nickName,
        //     avatarUrl: res.userInfo.avatarUrl
        // }).then(res=>{
        //   wx.navigateTo({
        //     url: '/pages/create-company/create-company',
        //   })
        // })
        // wx.setStorage({
        //   key: 'nickName',
        //   data: res.userInfo.nickName,
        // })
        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
        
      }
    })

  
  },


  searchPage:function(){
  wx.navigateTo({
      url: '/pages/search/search-company',
    })
  },
  
 

})