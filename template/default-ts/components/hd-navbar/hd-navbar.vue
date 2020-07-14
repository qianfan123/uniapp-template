<template>
  <view class="nav-super" :style="{height: myNavHeight + 'px'}">
    <view class="hd-navbar" :style="navStyle">
      <view style="display: flex;align-items: center;height: 30px;margin-bottom: 7px;">
        <view class="action" @tap="BackPage">
          <text
            :class="backIconClass"
            :style="{ color: backIconColor, 'font-size': '24px' }"
            v-if="isBack"
          ></text>
          <slot name="backText" v-if="isBack"></slot>
        </view>
        <view class="content">
          <slot name="content"></slot>
        </view>
        <view class="right">
          <slot name="right"></slot>
        </view>
      </view>
      <view
        v-if="showLine"
        style="width: 100%;height: 1px;transform: scaleY(0.5);background-color: #eee;"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    }
  },
  name: 'hd-navbar',
  computed: {
    navStyle() {
      var CustomBar = this.myNavHeight
      var bgImage = this.bgImage
      var style = `height:${CustomBar}px;background-color: ${this.bgColor};`
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`
      }
      return style
    },
    /// 默认页面上是有一个导航栏高度的占位高度。如果是需要导航栏透明，就需要设置这个高度是0
    myNavHeight() {
      if (this.navHidden) {
        return 0
      } else {
        return this.CustomBar
      }
    }
  },
  props: {
    backIconClass: {
      type: String,
      default: 'hdIcon-arrow-left'
    },
    backIconColor: {
      type: String,
      default: '#333'
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    bgImage: {
      type: String,
      default: ''
    },
    isBack: {
      type: [Boolean, String],
      default: true
    },
    showLine: {
      type: Boolean,
      default: true
    },
    /// 导航栏是否透明
    navHidden: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  methods: {
    BackPage() {
      this.$emit('backClick')
      if (getCurrentPages().length < 2 && typeof __wxConfig !== 'undefined') {
        let url = '/' + __wxConfig.pages[0]
        return uni.redirectTo({ url })
      }
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style scoped>
.nav-super {
  display: block;
  position: relative;
}
.hd-navbar {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1024;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.hd-navbar .action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 100px;
  padding-left: 4px;
  box-sizing: border-box;
}
.hd-navbar .right {
  width: 50px;
  flex-shrink: 0;
  text-align: right;
  width: 80px;
}

.hd-navbar .content {
  width: calc(100% - 160px);
  text-align: center;
}
</style>
