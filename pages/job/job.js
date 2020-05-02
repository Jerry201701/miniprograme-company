const app = getApp();
Page({
  data: { 
    minSalary: ['1000', '2000', '3000', '4000'],
    maxSalary: ['5000', '6000', '7000', '8000'],
    index: 0,
    date: '2016-09-01',
    time: '12:01',
    multiArray: [['1000', '2000','3000','4000'], ['5000', '6000','7000','8000']],//二维数组，长度是多少是几列
    multiIndex: [0, 0],
  },
  onLoad: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    const that = this
    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene)
      if (scene) {
        wx.setStorageSync('referrer', scene.substring(11))
      }
    }
    wx.setNavigationBarTitle({
      //title: wx.getStorageSync('mallName')
      title: '食才'
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
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid')
    }
  },
  
  toSearch: function () {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
 
 
  // 以下为搜索框事件
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
    this.setData({
      inputVal: e.detail.value
    });
  },
 chooseCategory:function(){
   console.log('选择职位类型');
   wx.navigateTo({
     url: "/pages/job-category/job-category"
   })
 },
 chooseCity:function(){
   wx.navigateTo({
     url: "/pages/city/city"
   })

 },
 chooseSalary:function(){

 },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  chooseMinSalary: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  chooseMaxSalary: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    // if (e.detail.column == 0) {//第1列
    //   if (e.detail.value == 0) {//音频
    //     this.setData({
    //       multiArray: [['音频', '视频'], ['mp3', '评书']]
    //     })
    //   };
    //   if (e.detail.value == 1) {//视频
    //     this.setData({
    //       multiArray: [['音频', '视频'], ['电影', '电视剧']]
    //     })
    //   };
    // };

  },
  finishSelection: function () {
    app.globalData.list = [{
      "pagePath": "/pages/job-list/index",
      "iconPath": "/images/nav/home-off.png",
      "selectedIconPath": "/images/nav/home-on.png",
      "text": "岗位"
    },
    {
        "pagePath": "/pages/me/me",
        "iconPath": "/images/nav/my-off.png",
        "selectedIconPath": "/images/nav/my-on.png",
        "text": "我的"
      }
    ]
    wx.switchTab({
      url: '/pages/job-list/index',
    })
  }


})