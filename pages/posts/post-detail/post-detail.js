// pages/posts/post-detail/post-detail.js
var postData = require("../../../data/posts-data.js")
Page({

  /**
   * Page initial data
   */
  data: {
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    this.setData({
      ...postData.postList[postId]
    })
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected){
      var postCollected = postsCollected[postId];
      if (postCollected){
        this.setData({
          collected: postCollected
        })
      }
    }else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }
    this.setData({
      collected: postsCollected[postId]
    });
  },

  onCollectionTap: function (event) { 
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });
  },

  onShareTap: function (event) {
    console.log(event)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})