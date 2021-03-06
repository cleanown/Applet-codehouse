//index.js
//获取应用实例
const app = getApp()
import request from '../../api/request'
import { companylist, searchlist, userinfo } from '../../api/api'
Page({
  data: {
    searchvalue: '',
    companylist: {}
  },
  onLoad() {
    
  },
  onShow: function () {
    wx.showLoading({
      title: '',
    })
    this.getCompanylsit()
    var token = wx.getStorageSync('token')
    console.log('%ctoken值：','color: yellow')
    console.log(token)
    if (token !== '') {
      this.userinfoGet()
    }
  },
  // 获取列表
  getCompanylsit: function () {
    request.get(companylist).then(res => {
      if (res.code === 200) {
        this.setData({
          companylist: res.data
        })
        wx.hideLoading({
          complete: (res) => {},
        })
        console.log('%c公司列表：','color: yellow')
        console.log(this.data.companylist)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch((res) => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
  },
  // 获取用户信息
  userinfoGet: function () {
    request.get(userinfo).then((res) => {
      console.log(res)
      if (res.code === 200) {
        console.log('%c先获取自己的信息并存入globalData：', 'color: yellow')
        getApp().globalData.userinfo = res.data
        console.log(getApp().globalData.userinfo)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch((res) => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
  },
  searchclear: function () {
    this.setData({
      searchvalue: ''
    })
    this.onShow()
  },
  // 搜索
  search: function (e) {
    this.setData({
      searchvalue: e.detail.value
    })
    wx.showLoading({
      title: '',
    })
    request.get(searchlist, {
      key: this.data.searchvalue
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          companylist: res.data
        })
        wx.hideLoading({
          complete: (res) => {},
        })
        console.log('%c搜索列表：','color: yellow')
        console.log(this.data.companylist)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch((res) => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
    console.log(this.data.searchvalue)
  },
  itemClick: function (e) {
    console.log('%c带参跳转（article—id）:','color: yellow')
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/article/article?id='+e.currentTarget.dataset.id+'',
    })
  },
  onShareAppMessage: function () {

  }
})
