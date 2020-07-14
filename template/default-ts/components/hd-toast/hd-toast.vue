<template>
  <div class="_showToast" v-show="show" :class="{mask:mask}">
    <view class="toast">
      <image class="img" v-if="image" :src="image" />
      <image class="icon" v-if="icon" :src="icon" />
      <view class="title">{{ title }}</view>
    </view>
  </div>
</template>

<script>
import { successImg, warningImg, failImg } from './img.js'
export default {
  name: 'hd-toast',
  computed: {
    show() {
      return this.$toastStore.state.show
    },
    title() {
      return this.$toastStore.state.title
    },
    icon() {
      if (this.$toastStore.state.icon === 'success') {
        return successImg
      } else if (this.$toastStore.state.icon === 'warning') {
        return warningImg
      } else if (this.$toastStore.state.icon === 'error') {
        return failImg
      }
      return null
    },
    image() {
      return this.$toastStore.state.image
    },
    mask() {
      return this.$toastStore.state.mask
    }
  },
  methods: {},
  beforeDestroy() {
    this.$toastStore.commit('hideToast')
  }
}
</script>

<style lang="scss" scoped>
._showToast {
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100vh;
  &.mask {
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
  }
  .toast {
    position: absolute;
    display: inline-block;
    max-width: 420rpx;
    min-width: 180rpx;
    box-sizing: border-box;
    padding: 30rpx;
    top: 50vh;
    left: 375rpx;
    transform: translate(-50%, -50%);
    color: #ffffff;
    background-color: #53565e;
    border-radius: 10rpx;
    .icon,
    .img {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      height: 44rpx;
      width: 44rpx;
      margin-bottom: 24rpx;
    }
    .title {
      max-width: 360rpx;
      min-width: 120rpx;
      line-height: 44rpx;
      text-align: center;
      font-size: 28rpx;
      color: rgba(255, 255, 255, 1);
    }
  }
  .toast image {
    width: 44rpx;
    height: 44rpx;
    margin-bottom: 10rpx;
  }
}
</style>
