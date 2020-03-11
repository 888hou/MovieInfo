// pages/movies/moview.js
var util = require("../../utils/utils.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250";
    this.getMovieListData(inTheatersUrl, "正在热映", "inTheaters");
    this.getMovieListData(comingSoonUrl, "即将上映", "comingSoon");
    this.getMovieListData(top250Url, "Top250", "top250");
  },

  getMovieListData: function(url, columnTitle, settedKey) {
    var _this = this;
    wx.request({
      url: url,
      data: {
        "start": 6,
        "count": 3
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      success: function(res) {
        if (res.errMsg == "request:ok") {
          _this.processDoubanData(res.data, columnTitle, settedKey);
        }
      },
      fail: function(error) {
        console.log(error);
      },
      complete: function() {

      }
    })
  },

  processDoubanData: function(moviesDouban, columnTitle, settedKey) {
    var movies = [];
    for (var subject of moviesDouban.subjects) {
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        title: title,
        stars: util.convertToStringArray(subject.rating.stars),
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var readyData = {
      title: columnTitle,
      movies: movies
    }
    var data = {}
    data[settedKey] = readyData;
    this.setData(data);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})