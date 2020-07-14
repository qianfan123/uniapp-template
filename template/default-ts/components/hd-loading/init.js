import Vuex from 'vuex'

export default function init(v, image, title) {
  // 挂在store到全局Vue原型上
  v.prototype.$loadingStore = new Vuex.Store({
    state: {
      show: false,
      title: title,
      image: image
    },
    mutations: {
      hideLoading(state) {
        // 小程序导航条页面控制
        // #ifndef H5
        if (state.hideTabBar) {
          wx.showTabBar()
        }
        // #endif
        state.show = false
      },
      showLoading(state, data) {
        state = Object.assign(state, data)
        state.show = true
      }
    }
  })
  // 注册$showLoading到Vue原型上，以方便全局调用
  v.prototype.$showLoading = function (option) {
    if (typeof option === 'object') {
      // #ifndef H5
      if (option.hideTabBar) {
        wx.hideTabBar()
      }
      // #endif
      v.prototype.$loadingStore.commit('showLoading', option)
    } else {
      v.prototype.$loadingStore.commit('showLoading', null)
    }
  }

  v.prototype.$hideLoading = function () {
    v.prototype.$loadingStore.commit('hideLoading')
  }
}
