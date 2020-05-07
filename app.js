//app.js
import request from './api/request'
import { userinfo } from './api/api'
App({
  onLaunch: function () {
    if (wx.getStorageSync('token')) {
      this.getUserInfos()
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      console.log('无token')
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  getUserInfos: function() {
    console.log('有token，获取用户信息')
    request.get(userinfo).then((res) => {
      console.log(res)
    })
  },
  globalData: {
    userInfo: null,
    host: 'http://api.cleanown.cn'
  }
})