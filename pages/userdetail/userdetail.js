// pages/userdetail/userdetail.js
import request from '../../api/request'
import { changerole } from '../../api/api'
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
    checked: '',
    changerole: '',
    disabled: true,
    btnname: '修改',
    dialogShow: false,
    dialogmsg: '确定将该用户降为普通用户？',
    buttons: [{text: '取消'}, {text: '确定'}]
  },
  radiochange: function (e) {
    console.log(e.detail.value)
    this.setData({
      changerole: e.detail.value
    })
    if (e.detail.value === '1') {
      this.setData({
        dialogmsg: '确定将该用户降为普通用户？'
      })
    } else {
      this.setData({
        dialogmsg: '确定将该用户提升为管理员？'
      })
    }
  },
  infoChange: function () {
    if (this.data.btnname === '修改') {
      this.setData({
        btnname: '确认修改',
        disabled: false
      })
    } else if (this.data.changerole === this.data.role) {
      wx.showToast({
        title: '信息未变动！',
        icon: 'none'
      })
    } else {
      this.setData({
        dialogShow: true
      })
    }
  },
  tapDialogButton: function (e) {
    console.log(e.detail.index)
    if (e.detail.index === 0) {
      this.setData({
        dialogShow: false
      })
    } else  {
      this.changeRole()
    }
  },
  changeRole: function () {
    request.put(changerole, {
      userId: this.data.userid,
      newRole: this.data.changerole
    }).then((res) => {
      if (res.code === 200) {
        console.log(res)
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            complete: (res) => {},
          })
        },1500)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
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
      changerole: options.role
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
    if (this.data.role === '1') {
      this.setData({
        checked: true
      })
    } else {
      this.setData({
        checked: false
      })
    }
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