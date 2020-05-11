//app.js
import request from './api/request'
import { userinfo } from './api/api'
const app = getApp()
var that = this
App({
  onShow: function () {
    this.userinfoGet()
  },
  userinfoGet: function () {
    request.get(userinfo).then((res) => {
      if (res.code === 200) {
        console.log('%c我的信息：', 'color: yellow')
        console.log(res)
        that.globalData.userinfo = res.data
        } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  globalData: {
    userinfo: null,
    loginCode: null,
    host: 'http://api.cleanown.cn'
  }
})