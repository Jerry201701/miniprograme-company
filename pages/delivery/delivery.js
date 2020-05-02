const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const app = getApp()

Page({
  data: {
    select: false,
    tihuoWay: '全部',
    positions: true,
    jobList: [],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    resumeList:[],
    choosed:true,
    chooseList:[],
    error: ''
  },
  onShow() {
    this.data.batch=false
    const id = wx.getStorageSync('companyId')
    WXAPI.getResumeByCompany(id).then(res=>{
     // console.log(res.data)
      res.data.forEach((item,index)=>{
        var time =new Date(item.deliveryTime)
        item.deliveryTime=time.getMonth()+'月'+time.getDay()+'日'+' '+time.getHours()+':'+time.getMinutes()
        item.select=false
        item.checked=false
      })
     // console.log(res.data)
      this.setData({
        batch: false,
        resumeList:res.data

      })
    })
   
  },

  bindTypeTap: function (e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onLoad: function (e) {


  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
 

  listStatus: function () {
    console.log('test')
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select,
      positions: false
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    console.log(name)
    this.setData({
      tihuoWay: name,
      select: false,
      positions: true
    })
  },
 

  checkboxChange: function (e) {

    var values = e.detail.value
    var resumeList = this.data.resumeList
   // console.log(this.data.resumeList)
   // console.log('checkbox发生change事件，携带value值为：', e.detail.value);


   // var resumeList = this.data.resumeList, values = e.detail.value;
    for (var i = 0, lenI = resumeList.length; i < lenI; ++i) {
      resumeList[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (resumeList[i].id == values[j]) {
          resumeList[i].checked = true;
          break;
        }
      }
    }

    // this.setData({
    //   checkboxItems: checkboxItems
    // });

    // for (var i = 0, lenI = resumeList.length; i < lenI; ++i) {
    //    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
    //      if (resumeList[i].id == values[j]) {
    //        resumeList[i].checked = true;
    //       break;
    //     }
    //   }
    // }

    this.setData({
      resumeList: resumeList,
      chooseList:values
    });
  },


  selectResume: function (e) {
    // console.log(e.currentTarget)
    // var choose = e.currentTarget.dataset.selectde
    // if (e.currentTarget.dataset.selectde){
    //   e.currentTarget.dataset.selectde=false
    // }else{
    //   e.currentTarget.dataset.selectde=true
    // }
    //if(e.currentTarget.dataset.selected)
    // var id = e.currentTarget.id;
    // if (e.currentTarget.dataset.text.type === 'default') {
    //   this.data.certificates[e.currentTarget.id].type = "primary"
    // } else {
    //   this.data.certificates[e.currentTarget.id].type = "default"
    // }
    // this.setData({
    //   certificates: this.data.certificates
    // })
   
  },
  // selectResume:function(){
  //   if(this.data.choosed){
  //     this.setData({
  //       choosed:false
  //     })
  //   }else{
  //     choosed:true
  //   }

  // },
  toSingleResume:function(e){
 
    const id = e.currentTarget.dataset.id
    const applicantId = e.currentTarget.dataset.applicantid
  
    // var open = e.currentTarget.dataset.open
    // console.log(open)
    if(!this.data.batch){
    wx.navigateTo({
      url: './delivery-single/delivery-single?id='+id+'&applicantId='+applicantId
    })
    }

  },


  batchManagement:function(){
    this.setData({
      batch:true
    })

  },
  batchSubmit:function(){
    this.setData({
      batch:false
    })

  },


  inviteSubmit:function(){
    var that = this;
    var handles=[]
    that.data.chooseList.forEach((item, index) => {
     // item.interviewResult=true
      handles.push({
        id:item,
        interviewResult:3
      })
     } )
    if (handles.length === 0) {
      that.setData({
        error: '没有选中的数据'
      })
    } else {
    WXAPI.handleBathcInterview(handles).then(res=>{
      if(res.code===200){
        wx.showToast({
          title: '简历处理成功',
          icon: 'success',
          duration: 3000,
          success:function(){
            that.data.chooseList = []
            that.onShow();   
          }       
        });
      }
    })
    }
  },

  refuseSubmit:function(){
    var that = this;
    console.log(that.data.chooseList)
    var handles = []
    that.data.chooseList.forEach((item, index) => {
      // item.interviewResult=true
      handles.push({
        id: item,
        interviewResult: 2
      })
    })
    if (handles.length === 0) {
      that.setData({
        error: '没有选中的数据'
      })
    }else{
    WXAPI.handleBathcInterview(handles).then(res => {
      if (res.code === 200) {
        wx.showToast({
          title: '简历处理成功',
          icon: 'success',
          duration: 3000,
          success: function () {
            that.data.chooseList=[]
            that.onShow();
          }
        });
      }
    })
    }

  },

  cancelBatch:function(){
    this.setData({
      batch: false
    })
  }

})