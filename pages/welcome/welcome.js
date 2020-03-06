Page({
  onTap: function () {
    // wx.navigateTo({
    //   url: '/pages/posts/posts',
    // })
    //redirectTo 不能返回 页面会被unload navigateTo 可以返回 页面 hide
    wx.redirectTo({
      url: '/pages/posts/posts',
    })
  }
})