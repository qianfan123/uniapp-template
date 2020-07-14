<template>
  <view class="hd-tabbar" :style="{height: safeAreaBottom + 'px'}">
    <view style="width: 100%;height: 1px;transform: scaleY(0.5);background-color: #eee;"></view>

    <view style="height: 49px;">
      <view style="flex-grow: 1;display: flex;align-items: center;">
        <view
          v-for="(item, index) in tabList"
          :key="index"
          class="tab-item"
          @click="clickItem(item, index)"
        >
          <image
            style="width: 50rpx;height: 50rpx;"
            :src="activeIndex === index ? item.select_img:item.img"
            mode="aspectFit"
          />
          <text
            :style="{'font-size': '22rpx', 'margin-top': '4rpx', 'color': activeIndex === index ? activeColor:'#999'}"
          >{{ item.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      safeAreaBottom: this.safeAreaBottom,
      activeIndex: 0
    }
  },
  name: 'hd-tabbar',
  computed: {},
  props: {
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    activeColor: {
      type: String,
      default: '#0065FF'
    }
  },
  mounted() {},
  methods: {
    clickItem(item, index) {
      this.activeIndex = index
      this.$emit('indexChange', index)
    }
  }
}
</script>

<style scoped>
.hd-tabbar {
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
  z-index: 1024;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.hd-tabbar .tab-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  margin-top: 4rpx;
}
.hd-tabbar .tab-item image {
  width: 60rpx;
  height: 60rpx;
}
</style>
