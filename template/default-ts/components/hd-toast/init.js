import Vuex from 'vuex'

export default function init(v) {
  v.use(Vuex)
  // 挂在store到全局Vue原型上
  v.prototype.$toastStore = new Vuex.Store({
    state: {
      show: false,
      title: '',
      icon: null,
      image: null,
      mask: false,
      positon: 'center',
      duration: 1500
    },
    mutations: {
      hideToast(state) {
        // 小程序导航条页面控制
        // #ifndef H5
        if (state.hideTabBar) {
          wx.showTabBar()
        }
        // #endif
        state.show = false
      },
      showToast(state, data) {
        state = Object.assign(state, data)
        state.show = true
        setTimeout(() => {
          state.show = false
        }, state.duration)
      }
    }
  })
  // 注册$showLoading到Vue原型上，以方便全局调用
  v.prototype.$showToast = function (option) {
    if (typeof option === 'object') {
      // #ifndef H5
      if (option.hideTabBar) {
        wx.hideTabBar()
      }
      // #endif
      v.prototype.$toastStore.commit('showToast', option)
    } else {
      v.prototype.$toastStore.commit('showToast', null)
    }
  }

  v.prototype.$hideToast = function () {
    v.prototype.$toastStore.commit('hideToast')
  }
}