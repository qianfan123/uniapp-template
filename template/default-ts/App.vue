<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    var sysdata: any = uni.getSystemInfoSync()
    // #ifndef MP
    Vue.prototype.statusBarHeight = sysdata.statusBarHeight
    if (sysdata.platform === 'android') {
      Vue.prototype.navBarHeight = (sysdata.statusBarHeight || 0) + 50
    } else {
      Vue.prototype.navBarHeight = (sysdata.statusBarHeight || 0) + 45
    }
    // #endif
    // #ifdef MP-WEIXIN
    Vue.prototype.statusBarHeight = sysdata.statusBarHeight
    let custom = wx.getMenuButtonBoundingClientRect()
    Vue.prototype.navBarHeight = custom.bottom + custom.top - sysdata.statusBarHeight
    // #endif
    // #ifdef MP-ALIPAY
    Vue.prototype.statusBarHeight = sysdata.statusBarHeight
    Vue.prototype.navBarHeight = sysdata.statusBarHeight + sysdata.titleBarHeight
    // #endif

    /// 自定义Tabbar的高度，处理iphonex以外的，统一设置成高度50
    let modelmes = sysdata.model
    if (
      modelmes.indexOf('iPhone X') >= 0 ||
      modelmes.indexOf('iPhone XR') >= 0 ||
      modelmes.indexOf('iPhone XS') >= 0 ||
      modelmes.indexOf('iPhone 12') >= 0 ||
      modelmes.indexOf('iPhone 11') >= 0 ||
      modelmes.indexOf('iPhone11') >= 0 ||
      modelmes.indexOf('iPhone12') >= 0 ||
      modelmes.indexOf('iPhoneXR') >= 0 ||
      modelmes.indexOf('iPhoneX') >= 0
    ) {
      Vue.prototype.safeAreaBottom = 34
    } else {
      Vue.prototype.safeAreaBottom = 0
    }
  },
  onUnload() {},
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  methods: {}
})
</script>

<style lang="scss">
/*每个页面公共css */
@import 'components/hdcss/common.scss';
</style>
