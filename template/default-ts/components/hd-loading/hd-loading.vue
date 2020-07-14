<template>
  <div class="_showLoading" v-show="show">
    <view class="loading">
      <image v-if="image != null" :src="image" />
      <!-- 默认动画 -->
      <view v-if="image == null" class="icon-rotate" :style="{'border-color': borderColor}"></view>

      <text style="margin-top: 10px;font-size: 15px;" v-if="title != null">{{ title }}</text>
    </view>
  </div>
</template>

<script>
export default {
  name: 'hd-loading',
  computed: {
    show() {
      return this.$loadingStore.state.show
    },
    title() {
      return this.$loadingStore.state.title
    },
    image() {
      return this.$loadingStore.state.image
    },
    borderColor() {
      return '#0065FF'
    }
  },
  methods: {},
  beforeDestroy() {
    this.$loadingStore.commit('hideLoading')
  }
}
</script>

<style lang="scss" scoped>
._showLoading {
  width: 100%;
  height: 100vh;
  /* background-color: rgba(0,0,0,0.4); */
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10000;
  .loading {
    position: relative;
    top: 40vh;
    left: 375rpx;
    transform: translate(-50%, -50%);
    width: 200rpx;
    height: 200rpx;
    text-align: center;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loading image {
    width: 80rpx;
    height: 80rpx;
  }
  /* 旋转动画 */
  .loading .icon-rotate {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    border: 4rpx solid gray;
    border-bottom-color: transparent !important; /*已在style设置border-color,此处需加 !important*/
    animation: iconRotate 0.6s linear infinite;
  }

  @keyframes iconRotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
