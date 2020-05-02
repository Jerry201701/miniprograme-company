// pages/company/center.js
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
   managers:[]


  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (e) {
      const that=this
      wx.setNavigationBarTitle({
        
        title: '招聘者管理'
      })
      const companyId=wx.getStorageSync('companyId')
      WXAPI.listManagersByCompany(companyId).then(res=>{
        this.setData({
          managers: res.data
        })

      })
     

    },
    onShow: function (e) {
      
    },
    approvesManager:function(e){
      console.log(e.currentTarget.dataset.id)
      console.log(e.currentTarget.dataset.status)
      WXAPI.approvesManager({
        id: e.currentTarget.dataset.id,
        flag: e.currentTarget.dataset.status
      }).then(res=>{
        if(res.data===1){
          wx.showToast({
            title: '审核成功',
            icon: 'success',
            duration: 3000
          });
        }
          
      })

    },

    editManager: function () {
      wx.navigateTo({
        url: 'manager',
      })
    }

  }
})
