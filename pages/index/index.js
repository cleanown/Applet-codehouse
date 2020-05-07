//index.js
//获取应用实例
const app = getApp()
import request from '../../api/request'
import { companylist } from '../../api/api'
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    companylist: {}
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
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
  search: function (value) {
      console.log(value)
      return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  itemClick (index) {
    console.log(index)
  }
})
