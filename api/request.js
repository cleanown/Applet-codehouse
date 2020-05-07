const app = getApp()

const request = (url, options) => {
  return new Promise((resolve, reject) => {
    if (wx.getStorageSync('token')) {
      var token = wx.getStorageSync('token')
    } else {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
    wx.request({
      url: `${app.globalData.host}${url}`,
      method: options.method,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
        // 'x-token': 'x-token'
        'authorization': token
      },
      success(request) {
        if (request.data.code === 200) {
          resolve(request.data)
        } else {
          reject(request.data)
        }
      },
      fail(error) {
        reject(error.data)
      }
    })
    
  })
}

const get = (url, options = {}) => {
  return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
  return request(url, { method: 'POST', data: options })
}

const put = (url, options) => {
  return request(url, { method: 'PUT', data: options })
}

const remove = (url, options) => {
  return request(url, { method: 'DELETE', data: options })
}

module.exports = {
  get,
  post,
  put,
  remove
}