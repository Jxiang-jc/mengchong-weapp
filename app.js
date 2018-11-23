//app.js
App({
  globalData: {

  },

  onLaunch (options) {
    try {
      const res = wx.getSystemInfoSync()
      this.globalData.windowHeight = res.windowHeight;
      this.globalData.windowWidth = res.windowWidth;
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