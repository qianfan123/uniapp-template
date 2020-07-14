import Vuex from 'vuex'
export default function init(v) {
  // 挂在store到全局Vue原型上
  v.prototype.$modalStore = new Vuex.Store({
    state: {
      show: false,
      title: '提示',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#282C34',
      confirmText: '确定',
      confirmColor: '#00925A',
      success: null
    },
    mutations: {
      hideModal(state) {
        // 小程序导航条页面控制
        // #ifndef H5
        if (state.hideTabBar) {
          wx.showTabBar()
        }
        // #endif
        state.show = false
      },
      showModal(state, data) {
        state = Object.assign(state, data)
        state.show = true
      },
      success(state, res) {
        let cb = state.success
        let resObj = {
          cancel: false,
          confirm: false
        }
        res === 'confirm' ? (resObj.confirm = true) : (resObj.cancel = true)
        cb && cb(resObj)
      }
    }
  })
  // 注册$showModal到Vue原型上，以方便全局调用
  v.prototype.$showModal = function (option) {
    if (typeof option === 'object') {
      // #ifndef H5
      if (option.hideTabBar) {
        wx.hideTabBar()
      }
      // #endif

      v.prototype.$modalStore.commit('showModal', option)
    } else {
      // eslint-disable-next-line no-throw-literal
      throw '配置项必须为对象传入的值为：' + typeof option
    }
  }
}
