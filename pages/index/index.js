//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    longitude: '',
    latitude: '',
    markers: [],
    controls: [{
      iconPath: '/resources/icon-location.png',
      position: {
        left: (app.globalData.windowWidth/2) -16 , // 减去图片宽度一般
        top: ((app.globalData.windowHeight-40 ) / 2) - 31,
        width: 32,
        height: 31
      }
    },
    {
      id: 1, // 需要点击的时候必须添加
      iconPath: '/resources/position.png',
      position: {
        left: 15,
        top: app.globalData.windowHeight-90  ,
        width: 38,
        height: 36
      },
      clickable: true
    }]
  },

  onReady () {
    this.mapCtx = wx.createMapContext('map')
  },
  onShow () {
    this.getLoaction()
    this.getStorageInfo()
  },
  getLoaction () {
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLoactionSucc.bind(this)
    })
  },
  getStorageInfo () {
    var logs = wx.getStorageSync('info') || [] // 获取本地内存里面的信息,无则为空数组
    // console.log(777, logs)/
    if (logs.length > 0) {
      const markers = logs.map((item, idx) => {
        return {
          iconPath: "/resources/" + item.type + ".png",
          id: item.idx,
          latitude: item.latitude,
          longitude: item.longitude,
          width: 35,
          height: 35
        }
      })
      this.setData({
        markers: markers
      })
    }
  },

  handleGetLoactionSucc (res) { 
      const latitude = res.latitude
      const longitude = res.longitude
      this.setData({
        longitude:longitude,
        latitude:latitude
      })
  },
  controltap(e) { // 地图控件要触发点击事件的话，需要把电脑显示缩放比例改为100%
    this.mapCtx.moveToLocation()
  },
  markertap (e) {
    console.log(e)
    wx.navigateTo({ // 点击mark跳转详情页面
      url: '/pages/details/details?id='+ e.markerId
    })
  },

  onShareAppMessage: function (res) { // 转发
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '萌宠交易平台',
      path: '/pages/index/index'
    }
  }
})