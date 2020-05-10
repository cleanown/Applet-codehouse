//index.js
//获取应用实例
const app = getApp()
import request from '../../api/request'
import { companylist, searchlist } from '../../api/api'
Page({
  data: {
    searchvalue: '',
    companylist: {}
  },
  onLoad() {
  },
  onShow: function () {
    this.getCompanylsit()
  },
  getCompanylsit: function () {
    request.get(companylist).then(res => {
      if (res.code === 200) {
        this.setData({
          companylist: res.data
        })
        console.log('%c公司列表：','color: yellow')
        console.log(this.data.companylist)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  searchclear: function () {
    this.setData({
      searchvalue: ''
    })
    this.getCompanylsit()
  },
  search: function (e) {
    this.setData({
      searchvalue: e.detail.value
    })
    request.get(searchlist, {
      key: this.data.searchvalue
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          companylist: res.data
        })
        console.log('%c搜索列表：','color: yellow')
        console.log(this.data.companylist)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
    console.log(this.data.searchvalue)
  },
  itemClick: function (e) {
    console.log('%c带参跳转（id）:','color: yellow')
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/article/article?id='+e.currentTarget.dataset.id+'',
    })
  }
})
