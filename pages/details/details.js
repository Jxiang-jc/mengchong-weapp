// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    type: '',
    message: '',
    contact: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const arr = wx.getStorageSync('info')

    var details_info = arr.filter( item => {
      return item.idx == options.id
    })
    this.renderDetails(details_info)
  },
  
  renderDetails (info) {
    this.setData({
      address: info[0].address,
      type: info[0].type,
      message: info[0].message,
      contact: info[0].contact
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