const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    companyBasic: {},
    jobs:[],
    jobIndex:0,
    jobName:'',
    job:{},
    id: 0,
    keyword:'',
    minWorkExperience: 0,
    maxWorkExperience: 0,
    educationLevel: '',
    minSalary: 0,
    maxSalary: 0

  },
  onLoad: function (e) {
    const that=this;
    wx.setNavigationBarTitle({
      //title: wx.getStorageSync('mallName')
      title: '搜人'
    })
    
    const companyId=wx.getStorageSync('companyId');
    WXAPI.listJobByCompany(companyId).then(res=>{
     
      var jobs=[]
      res.data.forEach((item, i) => {
        const job={
          id: item.id,
          jobName: item.jobName,
          index:i
        }
        jobs.push(job)
      })
      that.setData({
        jobs:jobs,
        job:jobs[0],
      //  jobName:jobs[0].jobName
      })
    })
  },

  onShow: function () {
  console.log(this.data.keyword)
  console.log(this.data.jobName)
  WXAPI.searchApplicantBykeyword({
   keyword:this.data.keyword,
   jobName:this.data.jobName,
   minWorkExperience:this.data.minWorkExperience,
   maxWorkExperience:this.data.maxWorkExperience,
   educationLevel:this.data.educationLevel,
   minSalary:this.data.minSalary,
   maxSalary:this.data.maxSalary
  }).then(res=>{
     this.setData({
          applicants: res.data
        })
  })
    // if(this.data.keyword||this.data.jobName){
    //   console.log('111')
    //   WXAPI.searchApplicantBykeyword(this.data.keyword,this.data.jobName).then(res=>{
    //   console.log(res.data)
    //     this.setData({
    //       applicants: res.data
    //     })
    // })
    // }else{
    //   console.log('222')
    // WXAPI.listAllApplicant().then(res=>{
     
    //   this.setData({
    //     applicants:res.data
    //   })
    // })
    // }

  },
  
  onReady: function () {
    
  },



  onShareAppMessage: function () {
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },



  locationAddress(e) {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.fullName,
      address: this.data.address
    })
  },

  joinCompany() {
    wx.navigateTo({
      url: './manager-info?id=' + this.data.id,
    })

  },


  showEmployeeDetail(e){
    console.log('查看求职者详情')
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './detail/employee-detail?applicantId=' + id
    })
    // wx.navigateTo({
    //   url: 'employee-detail?id='+id,
    //   success: function (res) { },
    //   fail: function (res) {console.log('1112') },
    //   complete: function (res) { },
    // })

    // wx.navigateTo({
    //   url: 'employee-detail',
    // })
      // wx.navigateTo({
      //  url: '/pages/employee/employee-detail'
      // })
    

  },



  searchPosition(){
    wx.navigateTo({
      url: 'search-employee',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    
  },
  addPosition(){
    wx.navigateTo({
      url: '/pages/release/add/add',
    })
  },
  selectCategory(){
    wx.navigateTo({
      url: 'search-condition',
    })
  },
  selectRegion(){
    console.log('2')
  },
  recommend(){
    console.log('3')
  },
  upToDate(){
    console.log('4')
  },



  prePost(){
    var index = this.data.job.index
    const length = this.data.jobs.length
    if(index===0){
      index=length
    }
    console.log(index)
    const pre = (index-1)%length 
    const jobs=this.data.jobs

    this.setData({
      job:jobs[pre],
    //  jobName:jobs[pre].jobName
    })
    WXAPI.searchApplicantBykeyword('', jobs[pre].jobName).then(res => {
      this.setData({
        applicants: res.data
      })
    })
  },

  nextPost(){
    const next = (this.data.job.index + 1) % this.data.jobs.length
    const jobs = this.data.jobs
    this.setData({
      job: jobs[next],
    //  jobName:jobs[index].jobName
    })
    WXAPI.searchApplicantBykeyword('', jobs[next].jobName).then(res => {
      this.setData({
        applicants: res.data
      })
    })
  }


})