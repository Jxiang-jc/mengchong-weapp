//app.js
App({
  globalData: {

  },

  onLaunch (options) {
    
    try {
      const deviceInfo = wx.getStorageSync('deviceInfo')
      if (!deviceInfo) {
        const res = wx.getSystemInfoSync()
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;
        wx.setStorageSync('deviceInfo',{
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      } else {
        this.globalData.windowHeight = deviceInfo.windowHeight;
        this.globalData.windowWidth = deviceInfo.windowWidth;
      }
      
    } catch (e) {
      // Do something when catch error
    }
  },
  onShow (options) {
    console.log('onShow')
  },
  onHide () {
    console.log('onHide')
  },
  onError (msy) {
    console.log(msg)
  },
  muFunction () {

  },

})