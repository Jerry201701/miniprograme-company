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
    manager: {
      id:0,
      name: '姓名',
      phone: '电话',
      email: '',
      sex: 0,
      company:'现在公司',
      deliveryJobNumber:0,
      entryNumber:0,
      interviewNumber:0,
      logoUrl:'https://picture2019-1256835711.cos.ap-beijing.myqcloud.com/recruit/2.jpg',
      managerNumber:0


    }


  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (e) {
      wx.setNavigationBarTitle({
        //title: wx.getStorageSync('mallName')
        title: '个人中心'
      })
      const companyId=wx.getStorageSync("companyId")
      WXAPI.findCompanyCenterNumber(companyId).then(res=>{
          this.setData({
            deliveryJobNumber: res.data.deliveryJobNumber,
            interviewNumber: res.data.interviewNumber,
            entryNumber: res.data.entryNumber,
            logoUrl: res.data.logoUrl,
            managerNumber:res.data.managerNumber-1
          })

      })

    },
    onShow:function(e){
    //  const id=this.data.manager.id===null?e.id:this.data.manager.id
      const id = wx.getStorageSync('managerId');
      if(id>0){
      WXAPI.getManagerById(id).then(res => {
        if(res.data.name !=null){
          this.setData({
            ['manager.name']: res.data.name
          })
        }
        if(res.data.phone !=null){
          this.setData({
            ['manager.phone']: res.data.phone
          })
        }
       
      })
      }
    },

    editManager:function(){
      wx.navigateTo({
        url: 'manager',
      })
    }

  }
})
