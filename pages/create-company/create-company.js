const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
var jobData = require('../../utils/city.js')
const COS = require('../../utils/cos-wx-sdk-v5')
const utils = require("../../utils/util.js")
import WxValidate from '../../utils/WxValidate'
var app = getApp()
Page({
  data: {
      fansId: '',
      region: ['浙江省', '杭州市'],    //设置初始化地址
      workTypes: [
        { name: '请选择人员规模', value: 1 },
        { name: '10-100', value: 2 },
        { name: '100-200', value: 3 },
        { name: '200-300', value: 4 },
      ],
      wordNumber: 0,
      workTypeIndex: 0,
      staffRange: [[], []],
      staffValue: [1, 1],    
      companyInfo: {
        minStaff: 0,    
        maxStaff: 1,
        brand:'',
        fullName:'',
        shortName:'',
        address: '', 
        latitude:'',
        longitude:'',
        description:''
      },
      userId:0,
      picturePath: '',
      upload: false,
      canSave:1,
      error: ''
  },

  onLoad: function (e) {
    this.initValidate()
    //console.log(this.WxValidate)
    this.initSalaryRange();
    wx.setNavigationBarTitle({
      //title: wx.getStorageSync('mallName')
      title: '创建公司信息'
    })
    const openid = wx.getStorageSync('openid');
    WXAPI.companyBasicByOpenid(openid).then(res => {
      if(res.code===200){
          this.setData({
              userId:res.data.userId
          })
      }
    })
    // 查看是否授权
  

  },

 


  /**
   * input事件
   */
  operateInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          ['companyInfo.expectPosition']: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          ['companyInfo.expectPosition']: ''
        })
        break;
      default:
        break;
    }
  },
  fullNameInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          ['companyInfo.fullName']: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          ['companyInfo.fullName']: ''
        })
        break;
      default:
        break;
    }
  },
  brandInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          ['companyInfo.brand']: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          ['companyInfo.brand']: ''
        })
        break;
      default:
        break;
    }
  },
  shortNameInput: function (e) {
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          ['companyInfo.shortName']: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          ['companyInfo.shortName']: ''
        })
        break;
      default:
        break;
    }
  },
  adressInput:function(e){
    let event = e.currentTarget.dataset.event
    switch (event) {
      case 'input':
        this.setData({
          ['companyInfo.address']: e.detail.value
        })
        break;
      case 'clear':
        this.setData({
          ['companyInfo.address']: ''
        })
        break;
      default:
        break;
    }

  },

  operateTextarea: function (e) {
    this.setData({
      ['companyInfo.description']: e.detail.value.trim(),
      wordNumber: e.detail.value.trim().length
    })
  },


  /**
   *  选择工作类型
   */
  bindWorkTypeChange: function (e) {
    console.log(typeof e.detail.value)
    this.setData({
      workTypeIndex: parseInt(e.detail.value),
      ['companyInfo.workType']: parseInt(e.detail.value) + 1
    })
  },
  /**
   * 选择地址
   */
  bindRegionChange: function (e) {
  //  e.detail.value.pop();   //删除县区项 
    this.setData({
      region: e.detail.value,
      ['companyInfo.expectPlace']: e.detail.value.join(" ")
    })
  //  console.log(this.data.region, this.data.model)
    console.log(this.data.region)
   // console.log(this.data.model)
  },
  /**
   * 选择薪资范围
   */
  bindSalaryChange: function (e) {
    let selectedVal = e.detail.value    //返回数组
    let employeesRange = this.data.employeesRange
    this.setData({
      salaryValue: selectedVal,
      ['companyInfo.minEmployeesSalary']: employeesRange[0][selectedVal[0]],
      ['companyInfo.maxEmployeesSalary']: employeesRange[1][selectedVal[1]],
    })
    console.log(this.data.salaryValue)
  },

  bindStaffChange: function (e) {
    let selectedVal = e.detail.value    //返回数组
    let staffRange = this.data.staffRange
    this.setData({
      staffValue: selectedVal,
      ['companyInfo.minStaff']: staffRange[0][selectedVal[0]],
      ['companyInfo.maxStaff']: staffRange[1][selectedVal[1]],
    })
   
  },


  /**
   *  初始化薪资数据
   */
  initSalaryRange: function () {
    let minTotal = 20, maxTotal = 100;
    for (let i = 1; i <= minTotal; i++) {
      this.data.staffRange[0].push(i*10)
    }
    for (let j = 1; j <= maxTotal; j++) {
      this.data.staffRange[1].push(j*10)
    }
    this.setData({
      staffRange: this.data.staffRange
    })
  },
  /**
   * 确保右边大于左边
   */
  columnchange: function (e) {
    console.log(e.detail)
    let detail = e.detail, sv = this.data.staffValue;
    if (detail.column === 0) {
      this.setData({
        ['staffValue[0]']: detail.value
      })
      if (detail.value > sv[1]) {
        this.setData({
          staffValue: [detail.value, detail.value]
        })
      }
    }
    if (detail.column === 1) {
      this.setData({
        ['staffValue[1]']: detail.value
      })
      if (sv[0] > detail.value) {
        this.setData({
          staffValue: [detail.value, detail.value]
        })
      }
    }
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  /**
  * 保存
  */
  save: function () {
    const _this = this
    if (_this.data.canSave === 2) {
      _this.setData({
        error: '稍等,已经投递了'
      })
      return false
    }
    if (!this.WxValidate.checkForm(_this.data.companyInfo)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    if (this.WxValidate.checkForm(_this.data.companyInfo)){
    const nickName=wx.getStorageSync('nickName')
        _this.setData({
          canSave: 2
        })
    var companyInfo = {
      fullName: _this.data.companyInfo.fullName,
      brand: _this.data.companyInfo.brand,
      shortName: _this.data.companyInfo.shortName,
      address: _this.data.companyInfo.address,
      longitude: _this.data.companyInfo.longitude,
      latitude: _this.data.companyInfo.latitude,
      description:_this.data.companyInfo.description,
      minStaff: _this.data.companyInfo.minStaff,
      maxStaff: _this.data.companyInfo.maxStaff,
      companyLogo: _this.data.picturePath
    }
    
    WXAPI.saveCompanyInfo(companyInfo).then(res => {
      if(res.code===123){
        _this.setData({
          error: res.msg,
          canSave: 1
        })
        return false
      }
      
      if (res.data != null) {
        wx.setStorageSync('companyId', res.data);
        WXAPI.saveManager({
          userId:_this.data.userId,
          companyId:res.data,
          name:nickName,
          flag: 2
        }).then(res=>{
          this.setData({
            canSave:1
          })
         wx.reLaunch({
           url: '/pages/company-detail/company-detail?companyId='+res.data,
         })
        })
       
      }
    })
   }
    
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

  getLocation:function(){
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.chooseLocation({
                success: function (res) {
                  that.setData({
                    ['companyInfo.address']: res.address,
                    ['companyInfo.latitude']: res.latitude,
                    ['companyInfo.longitude']: res.longitude
                  })
                },
                fail: function () {
                },
                complete: function () {
                }
              })  

            }
          })
        }
        if (res.authSetting['scope.userLocation']) {
          wx.chooseLocation({
            success: function (res) {
              that.setData({
                ['companyInfo.address']: res.address,
                ['companyInfo.latitude']: res.latitude,
                ['companyInfo.longitude']: res.longitude
              })
            },
            fail: function () {
            },
            complete: function () {
            }
          })  

        }
      }
    })
    
  },


  uploadPortrait: function () {
    const that = this
    console.log('上传公司logo');
    var Bucket = 'picture2019-1256835711';
    var Region = 'ap-beijing';

    // 初始化实例
    var cos = new COS({
      // ForcePathStyle: true, // 如果使用了很多存储桶，可以通过打开后缀式，减少配置白名单域名数量，请求时会用地域域名
      getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        wx.request({
          url: 'https://recruit.xcalculas.cn/pic/create/cos/secret',
          data: {
            bucket: options.Bucket,
            region: options.Region,
          },
          dataType: 'json',
          success: function (result) {
            var data = result.data;
            var credentials = data && data.credentials;
            if (!data || !credentials) return console.error('credentials invalid');
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
            });
          }
        });
      }
    });
    // 选择文件
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认用原图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var fileName = 'job/'.concat(utils.randomString()).concat('.')
        var filePath = res.tempFiles[0].path;
        fileName = fileName.concat(filePath.substr(filePath.lastIndexOf('.') + 1));
        console.log(filePath)
        console.log(fileName)
        cos.postObject({
          Bucket: Bucket,
          Region: Region,
          Key: fileName,
          FilePath: filePath,
          onProgress: function (info) {
            // console.log(JSON.stringify(info));
          }
        }, function (err, data) {
          if (data) {
            that.setData({
              picturePath: data.Location,
              upload: true
            })
          }
          if (err) {
            console.log('上传失败')
          }

        });

      }
    });

  },


  delPicture: function () {
    this.setData({
      picturePath: '',
      upload: false
    })

  },
  radomTest: function () {
    const random = utils.randomString()
    console.log(random)
    // const number = Math.random().toString(36).substr(2, 15)
    // const timestamp = parseInt(new Date().getTime() / 1000)
    // console.log(number.concat(timestamp))


  },
  initValidate() {
    // 验证字段的规则
    const rules = {
      fullName: {
        required: true,
      },
      brand: {
        required: true,
      },
      shortName: {
        required: true,
      },
      
      minStaff: {
        required: true,
      },
      
      maxStaff: {
        required: true,
      },
      address: {
        required: true,
      },
      description: {
        required: true,
      }
      
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      fullName: {
        required: '请填写公司全称',
      },
      brand: {
        required: '请输入品牌',
      },
      shortName: {
        required: '请输入简称',
      },
      minStaff: {
        required: '请选择最小人数',
      },

      maxStaff: {
        required: '请选择最大人数',
      },
      address: {
        required: '请输入地址',
      },
      description: {
        required: '请输入公司介绍',
      }
      
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

    // 自定义验证规则
    // this.WxValidate.addMethod('assistance', (value, param) => {
    //   return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
    // }, '请勾选1-2个敲码助手')
  }
  

})