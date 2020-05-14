// pages/articlemanage/articlemanage.js
var app = getApp()
import request from '../../api/request'
import { adminCompanyList, admindelete, verify} from '../../api/api'
var timer = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companylist: [],
    searchvalue: '',
    page: 1,
    pageTotle: '',
    clientY: '',
    timeStamp: '',
    slideButtons: [{
      text: '通过',
      extClass: '',
    },{
      text: '不通过',
      extClass: '',
    },{
      type: 'warn',
      text: '删除',
    }],
    buttonsDelete: [{text: '取消'}, {text: '确定'}],
    dialogShowDelete: false,
    itemid: '',
    filtrate: false,
    allStyle: '',
    checked: '',
    disabled: false,
    borderbottom: 'solid',
    isverify: '',
    isdelete: '',
    nowDate: '',
    beginDate: '',
    endDate: '',
    beginTime: '',
    endTime: '',
  },
  // 搜索框
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
  // 子项点击
  itemClick (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/article/article?id='+e.currentTarget.dataset.id+'',
    })
  },
  // 上下滑动
  wxlisttouchstart: function (e) {
    // console.log(`%c开始:`,'color: yellow')
    // console.log(e.timeStamp)
    // console.log(e.changedTouches[0].clientY)
    this.setData({
      clientY: e.changedTouches[0].clientY,
      timeStamp: e.timeStamp
    })
  },
  wxlisttouchmove: function (e) {
    // console.log(e.timeStamp)
  },
  wxlisttouchend: function (e) {
    // console.log(`%c结束:`,'color: yellow')
    // console.log(e.timeStamp)
    // console.log(e.changedTouches[0].clientY)
    const clientYDiffer = this.data.clientY-e.changedTouches[0].clientY
    const timeStampDiffer = e.timeStamp-this.data.timeStamp
    // console.log('%cclientY差值（滑动y轴坐标差）:', 'color:yellow')
    // console.log(clientYDiffer)
    // console.log('%ctimeStamp差值（滑动时差）:', 'color:yellow')
    // console.log(timeStampDiffer)
    if (clientYDiffer>150 && timeStampDiffer<150) {
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
    }
  },
  // 子项左滑
  slideButtonTap: function (e) {
    console.log('%c文章id：', 'color: yellow')
    this.setData({
      itemid: e.currentTarget.dataset.id
    })
    console.log(this.data.itemid)
    switch (e.detail.index) {
      case 0:
        this.itemAdopt(e)
        break;
      case 1:
        this.itemPass(e)
        break;
      case 2:
        this.itemDelete(e)
        break;
    }
  },
  itemAdopt: function (e) {
    if (e.currentTarget.dataset.item.isverify == false) {
      this.isverifyJudge(e)
    } else {
      wx.showToast({
        title: '重复操作',
        icon: 'none'
      })
    }
  },
  itemPass: function (e) {
    if (e.currentTarget.dataset.item.isverify == true) {
      this.isverifyJudge(e)
    } else {
      wx.showToast({
        title: '重复操作',
        icon: 'none'
      })
    }
  },
  isverifyJudge: function (e) {
    console.log('%c操作状态：','color:yellow')
    request.put(verify, {
      status: !e.currentTarget.dataset.item.isverify,
      companyid: e.currentTarget.dataset.id
    }).then((res) => {
      console.log(res)
      wx.showLoading({
        title: res.msg,
      })
      this.setData({
        page: 1,
        companylist: []
      })
      this.adminCompanyListGet()
    }).catch((res) => {
      wx.showLoading({
        title: res.msg,
      })
    })
  },
  // 删除操作
  itemDelete: function (e) {
    this.setData({
      dialogShowDelete: true
    })
  },
  tapDialogButtonDelete: function (e) {
    if (e.detail.index === 0) {
      this.setData({
        dialogShowDelete: false
      })
    } else {
      this.articleDelete()
    }
  },
  articleDelete: function () {
    this.setData({
      dialogShowDelete: false
    })
    const url = `${admindelete}?companyid=${this.data.itemid}`
    request.remove(url).then((res) => {
      if (res.code === 200) {
        console.log('%c删除状态：','color: yellow')
        console.log(res)
        wx.showLoading({
          title: res.msg
        })
        this.setData({
          page: 1,
          companylist: []
        })
        this.adminCompanyListGet()
      }
    }).catch((res) => {
      wx.showToast({
        title: res.msg,
      })
    })
  },
  // 筛选
  choose: function () {
    this.setData({
      filtrate: !this.data.filtrate
    })
  },
  chooseClose: function () {
    this.setData({
      filtrate: false
    })
  },
  // 总开关
  switchAll: function (e) {
    if (e.detail.value == true) {
      this.setData({
        disabled: true,
        checked: false,
        allStyle: '#999',
        borderbottom: 'dashed',
        isverify: '',
        isdelete: '',
        beginDate: '',
        endDate: ''
      })
    } else {
      this.setData({
        disabled: false,
        borderbottom: 'solid',
        allStyle: ''
      })
    }
  },
  // 多选
  isverifybindbuttontap: function (e) {
    console.log('%cisverify:', 'color: yellow')
    const ckGroup = e.detail.value
    if (ckGroup.length===0||ckGroup.length===2) {
      this.setData({
        isverify: ''
      })
    } else if (ckGroup.indexOf('1')>-1) {
      this.setData({
        isverify: true
      })
    } else {
      this.setData({
        isverify: false
      })
    }
    console.log(this.data.isverify)
  },
  isdeletebindbuttontap: function (e) {
    console.log('%cisdelete:', 'color: yellow')
    const ckGroup = e.detail.value
    if (ckGroup.length===0||ckGroup.length===2) {
      this.setData({
        isdelete: ''
      })
    } else if (ckGroup.indexOf('3')>-1) {
      this.setData({
        isdelete: true
      })
    } else {
      this.setData({
        isdelete: false
      })
    }
    console.log(this.data.isdelete)
  },
  // 日期
  oldbindcancel: function () {
    this.setData({
      beginDate: ''
    })
  },
  bindDateChangeOld: function (e) {
    console.log('%c开始日期:','color: yellow')
    console.log(e.detail.value)
    this.setData({
      beginDate: e.detail.value,
      beginTime: new Date(e.detail.value).getTime()
    })
    console.log(this.data.beginTime)
  },

  newbindcancel: function () {
    this.setData({
      endDate: ''
    })
  },
  bindDateChangeNew: function (e) {
    console.log('%c结束日期:','color: yellow')
    console.log(e.detail.value)
    this.setData({
      endDate: e.detail.value,
      endTime: new Date(e.detail.value).getTime()
    })
    console.log(this.data.endTime)
  },
  confirmClick: function () {
    if (this.data.beginTime>this.data.endTime) {
      wx.showToast({
        title: '开始日期应小于结束日期',
        icon: 'none'
      })
      this.setData({
        beginDate: '',
        endDate: '',
        beginTime: '',
        endTime: '',
      })
    } else {
      console.log('%c传值：', 'color: yellow')
      console.log(`isverify: ${this.data.isverify}`)
      console.log(`isdelete: ${this.data.isdelete}`)
      console.log(`beginTime:${this.data.beginTime}`)
      console.log(`endTime:${this.data.endTime}`)
      wx.showLoading({
        title: '',
      })
      this.setData({
        companylist: [],
        borderbottom: 'solid',
        page: 1,
        filtrate: false,
        disabled: false,
      })
      this.adminCompanyListGet()
      this.setData({
        isverify: '',
        isdelete: ''
      })
    }
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
    this.setData({
      nowDate: timer.formatTime(new Date())
    })
    this.adminCompanyListGet()
  },
  adminCompanyListGet: function () {
    const data = {
      page: this.data.page,
      isverify: this.data.isverify,
      isdelete: this.data.isdelete,
      hotkey: this.data.searchvalue,
      beginTime: this.data.beginTime,
      endTime: this.data.endTime
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
    this.setData({
      companylist: [],
      page: 1,
    })
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