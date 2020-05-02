// pages/company/manager.js
const WXAPI = require('../../wxapi/main')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    accountIndex: 0,
    accounts: ["男", "女"],
    manager:{
      name: '',
      phone: '',
      email: '',
      sex: 0
    }
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindAccountChange: function (e) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value);

      this.setData({
        ['manager.sex']: e.detail.value
      })
    },

    nameInput: function (e) {
      let event = e.currentTarget.dataset.event
      switch (event) {
        case 'input':
          this.setData({
            ['manager.name']: e.detail.value
          })
          break;
        case 'clear':
          this.setData({
            ['manager.name']: ''
          })
          break;
        default:
          break;
      }
    },

    phoneInput: function (e) {
      let event = e.currentTarget.dataset.event
      switch (event) {
        case 'input':
          this.setData({
            ['manager.phone']: e.detail.value
          })
          break;
        case 'clear':
          this.setData({
            ['manager.phone']: ''
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
            ['manager.email']: e.detail.value
          })
          break;
        case 'clear':
          this.setData({
            ['manager.email']: ''
          })
          break;
        default:
          break;
      }
    },


    submitManager:function(){
      WXAPI.saveManager(this.data.manager).then(res => {
        wx.setStorageSync('managerId', res.data); 
        // var pages = getCurrentPages();
        // var currPage = pages[pages.length - 1];   //当前页面
        // var prevPage = pages[pages.length - 2];  //上一个页面
        // if (res.code === 200) {
        //   prevPage.setData({
        //     ['manager.id']:res.data
        //   });
          wx.navigateBack({
            delta: 1
          })
          // wx.switchTab({
          //   url: "/pages/company/center?id=" + id,
          // })
       // }
      })



    }
  }
})
