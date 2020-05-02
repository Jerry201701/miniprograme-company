const WXAPI = require('../../../wxapi/main')
const utils = require("../../../utils/util.js")
const app = getApp()
//const companyId = app.globalData.companyId
//const paramObj = { companyId: companyId, type: 2 }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansId: '',
    id: 0,
    wordNumber: 0,
    isWorking: 0,
    companyName:'',
    jobName:'',
    beginTime:'',
    endTime:'',
    responsibility:'',
    openId:''
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getOneWorkExperience(options.id)

    // this.setData({
    //   fansId: options.fansId,
    //   id: options.itemId,
    // })
    // if (options.itemId != 0) {
    //   this.getResumeInfoByRoute()
    // }
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

  },
 
  /**
  * 切换是否在职状态
  */
  toggleWorking: function () {
    if (this.data.isWorking) {
      this.setData({
        isWorking: 0,
        workEndDateStr: ""
      })
    } else {
      this.setData({
        isWorking: 1,
        workEndDateStr: "至今"
      })
    }
  },
  /**
   * 操作输入框
   */
  operateInput: function (e) {
    let event = e.currentTarget.dataset.event
    let ty = e.currentTarget.dataset.type
    let keys = ["companyName", "jobName"]
    switch (event) {
      case 'input':
        this.setData({
          [keys[ty - 1]]: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          [keys[ty - 1]]: ''
        })
        break;
      default:
        break;
    }
  },
  /**
   * 选择开始时间
   */
  bindStartDateChange: function (e) {
    this.setData({
      beginTime: e.detail.value
    })
   
  },
  /**
  * 选择结束时间
  */
  bindEndDateChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  /**
  * 文本域input事件
  */
  operateTextarea: function (e) {
    this.setData({
      responsibility: e.detail.value,
      wordNumber: e.detail.value.length
    })
  },
  /**
  * 检查工作经历合法性
  */
  checkExperienceForm: function () {
    let _data = this.data;
    if (!_data.workCompany || _data.workCompany == "") {
      utils.toggleToast(this, "请输入公司名称")
      return false;
    }
    if (!_data.position || _data.position == "") {
      utils.toggleToast(this, "请输入职位名称")
      return false;
    }
    if (!_data.workStartDateStr) {
      utils.toggleToast(this, "请选择开始时间")
      return false;
    }
    if (_data.isWorking == 0 && !_data.workEndDateStr) {
      utils.toggleToast(this, "请选择结束时间")
      return false;
    }
    return true;
  },
  /**
  * 完成保存
  */
  save: function () {
    let _this = this
    var workExperience={}
    if(_this.data.id===0){
     workExperience={
      companyName: _this.data.companyName,
      jobName: _this.data.jobName,
      beginTime: new Date(_this.data.beginTime),
      endTime:new Date(_this.data.endTime),
      responsibility: _this.data.responsibility,
      openId: wx.getStorageSync('openId')
    }
    }else{
      workExperience = {
        id:_this.data.id,
        companyName: _this.data.companyName,
        jobName: _this.data.jobName,
        beginTime: new Date(_this.data.beginTime),
        endTime: new Date(_this.data.endTime),
        responsibility: _this.data.responsibility,
        openId: wx.getStorageSync('openId')
      }
    }
    
    WXAPI.saveWorkExperience(workExperience).then(res => {

      if (res.code === 0) {
        var code = res.data
     
        wx.navigateBack()

        // wx.navigateTo({
        //   url: '/pages/company-detail/company-detail?code=' + code,
        // })
      }
    })
    






    // if (this.checkExperienceForm()) {
    //   console.log(this.data)
    //   let param = {
    //     quickSpFansId: _this.data.fansId,
    //     route: 'jobexp',
    //     model: {
    //       id: _this.data.id,
    //       startDateStr: _this.data.workStartDateStr,
    //       endDateStr: _this.data.workEndDateStr,
    //       isWorking: _this.data.isWorking,
    //       position: _this.data.position,
    //       workCompany: _this.data.workCompany,
    //       workDepartment: _this.data.workDepartment,
    //       descript: _this.data.descript
    //     }
    //   }
    //   network.post("/api.do", {
    //     method: "weiPinSp/updateResumeInfo",
    //     param: JSON.stringify(param)
    //   }, function (res) {
    //     if (res.code == "0") {
    //       wx.navigateBack({
    //         delta: 1
    //       })
    //     } else {
    //       utils.toggleToast(_this, res.message)
    //     }
    //   })
    // }
  },
  /**
   * 删除
   */
  del: function () {
    let _this = this;
    WXAPI.moveWorkExperience(_this.data.id).then(res => {
      if(res.code===0){
        wx.navigateBack()

      }
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
  getOneWorkExperience:function(id){
    if(id){
     
    WXAPI.getWorkExperienceById(id).then(res => {
      if (res.code === 0) {
       
        var begin = new Date(res.data.beginTime)
        var end = new Date(res.data.endTime)
        this.setData({
          id: res.data.id,
          companyName: res.data.companyName,
          jobName: res.data.jobName,
          beginTime: begin.getFullYear() + '-' + begin.getMonth(),
          endTime: end.getFullYear() + '-' + (end.getMonth() + 1),
          responsibility: res.data.responsibility,
          openId: res.data.openId

        })
      }
    })

    }


  }

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})