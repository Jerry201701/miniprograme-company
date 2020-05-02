// pages/certificate/certificate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    certificates:[
      {name:'健康证',type:"default"},
      {name:'中式烹调师(初级)',type:"default"},
      {name:'中式烹调师(高级)',type:"default"},
      {name:'西式烹调师(初级)',type:"default"},
      {name:'西式烹调师(高级)',type:"default"},
      {name:'中式面点师(初级)',type:"default"},
      {name:'中式面点师(高级)',type:"default"}
     
    ],
    type:'default',
    isChoosed:false,
    isDisable:true,
    
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '证书选择'
    })
  
  

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  chooseCertificate:function(e){
   
    //console.log(e.currentTarget.dataset.text);
    
    var id = e.currentTarget.id;
   // console.log(id)
 //   console.log(e.currentTarget.dataset.text.name)
if(e.currentTarget.dataset.text.type==='default'){
    this.data.certificates[e.currentTarget.id].type="primary"
  
}else{
  this.data.certificates[e.currentTarget.id].type = "default"
  

}
    this.setData({
      certificates: this.data.certificates
    })
  // console.log(this.data.certificateList)
   
  },
  /*
  统计选择的资格证书
  */
  savaCertificate:function(){
    //console.log('保存证书')
   // console.log(this.data.certificates)
   var list=[]
    this.data.certificates.forEach(function (value, i, array) {
      if(value.type==='primary'){
      list.push(value.name)
      }
    })
    
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      certificateList: list
    })




    wx.navigateBack()






  }
  

})