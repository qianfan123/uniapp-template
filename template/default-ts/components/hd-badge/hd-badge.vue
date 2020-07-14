<template>
  <view class="hd-badge">
    <slot></slot>
    <view class="hd-badge-dot" v-if="dot" :style="{ background: bgColor }"></view>
    <view
      class="hd-badge-count"
      v-else-if="count"
      :style="{ background: bgColor, top: top, right: right }"
    >{{ finalCount }}</view>
  </view>
</template>

<script>
export default {
  name: 'hd-badge',
  props: {
    count: {
      type: Number,
      default: 0
    },
    maxCount: {
      type: Number,
      default: 99
    },
    dot: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0
    },
    right: {
      type: Number,
      default: 8
    },
    bgColor: {
      type: String,
      default: 'linear-gradient(180deg, #FF7979 0%, #FC2C4A 100%)'
    }
  },
  computed: {
    finalCount() {
      return this.count > this.maxCount ? `${this.maxCount}+` : this.count
    }
  }
}
</script>

<style scoped>
.hd-badge {
  position: relative;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
  margin-top: 10px;
}
.hd-badge-count {
  display: inline-block;
  position: absolute;
  top: 0rpx;
  right: 8rpx;
  z-index: 10;
  box-sizing: border-box;
  min-width: 30rpx;
  height: 32rpx;
  padding: 0 10rpx;
  color: #fff;
  font-size: 24rpx;
  line-height: 32rpx;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 0 0 1px #fff;
  border-radius: 16rpx;
  transform: translateX(50%) scale(0.8);
}
.hd-badge-dot {
  position: absolute;
  top: -8rpx;
  right: -16rpx;
  z-index: 10;
  width: 20rpx;
  height: 20rpx;
  box-shadow: 0 0 0 1rpx #fff;
  border-radius: 100%;
  transform: translateX(-50%);
}
</style>
