// pages/user/user.js
const app = getApp()
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
        id: 0,
        role: 2
      },
      {
        imgUrl: '../../images/user/user.png',
        fun: '用户管理',
        id: 1,
        role: 2
      },
      {
        imgUrl: '../../images/user/collect.png',
        fun: '收藏',
        id: 2,
        role: 1
      },
      {
        imgUrl: '../../images/user/setting.png',
        fun: '设置',
        id: 3,
        role: 1
      },
      {
        imgUrl: '../../images/user/about.png',
        fun: '关于',
        id: 4,
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
  itemClick: function (e) {
    switch (e.currentTarget.dataset.id) {
      case 0:
        wx.navigateTo({
          url: '/pages/articlemanage/articlemanage',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/usermanage/usermanage',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/test/test',
        })
        break;
        case 4:
        wx.navigateTo({
          url: '/pages/about/about',
        })
        break;
    }
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
    this.setData({
      userinfo: app.globalData.userinfo
    })
    console.log('%c我的信息：', 'color: yellow')
    console.log(this.data.userinfo)
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