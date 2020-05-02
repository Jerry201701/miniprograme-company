const WXAPI = require('../../../wxapi/main')
const CONFIG = require('../../../config.js')
import WxValidate from '../../../utils/WxValidate'
const app = getApp()

Page({
  data: {
    select: false,
    tihuoWay: '全部',
    positions: true,
    array: ['美国', '中国', '巴西', '日本'],
    workExperienceArray: ['不限', '应届生', '1-3年', '3-5年', '5年以上'],
    educationArray: ['不限', '小学', '初中', '高中', '大学'],
    salaryArray: ['不限', '1k-3k', '3k-5k', '5k-10k', '10k以上'],
    workExperience: '工作经验',
    educationLevel: '学历要求',
    salaryRange: '薪资范围',
    jobName: '',
    jobDescription: '',
    address: '',
    latitude: '',
    longitude: '',
    certificateList: [],
    multiArray: [
      [1000, 2000, 3000, 4000],
      [5000, 6000, 7000, 8000]
    ],
    multiIndex: [0, 0],
    workArray: [
      [1, 2, 3, 4, 5],
      [5, 6, 7, 8, 9, 10]
    ],
    workiIndex: [0, 0],
    minSalary: 0,
    maxSalary: 0,
    minWorkYears: 0,
    maxWorkYears: 0,
    error: ''

  },
  onShow() {
   
  },

  bindTypeTap: function(e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onLoad: function(e) {
    this.initValidate()
    wx.setNavigationBarTitle({
      // title: wx.getStorageSync('mallName')
      title: "岗位发布"
    });
    this.setData({
      jobName: e.jobName,
      jobDescription: e.jobDescription
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
      title: wx.getStorageSync('mallName'),
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid'),
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },

  goMap(e) {
    wx.openLocation({
      latitude: 30.7177100074,
      longitude: 103.9871621132,
      name: '吃了还要来中餐馆',
      address: '金周路1号珠宝中心401',
    })
  },
  callPhone(e) {
    const tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },


  listStatus: function() {
    console.log('test')
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select,
      positions: false
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    console.log(name)
    this.setData({
      tihuoWay: name,
      select: false,
      positions: true
    })
  },
  addPosition: function() {
    wx.redirectTo({
      url: '../add/add',
    })
  },
  addName: function() {
    wx.navigateTo({
      url: './add-name/add-name',
    })
  },
  addDesc: function() {
    wx.navigateTo({
      url: './add-desc/add-desc',
    })
  },

  addAddress: function(e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          address: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          address: ''
        })
        break;
      default:
        break;
    }

  },
  getLocation: function() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.chooseLocation({
                success: function(res) {
                  that.setData({
                    address: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude
                  })
                },
                fail: function() {},
                complete: function() {}
              })
            }
          })
        }
        if (res.authSetting['scope.userLocation']) {
          wx.chooseLocation({
            success: function(res) {
              that.setData({
                address: res.address,
                latitude: res.latitude,
                longitude: res.longitude
              })
            },
            fail: function() {},
            complete: function() {}
          })
        }
      }
    })

    // wx.chooseLocation({
    //   success: function (res) {
    //     that.setData({
    //       address: res.address,
    //       latitude: res.latitude,
    //       longitude: res.longitude
    //     })
    //   },
    //   fail: function () {
    //   },
    //   complete: function () {
    //   }
    // })
  },


  addCertificate: function() {
    wx.navigateTo({
      url: "/pages/certificate/certificate",
    })
  },
  workPickerChange: function(e) {
    console.log(e)
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    var array = this.data.workExperienceArray;
    this.setData({
      workExperience: array[index]
    })
  },
  educationPickerChange: function(e) {
    var index = e.detail.value;
    var array = this.data.educationArray;
    this.setData({
      educationLevel: array[index]
    })
  },
  salaryPickerChange: function(e) {

    var index = e.detail.value;
    var array = this.data.salaryArray;
    this.setData({
      salaryRange: array[index]
    })
  },
  saveJobInfo: function() {
    // console.log(this.data.certificateList)
    // var certificates=''
    // this.data.certificateList.forEach(function (value, i, array) {
    //   console.log(value)
    //   certificates.concat(value.to)
    // })
    // console.log(certificates)
    // var certificates=this.data
    const companyId = wx.getStorageSync('companyId');
    var jobInfo = {
      jobName: this.data.jobName,
      educationLevel: this.data.educationLevel,
      jobDescription: this.data.jobDescription,
      salaryRange: this.data.salaryRange,
      address: this.data.address,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      workExperience: this.data.workExperience,
      certificates: this.data.certificateList.toString(),
      companyId: companyId,
      minSalary: this.data.minSalary,
      maxSalary: this.data.maxSalary,
      minWorkYears: this.data.minWorkYears,
      maxWorkYears: this.data.maxWorkYears

    }
    if (!this.WxValidate.checkForm(jobInfo)) {
      const error = this.WxValidate.errorList[0]
      this.setData({
        error:error.msg
      })
      return false
    }
    if (this.WxValidate.checkForm(jobInfo)){
      WXAPI.saveJobInfo(jobInfo).then(res => {
        if (res.code === 200) {
          wx.switchTab({
            url: '/pages/release/list/list'
          })
          // that.setData({
          //   goodsRecommend: res.data
          // })
        }
      })
    }

   
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  initValidate() {
    // 验证字段的规则
    const rules = {
      jobName: {
        required: true,
      },
      minWorkYears: {
        required: true,
        min:1,
      },
      maxWorkYears: {
        required: true,
        min:5,
      },

      minSalary: {
        required: true,
        min:1000,
      },

      maxSalary: {
        required: true,
        min:5000,
      },
      educationLevel: {
        required: true,
        maxlength: 3,
      },
      jobDescription: {
        required: true,
      },
      address: {
        required: true,
      },
      certificates: {
        required: true,
      }


    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      jobName: {
        required: '请填写岗位名称',
      },
      minWorkYears: {
        required: '请选择最小工作年限',
        min: '请选择最小工作年限',
      },
      maxWorkYears: {
        required: '请选择最大工作年限',
        min: '请选择最大工作年限',
      },

      minSalary: {
        required: '请选择最小工工资',
        min: '请选择最小工工资',
      },

      maxSalary: {
        required: '请选择最大工工资',
        min: '请选择最大工工资',
      },
      educationLevel: {
        required: '请选择学历',
        maxlength: '请选择学历',
      },
      jobDescription: {
        required: '请填写职位描述',
      },
      address: {
        required: '请填写工作地点',
      },
      certificates: {
        required: '请选择资格证书',
      }

    }

    this.WxValidate = new WxValidate(rules, messages)
    // this.WxValidate.addMethod('minWorkYears', (value, param) => {
    //   return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    // }, '请勾选1-2个敲码助手')

  },

  /**
   * 删除某个技能
   */
  delSkill: function(e) {
    let index = e.currentTarget.dataset.index
    this.data.certificateList.splice(index, 1)
    this.setData({
      certificateList: this.data.certificateList
    })
    console.log(this.data.certificateList)
  },


  bindMultiPickerChange: function(e) {
    const minSalary = this.data.multiArray[0][e.detail.value[0]]
    const maxSalary = this.data.multiArray[1][e.detail.value[1]]
    this.setData({
      minSalary: minSalary,
      maxSalary: maxSalary,
      salaryRange: minSalary + '-' + maxSalary

    })
  },
  bindMultiPickerColumnChange: function(e) {
    //  console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  },


  workMultiPickerChange: function(e) {
    const minYear = this.data.workArray[0][e.detail.value[0]]
    const maxYear = this.data.workArray[1][e.detail.value[1]]
    this.setData({
      minWorkYears: minYear,
      maxWorkYears: maxYear,
      workExperience: minYear + '-' + maxYear + '年'
    })
  },


  workMultiPickerColumnChange: function(e) {
    //  console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  },








})