const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
Page({
  data: {
    options: [{
      city_id: '001',
      city_name: '北京'
    }, {
      city_id: '002',
      city_name: '上海'
    }, {
      city_id: '003',
      city_name: '深圳'
    }],
    selected: {},
    inputShowed: false,
    inputVal: "",
    jobName:'按职位类型搜索'
  },
  change(e) {
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },
  clearHistory(){
    console.log('清空历史记录')

  },
  searchCancel(){
      console.log('取消')
  },
  searchConfirm(){
   // console.log(this.data.inputVal)
    var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            keyword: this.data.inputVal,
            jobName:this.data.jobName
          })
        wx.navigateBack({
          delta: 1
        })
  
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    //console.log(e.detail.value)
    // WXAPI.searchApplicantBykeyword(e.detail.value).then(res=>{
    //   console.log(res.data)
    // })
    this.setData({
      inputVal: e.detail.value
    });
    
  }

})