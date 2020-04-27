//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    companylist: [{
      companyname: '广州千锋有限责任公司',
      province: '广州市'
    }, {
      companyname: '广州千锋有限责任公司',
      province: '广州市'
    }, {
      companyname: '广州千锋有限责任公司',
      province: '广州市'
    }, {
      companyname: '广州千锋有限责任公司',
      province: '广州市'
    }, {
      companyname: '广州千锋有限责任公司',
      province: '广州市'
    }, {
      companyname: '广州千锋有限责任公司',
      province: '广州市'
    }, {
      companyname: '广州千锋有限责任公司',
      province: '广州市'
    }, {
      companyname: '广州千锋有限责任公司',
      province: '广州市'
    }]
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
  },
  onShow: function () {
    this.getCompanylsit()
  },
  getCompanylsit: function () {
    wx.request({
      url: 'http://api.cleanown.cn/search/companylist',
      method: "GET",
      success(res) {
        console.log(res)
      }
    })
  },
  search: function (value) {
      console.log(value)
      return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
})
