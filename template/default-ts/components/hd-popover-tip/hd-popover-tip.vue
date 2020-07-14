<template>
  <view
    class="mask"
    :class="!show ? '' : 'mask-show'"
    :style="{ backgroundColor: show ? maskBg : 'background:rgba(0,0,0,0)' }"
    @tap="tapMask"
  >
    <view
      class="popups"
      :style="{ top: popupsTop, left: popupsLeft }"
      :class="theme"
    >
      <text
        :class="dynPlace"
        :style="{ width: '0px', height: '0px' }"
        v-if="triangle"
      ></text>
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'hd-popover-tip',
  props: {
    maskBg: {
      type: String,
      default: 'rgba(0,0,0,0.1)'
    },
    placement: {
      type: String,
      default: 'default' // default top-start top-end bottom-start bottom-end
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    value: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'light' // light dark
    },
    dynamic: {
      type: Boolean,
      default: false
    },
    gap: {
      type: Number,
      default: 20
    },
    triangle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      popupsTop: '0px',
      popupsLeft: '0px',
      show: false,
      dynPlace: ''
    }
  },
  mounted() {
    this.popupsPosition()
  },
  methods: {
    tapMask() {
      this.$emit('input', !this.value)
    },
    async popupsPosition() {
      let promise = new Promise((resolve, reject) => {
        uni.getSystemInfo({
          success: function (e) {
            let customBar
            // #ifndef MP
            if (e.platform === 'android') {
              customBar = e.statusBarHeight + 50
            } else {
              customBar = e.statusBarHeight + 45
            }
            // #endif
            resolve(customBar)
          }
        })
      })
      let statusBar = await promise
      // statusBar = 0
      let popupsDom = uni.createSelectorQuery().in(this).select('.popups')
      popupsDom
        .boundingClientRect((data) => {
          console.log(data, 8888)
          let width = data.width
          let height = data.height
          let y = this.dynamic
            ? this.dynamicGetY(this.y, this.gap)
            : this.transformRpx(this.y)

          let x = this.dynamic
            ? this.dynamicGetX(this.x, this.gap)
            : this.transformRpx(this.x)

          // #ifdef H5
          y = this.dynamic
            ? this.y + statusBar
            : this.transformRpx(this.y + statusBar)
          // #endif
          this.dynPlace =
            this.placement === 'default'
              ? this.getPlacement(x, y)
              : this.placement
          console.log(x, width)
          switch (this.dynPlace) {
            case 'top-start':
              this.popupsTop = `${y + 9}px`
              this.popupsLeft = `${x - 15}px`
              break
            case 'top-end':
              this.popupsTop = `${y + 9}px`
              this.popupsLeft = `${x + 15 - width}px`
              break
            case 'bottom-start':
              this.popupsTop = `${y - 18 - height}px`
              this.popupsLeft = `${x - 15}px`
              break
            case 'bottom-end':
              this.popupsTop = `${y - 9 - height}px`
              this.popupsLeft = `${x + 15 - width}px`
              break
          }
        })
        .exec()
    },
    getPlacement(x, y) {
      let width = uni.getSystemInfoSync().windowWidth
      let height = uni.getSystemInfoSync().windowHeight
      console.log(x, width * 0.5)
      if (x > width * 0.5 && y > height * 0.5) {
        return 'bottom-end'
      } else if (x < width * 0.5 && y < height * 0.5) {
        return 'top-start'
      } else if (x > width * 0.5 && y < height * 0.5) {
        return 'top-end'
      } else if (x < width * 0.5 && y > height * 0.5) {
        return 'bottom-start'
      } else if (x > width * 0.5) {
        return 'top-end'
      } else {
        return 'top-start'
      }
    },
    dynamicGetY(y, gap) {
      let height = uni.getSystemInfoSync().windowHeight

      y = y < gap ? gap : y
      y = height - y < gap ? height - gap : y

      return y
    },
    dynamicGetX(x, gap) {
      let width = uni.getSystemInfoSync().windowWidth
      x = x < gap ? gap : x
      x = width - x < gap ? width - gap : x
      return x
    },
    transformRpx(params) {
      return params
      // return params*uni.getSystemInfoSync().screenWidth/375
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) this.popupsPosition()
        if (!this.dynamic) {
          this.show = newVal
        } else {
          setTimeout(() => {
            this.show = newVal
          }, 100)
        }
      }
    },
    placement: {
      immediate: true,
      handler(newVal, oldVal) {
        this.dynPlace = newVal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  transition: background 0.3s ease-in-out;
  visibility: hidden;

  &.mask-show {
    visibility: visible;
  }
}
.popups {
  position: absolute;
  padding: 1.5px 5px;
  border-radius: 5px;
  display: flex;
  view {
    padding: 5px;
  }
  image {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}

.dark {
  background-color: #000;
  color: #fff;
  font-size: 12px;
  .top-start:after {
    content: '';
    position: absolute;
    top: -18rpx;
    left: 5px;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent #000;
  }
  .top-end:after {
    content: '';
    position: absolute;
    top: -18rpx;
    right: 5px;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent #000;
  }
  .bottom-start:after {
    content: '';
    position: absolute;
    bottom: -18rpx;
    left: 5px;
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: #000 transparent transparent;
  }
  .bottom-end:after {
    content: '';
    position: absolute;
    bottom: -18rpx;
    right: 5px;
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: #000 transparent transparent;
  }
  .disabledColor {
    color: #c5c8ce;
  }
}
.light {
  color: #515a6e;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  background: #fff;
  .top-start:after {
    content: '';
    position: absolute;
    top: -18rpx;
    left: 5px;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent #fff;
  }
  .top-end:after {
    content: '';
    position: absolute;
    top: -18rpx;
    right: 5px;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent #fff;
  }
  .bottom-start:after {
    content: '';
    position: absolute;
    bottom: -18rpx;
    left: 5px;
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: #fff transparent transparent;
  }
  .bottom-end:after {
    content: '';
    position: absolute;
    bottom: -9px;
    right: 5px;
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: #fff transparent transparent;
  }
  .disabledColor {
    color: #c5c8ce;
  }
}
.solid-bottom {
  border-bottom: 1px solid #ccc;
}
.solid-right {
  border-right: 1px solid #ccc;
}
.popups .itemChild:last-child {
  border: none;
}
</style>
