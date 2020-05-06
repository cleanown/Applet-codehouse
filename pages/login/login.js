// pages/login/login.js
import request from '../../api/request'
import { login } from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  loginname: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  loginpwd: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function() {
    console.log(this.data.username)
    console.log(this.data.password)
    const data = {
      username: this.data.username,
      password: this.data.password
    }
    request.post(login, data).then(res => {
      console.log(res)
    })
  },
  registerGo: function () {
    wx.navigateTo({
      url: '/pages/register/register',
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
    wx.hideHomeButton({
      complete: (res) => {
        console.log(res)
      },
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