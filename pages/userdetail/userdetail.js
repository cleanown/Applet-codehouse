// pages/userdetail/userdetail.js
// import request from '../../api/request'
// import { getalluser } from '../../api/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    username: '',
    headimg: '',
    role: '',
    changerole: '',
    disabled: true,
    btnname: '修改'
  },
  radiochange: function (e) {
    console.log(e.detail.value)
  },
  infoChange: function () {
    if (this.data.btnname === '修改') {
      this.setData({
        btnname: '确认修改',
        disabled: false
      })
    } else {
      console.log('修改成功')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('%c跳转接参：','color: yellow')
    this.setData({
      userid: options.userid,
      username: options.username,
      headimg: options.headimg,
      role: options.role,
    })
    console.log(`用户id：${this.data.userid}`)
    console.log(`用户名：${this.data.username}`)
    console.log(`用户头像：${this.data.headimg}`)
    console.log(`用户级别：${this.data.role}`)
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