// pages/posts/post-detail/post-detail.js
var postData = require("../../../data/posts-data.js")
Page({

  /**
   * Page initial data
   */
  data: {
    isPlayImgMusic: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    this.setData({
      ...postData.postList[postId]
    })
    //从缓存取数据
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else { //如果缓存没有创建缓存
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }
    this.setData({
      collected: postsCollected[postId]
    });
  },
  onMusicTap: function() {
    if (this.data.isPlayImgMusic) {
      wx.pauseBackgroundAudio();
      console.log('stop')
      this.setData({
        isPlayImgMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music.url,
        title: this.data.music.title,
        coverImgUrl: this.data.music.coverImg
      })
      this.setData({
        isPlayImgMusic: true
      });
      console.log('start')
    }
    console.log(this.data.music.url);
  },
  onCollectionTap: function(event) {
    //this.getPostsCollectedSync();
    this.getPostsCollectedAsync();
  },

  getPostsCollectedAsync: function() {
    //从缓存取数据
    var _this = this;
    var postsCollected = wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[_this.data.currentPostId];
        postCollected = !postCollected;
        // //修改缓存数据
        postsCollected[_this.data.currentPostId] = postCollected;
        // //更新数据刷新界面
        _this.showToast(postsCollected, postCollected);
      }
    })

  },

  getPostsCollectedSync: function() {
    //从缓存取数据
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //取反
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //修改缓存数据

    //更新数据刷新界面
    this.showToast(postsCollected, postCollected);
  },

  showModal: function(postsCollected, postCollected) {
    var _this = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? "是否收藏该文章" : "是否取消收藏",
      showCancel: true,
      cancelText: postCollected ? "不收藏" : "返回",
      cancelColor: "#333",
      confirmText: postCollected ? "收藏" : "取消收藏",
      confirmColor: "#405f80",
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          _this.setData({
            collected: postCollected
          });
        }
      }
    });
  },
  showToast: function(postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 1000
    });
  },
  onShareTap: function(event) {
    var itemList = ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到朋友圈']
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        if (!res.cancel) {
          console.log(res.tapIndex);
        }
      }
    })
    console.log(event)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})