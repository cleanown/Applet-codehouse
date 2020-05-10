// pages/article/article.js
import request from '../../api/request'
import { companydetail, commentget, commentadd } from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyid: '',
    company: {},
    comment: {},
    cValue: '',
    starcolor: 'black',
    startype: 'outline',
    likecolor: 'black',
    liketype: 'outline',
    likenum: 55,
    commentshow: false,
    inputshow: false
  },
  star: function () {
    if (this.data.starcolor === 'black') {
      wx.showToast({
        title: '收藏成功',
      })
    } else {
      wx.showToast({
        title: '取消收藏',
      })
    }
    this.setData ({
      starcolor: this.data.starcolor === 'black' ? '#651FFF' : 'black',
      startype: this.data.startype === 'outline' ? 'field' : 'outline'
    })
  },
  like: function () {
    if (this.data.likecolor === 'black') {
      wx.showToast({
        title: '点赞成功',
      })
      this.setData({
        likenum: this.data.likenum += 1
      })
    } else {
      wx.showToast({
        title: '取消点赞',
      })
      this.setData({
        likenum: this.data.likenum -= 1
      })
    }
    this.setData ({
      likecolor: this.data.likecolor === 'black' ? '#651FFF' : 'black',
      liketype: this.data.liketype === 'outline' ? 'field' : 'outline'
    })
  },
  comment: function () {
    this.setData({
      inputshow: true
    })
  },
  inputClose: function () {
    this.setData({
      inputshow: false
    })
  },
  commentValue: function (e) {
    this.setData({
      cValue: e.detail.value
    })
    console.log(this.data.cValue)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyid: options.id
    })
    console.log(this.data.companyid)
    request.get(companydetail, {
      companyid: options.id
    }).then((res) => {
      // console.log(res)
      if (res.code === 200) {
        this.setData({
          company: res.data
        })
        console.log(this.data.releaseTime)
        console.log(this.data.company)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
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
    request.get(`${commentget}${this.data.companyid}`).then((res) => {
      console.log(res)
      if (res.code === 200) {
        if (res.msg === '查询成功') {
          this.setData ({
            commentshow: true
          })
          this.setData({
            comment: res.data
          })
          console.log(this.data.comment)
        } else {
          this.setData ({
            commentshow: false
          })
        }
      } else {
        wx.showToast({
          title: res.msg,
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