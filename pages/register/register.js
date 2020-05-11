// pages/register/register.js
import request from '../../api/request'
import { register } from '../../api/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    repwd: ''
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
    console.log(this.data.username)
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },
  repwd: function (e) {
    this.setData({
      repwd: e.detail.value
    })
    console.log(this.data.repwd)
  },
  pwdrepeat: function () {
    if (this.data.repwd != this.data.password) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 2000
      })
    }
  },
  register: function () {
    if (this.data.username === '') {
      wx.showToast({
        title: '用户名不得为空',
        duration: 2000,
        icon: 'none'
      })
    } else if (this.data.password === '') {
      wx.showToast({
        title: '密码不得为空',
        duration: 2000,
        icon: 'none'
      })
    } else if (this.data.repwd === '') {
      wx.showToast({
        title: '请重复输入密码',
        duration: 2000,
        icon: 'none'
      })
    } else if (this.data.password != this.data.repwd) {
      wx.showToast({
        title: '两次密码输入不一致',
        duration: 2000,
        icon: 'none'
      })
    } else {
      request.post(register, {
        username: this.data.username,
        password: this.data.password
      }).then((res) => {
        console.log(res)
        wx.showToast({
          title: '注册成功',
          icon: 'loading'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }, 1500)
      }).catch((res) => {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      })
    }
  },
  clear: function () {
    this.setData({
      username: '',
      password: '',
      repwd: ''
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