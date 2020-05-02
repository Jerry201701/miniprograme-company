const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    workExperience: [{
      key:0,
      value:'不限',
      maxYear:0,
      minYear:0,
      choose:false
    },
    {
      key:1,
      value:'一至三年',
      minYear:1,
      maxYear:3,
      choose:false
    },
    {
      key:2,
      value:'三至五年',
      minYear:3,
      maxYear:5,
      choose:false
    },
    {
      key:3,
      value:'五到十年',
      minYear:5,
      maxYear:10,
      choose:false
    },
    {
      key:4,
      value:'十年以上',
      minYear:10,
      maxYear:100,
      choose:false
    }],
    educataion:[
      {
        key:0,
        value:'小学',
        choose:false
      },
      {
        key:1,
        value:'初中',
        choose:false
      },
      {
        key:2,
        value:'高中',
        choose: false
      },
      {
        key:3,
        value:'大学',
        choose: false
      },
      {
        key:4,
        value:'不限',
        choose: false
      }],
      salary:[
          {
            key:0,
            value:'不限',
            minSalary:1000,
            maxSalary:3000,
          choose: false

          },
          {
            key:1,
            value:'1k-3k',
            minSalary:1000,
            maxSalary:3000,
            choose: false
          },
          {
            key:2,
            value:'3k-5k',
            minSalary:3000,
            maxSalary:5000,
            choose: false
          },
          {
            key:3,
            value:'5K以上',
            minSalary:5000,
            maxSalary:10000,
            choose: false
          }
      ],
      minWorkExperience:0,
      maxWorkExperience:0,
      educationLevel:'',
      minSalary:0,
      maxSalary:0

    
  },
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      //title: wx.getStorageSync('mallName')
      title: '筛选'
    })
   
  },
  onShow: function (e) {
    // console.log(e)

  },



  onShareAppMessage: function () {
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },
  submitSearchCondition:function(){
    console.log('提交')
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      minWorkExperience: this.data.minWorkExperience,
      maxWorkExperience: this.data.maxWorkExperience,
      educationLevel: this.data.educationLevel,
      minSalary: this.data.minSalary,
      maxSalary: this.data.maxSalary
    })
    wx.navigateBack({
      delta: 1
    })
    
  },
  clearSearchRecord:function(){
console.log('清除')
    var workExperience=this.data.workExperience
    var educataion = this.data.educataion
    var salary=this.data.salary
    workExperience.forEach((item, i) => {
      item.choose =false
    })
    educataion.forEach((item, i) => {
      item.choose =false
    })
    salary.forEach((item, i) => {
      item.choose =false
    })
    this.setData({
      workExperience: workExperience,
      educataion: educataion,
      salary:salary,
      minWorkExperience: 0,
      maxWorkExperience: 0,
      educationLevel: '',
      minSalary: 0,
      maxSalary: 0
    })

  },

  chooseExperience: function (e) {
    const index = e.currentTarget.dataset.text.key
    const choose = e.currentTarget.dataset.text.choose
    var experience=this.data.workExperience
    experience.forEach((item, i) => {
        item.choose=false
    })
    if (choose === false) {
      experience[index].choose = true
    } else {
      experience[index].choose = false
    }
    this.setData({
      workExperience: experience,
      minWorkExperience:experience[index].minYear,
      maxWorkExperience:experience[index].maxYear
    })
  },


  chooseEducation:function(e){
    const index = e.currentTarget.dataset.text.key
    const choose = e.currentTarget.dataset.text.choose
    var experience = this.data.educataion
    experience.forEach((item, i) => {
      item.choose = false
    })
    if (choose === false) {
      experience[index].choose = true
    } else {
      experience[index].choose = false
    }
    this.setData({
      educataion: experience,
      educationLevel:experience[index].value
    })

  },

  chooseSalary:function(e){
    const index = e.currentTarget.dataset.text.key
    const choose = e.currentTarget.dataset.text.choose
    var salary = this.data.salary
    salary.forEach((item, i) => {
      item.choose = false
    })
    if (choose === false) {
      salary[index].choose = true
    } else {
      salary[index].choose = false
    }
    this.setData({
      salary: salary,
      minSalary:salary[index].minSalary,
      maxSalary:salary[index].maxSalary
    })


  }



})