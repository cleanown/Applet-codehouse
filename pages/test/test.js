// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionsheet: false,
    allStyle: '',
    checked: '',
    disabled: false,
    nowDate: '',
    oldDate: '',
    newDate: '',
  },


  testClick: function () {
    this.setData({
      showActionsheet: true
    })
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    console.log(e.detail.value)
    this.close()
  },
  switchAll: function (e) {
    console.log(`%cswitch全部（状态）：${e.detail.value}`,'color: yellow')
    if (e.detail.value == true) {
      this.setData({
        disabled: true,
        checked: false,
        allStyle: '#999',
        oldDate: '',
        newDate: ''
      })
    } else {
      this.setData({
        disabled: false,
        allStyle: ''
      })
    }
  },
  // 多选
  bindbuttontap: function (e) {
    console.log(e.detail.value)
  },
  // 日期
  bindDateChangeOld: function (e) {
    console.log(e.detail.value)
    this.setData({
      oldDate: e.detail.value
    })
  },
  bindDateChangeNew: function (e) {
    console.log(e.detail.value)
    this.setData({
      newDate: e.detail.value
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