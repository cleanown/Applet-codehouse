// pages/articlemanage/articlemanage.js
import request from '../../api/request'
import { adminCompanyList } from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companylist: [],
    searchvalue: '',
    page: 1,
    pageTotle: ''
  },
  search: function (e) {
    this.setData({
      searchvalue: e.detail.value,
      page: 1
    })
    wx.showLoading({
      title: '',
    })
    console.log(this.data.searchvalue)
    this.adminCompanyListGet()
  },
  searchclear: function () {
    this.setData({
      searchvalue: ''
    })
    wx.showLoading({
      title: '',
    })
    this.adminCompanyListGet()
  },
  itemClick (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/article/article?id='+e.currentTarget.dataset.id+'',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
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
    this.adminCompanyListGet()
  },
  adminCompanyListGet: function () {
    const data = {
      // page: this.page,
      // isverify: this.isverify,
      // isdelete: this.isdelete,
      // hotkey: this.searchValue,
      // beginTime: new Date(this.beginDate).getTime(),
      // endTime: new Date(this.endDate).getTime() + 24 * 60 * 60 * 1000
      page: this.data.page,
      // isverify: '',
      // isdelete: '',
      hotkey: this.data.searchvalue,
      // beginTime: '',
      // endTime: ''
    }
    request.post(adminCompanyList, data).then((res) => {
      // console.log(res)
      if (res.code === 200) {
        this.setData({
          pageTotle: res.data.pageTotle
        })
        if (res.data.pageTotle>1) {
          this.setData({
            companylist: this.data.companylist.concat(res.data.adminlist)
          })
        } else {
          this.setData({
            companylist: res.data.adminlist
          })
        }
        wx.hideLoading({
          complete: (res) => {},
        })
        console.log('%c文章管理（公司列表）：','color: yellow')
        console.log(this.data.companylist)
        console.log('%c总页数：', 'color: yellow')
        console.log(this.data.pageTotle)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }).catch((res) => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
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
    wx.showLoading({
      title: '',
    })
    if (this.data.page < this.data.pageTotle) {
      this.setData({
        page: this.data.page+=1
      })
      console.log('%c第几页：', 'color: yellow')
      console.log(this.data.page)
      this.adminCompanyListGet()
    } else {
      wx.showToast({
        title: '已经到底了哦',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})