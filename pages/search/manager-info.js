// pages/search/manager-info.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
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
    id:110,
    manager:{}

  },

  /**
   * 组件的方法列表
   */
  methods: {
  
    onLoad:function(e){
      wx.setNavigationBarTitle({
        //title: wx.getStorageSync('mallName')
        title: '填写基本信息'
      })
      const userId = wx.getStorageSync('userId');
      this.setData({
        id:e.id,
        ['manager.companyId']: e.id,
        ['manager.userId']: userId,
        ['manager.flag']: 1
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
    remarkInput: function (e) {
      let event = e.currentTarget.dataset.event
      switch (event) {
        case 'input':
          this.setData({
            ['manager.remark']: e.detail.value
          })
          break;
        case 'clear':
          this.setData({
            ['manager.remark']: ''
          })
          break;
        default:
          break;
      }
    },
    submitCheck: function () {
      console.log(this.data.manager)
      WXAPI.saveManager(this.data.manager).then(res=>{
        if(res.code==200){
        wx.navigateTo({
        url: './notify-status?id='+this.data.id,
        //url: './notify-status?id='+110,
      })
        }
      })
     
    }


  }
})
