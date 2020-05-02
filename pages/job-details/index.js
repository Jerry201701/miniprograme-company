const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//const app = getApp()
var app = getApp()

Page({
  data: {
    showDialog: false
  },
  onShow() {
   // const _this = this
  },
 
 
  
  bindTypeTap: function (e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onLoad: function (e) {
    this.applicantLogin = this.selectComponent("#applicantLogin")
    WXAPI.raleaseJobDetail(e.id).then(res=>{
      if(res.code===0){
        console.log(res.data)

        var address = res.data.address
        var one = address.indexOf('省')
        var two = address.indexOf('市')
        var three = address.indexOf('区')
        var city = address.substring(one + 1, two)
        var district = address.substring(two + 1, three + 1)





        this.setData({
          id:res.data.id,
          city:city,
          district:district,
          address:res.data.address,
          certificates: res.data.certificates,
          jobDescription: res.data.jobDescription,
          jobName: res.data.jobName,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          salaryRange: res.data.salaryRange,
          workExperience: res.data.workExperience,
          educationLevel: res.data.educationLevel,
          companyName:res.data.companyName,
          description: res.data.description,
          brand:res.data.brand,
          minStaff:res.data.minStaff,
          maxStaff:res.data.maxStaff


        })

      }
    })
   
   

  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
 
  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('mallName'),
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid'),
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  goMap(e) { 
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
     // name: '吃了还要来中餐馆',
      address: this.data.address,
    })
  },
  callPhone(e) {
    const tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },

  openConfirm: function () {
   // var phone=wx.getStorageSync('phone')
    if (wx.getStorageSync('phone')){
      var data={
        phone: wx.getStorageSync('phone'),
        jobId: this.data.id,
        companyId:this.data.companyId
      }
      WXAPI.deliveryResume(data).then(res=>{
        if(res.code===0){
          console.log(res.data)
        wx.navigateBack()
        }
      })
    }else{
    wx.login({
      success(res) {
        if (res.code) {
          WXAPI.weiFirstLoad(res.code).then(res => {
            if (res.code === 0) {
              console.log(res)
              wx.setStorage({
                key: 'openId',
                data: res.data.openId,
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // wx.showModal({
    //   title: '弹窗标题',
    //   content: '需要登录才能投递简历',
    //   confirmText: "登录",
    //   cancelText: "取消",
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击登录')
          
    //     } else {
    //       console.log('用户点击取消')
    //     }
    //   }
    // });
    this.applicantLogin.showDialog();
    }
  }





  
})