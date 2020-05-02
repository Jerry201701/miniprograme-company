const network = require("../../../utils/network.js")
const utils = require("../../../utils/util.js")
const WXAPI = require('../../../wxapi/main')
const app = getApp()
const companyId = app.globalData.companyId
const paramObj = { companyId: companyId, type: 2 }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansId: '',
    region: ['浙江省', '杭州市'],    //设置初始化地址
    workTypes: [
      { name: '全职', value: 1 },
      { name: '兼职', value: 2 },
      { name: '实习', value: 3 },
    ],
    ageRange:[],
    workRange:[],
    workYears:0,
    age:0,
    applicantName:'',
    telephone:'',
    email:'',
    model: {
      maxExperience: 0,
      expectPosition: '',
      workType: 1,     //默认全职      
      minExperience: 0,
      expectPlace: '',
      age:0
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initAgeRange()
    this.initWorkRange()

  },
 
  /**
   * input事件
   */
  nameInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          applicantName: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          applicantName: ''
        })
        break;
      default:
        break;
    }
  },

  emailInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          email: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          email: ''
        })
        break;
      default:
        break;
    }
  },


  telephoneInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          telephone: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          telephone: ''
        })
        break;
      default:
        break;
    }
  },



  operateInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          expectPosition: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          expectPosition: ''
        })
        break;
      default:
        break;
    }
  },


  
  
  /**
   * 初始化年龄数据
   */
  initAgeRange: function () {
    let ageTotal = 100;
    for (let i = 18; i <= ageTotal; i++) {
      this.data.ageRange.push(i)
    }
    this.setData({
      ageRange:this.data.ageRange
    })
    
  },

  initWorkRange: function () {
    let workTotal = 30;
    for (let i = 1; i <= workTotal; i++) {
      this.data.workRange.push(i)
    }
    this.setData({
      workRange: this.data.workRange
    })
    
  },




  /**
   * 确保右边大于左边
   */
  columnchange: function (e) {
    console.log(e.detail)
    let detail = e.detail, sv = this.data.workExperienceValue;
    if (detail.column === 0) {
      this.setData({
        ['workExperienceValue[0]']: detail.value
      })
      if (detail.value > sv[1]) {
        this.setData({
          workExperienceValue: [detail.value, detail.value]
        })
      }
    }
    if (detail.column === 1) {
      this.setData({
        ['workExperienceValue[1]']: detail.value
      })
      if (sv[0] > detail.value) {
        this.setData({
          workExperienceValue: [detail.value, detail.value]
        })
      }
    }
  },


  operateTextarea: function (e) {
    this.setData({
      introduce: e.detail.value.trim(),
      wordNumber: e.detail.value.trim().length
    })
  },


  bindAgeChange: function (e) {
    // console.log(e)
    // let selectedVal = e.detail.value    
    // let ageRange = this.data.ageRange
  
    this.setData({
      age: this.data.ageRange[e.detail.value]
     
    })

  },


  bindWorkChange: function (e) {
    
    this.setData({
      workYears: this.data.workRange[e.detail.value]
     
    })

  },







  /**
  * 保存
  */
  save: function () {

    var applicant = {
     applicantName:this.data.applicantName,
     openId:'',
     telephone:this.data.telephone,
     age:this.data.age,
     workYears:this.data.workYears,
     email:this.data.email,
     expectPosition:this.data.expectPosition,
     introduce:this.data.introduce
    }
   console.log(applicant)
    WXAPI.saveApplicantInfo(applicant).then(res => {
      if (res.code === 0) {
       wx.navigateTo({
         url: '../resume',
       })
      }
    })

    // let _this = this
    // if (this.data.workTypeIndex == 0) {  //防止没选择，使用默认的全职
    //   _this.data.model.workType = 1
    // }
  },

  uploadPortrait: function () {
    console.log('上传公司logo');
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'http://localhost:8009/company/upload/logo',
          filePath: tempFilePaths[0],
          name: 'logo',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            //   'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          // formData: {
          //   'user': 'test'  //其他额外的formdata，可不写
          // },
          success: function (res) {
            var data = res.data;
            console.log('data');
          },
          fail: function (res) {
            console.log('fail');
          },
        })
      }
    })

  }
 
})