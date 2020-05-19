// pages/release/release.js
const app = getApp()
import request from '../../api/request'
import { release } from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    cpName: '',
    cpDetail: '',
    files: [],
    urlArr: [],
    cpAdress: '',
    region: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },
  loginGo: function () {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  cpName: function (e) {
    this.setData({
      cpName: e.detail.value
    })
    console.log(this.data.cpName)
  },
  cpDetail: function (e) {
    this.setData({
      cpDetail: e.detail.value
    })
    console.log(this.data.cpDetail)
  },
  cpAdress: function (e) {
    this.setData({
      cpAdress: e.detail.value
    })
    console.log(this.data.cpAdress)
  },

  // 上传图片并预览
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      var tempFilePaths = files.tempFilePaths
      var that = this
      that.setData({
        urlArr: []
      })
      var object = {}
      for (var i = 0; i < tempFilePaths.length; i++) {
        console.log('%c上传中。。。','color: yellow')
        wx.uploadFile({
          filePath: files.tempFilePaths[i],
          name: 'file',
          url: 'https://api.cleanown.cn/upload/img',
          header: {
            'Content-Type': 'application/json; charset=UTF-8',
            'authorization': wx.getStorageSync('token')
          },
          success: function (res) {
            console.log('%c上传状态:', 'color: yellow')
            if (res.statusCode === 200) {
              const result = JSON.parse(res.data)
              console.log(result)
              var url = result.data.path
              that.setData({
                urlArr: that.data.urlArr.concat(app.globalData.imgprefix + url)
              })
              object['urls'] = that.data.urlArr
              if (that.data.urlArr.length == tempFilePaths.length) {
                resolve(object)
              }
            }
          }
        })
      }
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
    console.log(this.data.urlArr)
  },
  binddelete(e) {
    console.log('upload delete', e.detail)
    this.setData({
      urldelete: this.data.urlArr.splice(e.detail.index,1)
    })
    console.log(this.data.urlArr)
  },


  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    console.log(`省：${this.data.region.slice(0,1).join()}`)
  },
  release: function () {
    if (this.data.cpName === '') {
      wx.showToast({
        title: '公司名不得为空',
        icon: 'none'
      })
    } else if (this.data.cpDetail === '') {
      wx.showToast({
        title: '内容不得为空',
        icon: 'none'
      })
    } else if (this.data.region == '') {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
    } else if (this.data.cpAdress == '') {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none'
      })
    } else {
      const data = {
        companyname: this.data.cpName,
        companydetail: this.data.cpDetail,
        province: this.data.region.slice(0,1).join(),
        city: this.data.region.slice(1,2).join(),
        address: this.data.cpAdress,
        imgs: this.data.urlArr
      }
      request.post(release, data).then((res) => {
        console.log(res)
        if (res.code === 200) {
          wx.showToast({
            title: '成功，等待审核'
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index',
            })
            this.setData({
              cpName: '',
              cpDetail: '',
              region: '',
              cpAdress: '',
              files: ''
            })
          }, 1500)
        }
      }).catch((res) => {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      })
    }
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
    var token = wx.getStorageSync('token')
    console.log('%ctoken值：','color: yellow')
    console.log(token)
    this.setData({
      token: token
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})