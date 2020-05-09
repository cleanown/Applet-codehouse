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
        console.log(res)
        this.setData({
          companylist: res.data
        })
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
        console.log(res)
        this.setData({
          companylist: res.data
        })
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
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/article/article?id='+e.currentTarget.id+'',
    })
  }
})
