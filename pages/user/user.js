// pages/user/user.js
import request from '../../api/request'
import { userinfo } from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    userfun: [
      {
        imgUrl: '../../images/user/article.png',
        fun: '发文管理',
        role: 2
      },
      {
        imgUrl: '../../images/user/user.png',
        fun: '用户管理',
        role: 2
      },
      {
        imgUrl: '../../images/user/collect.png',
        fun: '收藏',
        role: 1
      },
      {
        imgUrl: '../../images/user/setting.png',
        fun: '设置',
        role: 1
      },
      {
        imgUrl: '../../images/user/about.png',
        fun: '关于',
        role: 1
      }
    ]
  },
  loginGo: function () {
    wx.removeStorageSync('token')
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    request.get(userinfo).then((res) => {
      if (res.code === 200) {
        console.log(res)
        this.setData({
          userinfo: res.data
        })
        getApp().globalData.userInfo = res.data
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
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