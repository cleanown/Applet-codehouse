// pages/article/article.js
const app = getApp()
import request from '../../api/request'
import { companydetail, commentget, commentadd, admindelete, verify } from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyid: '',
    company: {},
    releaseTime: '',
    comment: {},
    starcolor: 'black',
    startype: 'outline',
    likecolor: 'black',
    liketype: 'outline',
    likenum: 55,
    commentnum: '',
    commentshow: false,
    inputshow: false,
    replyshow: false,
    commentvalue: '',
    userinfo: {},
    isverify: '',
    userid: '',
    linkid: '',
    linkname: '',
    buttonsDelete: [{text: '取消'}, {text: '确定'}],
    dialogShowDelete: false,
    judgeicon: '',
    judgecolor: ''

  },
  // 收藏
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
  // 喜欢
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
  // 消息发送窗口打开关闭
  comment: function () {
    this.setData({
      inputshow: true
    })
  },
  inputClose: function () {
    this.setData({
      inputshow: false,
      replyshow: false
    })
  },
  commentValue: function (e) {
    this.setData({
      commentvalue: e.detail.value
    })
    console.log(this.data.commentvalue)
  },
  // 评论
  commentSent: function () {
    const data = {
      commentdetail: this.data.commentvalue,
      companyid: this.data.companyid,
      userid: this.data.userid,
      commentid: this.data.commentid,
      linkid: this.data.linkid,
      linkname: this.data.linkname
    }
    if (this.data.commentvalue === '') {
      wx.showToast({
        title: '内容不得为空',
        icon: 'none'
      })
    } else {
      request.post(commentadd, data).then((res) => {
        if (res.code === 200) {
          wx.showToast({
            title: '成功',
          })
          console.log('%c是否添加成功：','color: yellow')
          console.log(res)
          this.onShow()
          this.setData({
            commentvalue: '',
            inputshow: false,
            replyshow: false,
            commentid: '',
            linkid: '',
            linkname: ''
          })
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
    }
  },
  // 回复
  reply: function(e) {
    this.setData({
      replyshow: true,
      commentid: e.currentTarget.dataset.commentid,
      linkid: e.currentTarget.dataset.linkid,
      linkname: e.currentTarget.dataset.linkname,
    })
    console.log('%c回复带参：','color: yellow')
    console.log(e)
    console.log(`公司id：${this.data.companyid}`)
    console.log(`评论主体id：${this.data.commentid}`)
    console.log(`@人的linkid：${this.data.linkid}`)
    console.log(`@人的linkname：${this.data.linkname}`)
    console.log(`我的id：${this.data.userid}`)
  },
  childrenReply: function(e) {
    this.setData({
      replyshow: true,
      commentid: e.currentTarget.dataset.commentid,
      linkid: e.currentTarget.dataset.linkid,
      linkname: e.currentTarget.dataset.linkname,
    })
    console.log('%c回复带参：','color: yellow')
    console.log(e)
    console.log(`公司id：${this.data.companyid}`)
    console.log(`评论主体id：${this.data.commentid}`)
    console.log(`@人的linkid：${this.data.linkid}`)
    console.log(`@人的linkname：${this.data.linkname}`)
    console.log(`我的id：${this.data.userid}`)
  },
  // 删除
  dialogShowDelete: function () {
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
    const url = `${admindelete}?companyid=${this.data.companyid}`
    request.remove(url).then((res) => {
      if (res.code === 200) {
        console.log('%c删除状态：','color: yellow')
        console.log(res)
        wx.showToast({
          title: res.msg,
        })
        setTimeout(() => {
          wx.navigateBack({
            complete: (res) => {},
          })
        },1500)
      }
    }).catch((res) => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
  },
  // 审核通过是否判断
  isverifyJudge: function () {
    request.put(verify, {
      status: !this.data.isverify,
      companyid: this.data.companyid
    }).then((res) => {
      if (res.code === 200) {
        wx.showToast({
          title: '修改成功',
        })
        this.setData({
          isverify: !this.data.isverify
        })
        this.isverifyShowJudge()
        console.log('%c审核判断:','color:yellow')
        console.log(res)
        console.log(`isverify: ${this.data.isverify}`)
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
  isverifyShowJudge: function () {
    if (this.data.isverify == true) {
      this.setData({
        judgeicon: 'report-problem',
        judgecolor: 'orange'
      })
    } else {
      this.setData({
        judgeicon: 'done2',
        judgecolor: 'green'
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyid: options.id,
      userinfo: app.globalData.userinfo,
      userid: app.globalData.userinfo._id
    })
    // console.log(this.data.companyid)
    request.get(companydetail, {
      companyid: options.id
    }).then((res) => {
      // console.log(res)
      if (res.code === 200) {
        this.setData({
          company: res.data,
          isverify: res.data.isverify,
          releaseTime: res.data.meta.createAt.slice(0,10) + ' ' + res.data.meta.createAt.slice(11,19)
        })
        console.log('%c公司信息详情:','color: yellow')
        console.log(this.data.company)
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
    this.isverifyShowJudge()
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
      // console.log(res)
      if (res.code === 200) {
        if (res.msg === '查询成功') {
          this.setData ({
            commentshow: true,
            commentnum: res.data.length
          })
          this.setData({
            comment: res.data
          })
          console.log('%c评论列表:','color: yellow')
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})