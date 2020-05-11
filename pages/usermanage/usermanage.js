// pages/usermanage/usermanage.js
import request from '../../api/request'
import { getalluser } from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: {},
    searchvalue: ''
  },
  search: function (e) {
    this.setData({
      searchvalue: e.detail.value
    })
    console.log(this.data.searchvalue)
    console.log('%c查询：', 'color: yellow')
    this.onShow()
  },
  searchclear: function () {
    this.setData({
      searchvalue: ''
    })
    this.onShow()
  },
  itemClick: function (e) {
    console.log('%c带参跳转：','color: yellow')
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/userdetail/userdetail?userid='+e.currentTarget.dataset.userid+'&username='+e.currentTarget.dataset.username+'&headimg='+e.currentTarget.dataset.headimg+'&role='+e.currentTarget.dataset.role+'',
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
    wx.showLoading({
      title: '',
    })
    this.getalluser()
  },
  getalluser: function () {
    request.get(getalluser, {
      hotkey: this.data.searchvalue
    }).then((res) => {
      if (res.code === 200) {
        this.setData({
          users: res.data.users
        })
        wx.hideLoading({
          complete: (res) => {},
        })
        console.log('%c用户列表：', 'color: yellow')
        console.log(this.data.users)
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