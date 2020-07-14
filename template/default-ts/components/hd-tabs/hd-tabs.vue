<template>
  <view class="hd-tabs" v-if="ddHack" @touchmove.prevent>
    <scroll-view
      scroll-x="true"
      scroll-with-animation
      :scroll-left="tabsScrollLeft"
      @scroll="scroll"
      class="hd-tabs--wrap"
      @touchmove.prevent
    >
      <view class="hd-tab" :id="tabId + 'tab_list'" @touchmove.prevent>
        <view
          v-for="(item, index) in tabList"
          :key="index"
          :class="[
            'hd-tab-item',
            { 'hd-tab-item--active': currentIndex === index }
          ]"
          :style="{ color: currentIndex === index ? `${activeColor}` : '' }"
          :id="tabId + 'tab_item'"
          @click="select(item, index)"
          @touchmove.prevent
        >
          {{ item.title }}
        </view>
      </view>
      <view class="hd-tab-line-wrap">
        <view
          class="hd-tab-line"
          :style="{
            background: lineColor,
            width: lineStyle.width,
            transform: lineStyle.transform,
            transitionDuration: lineStyle.transitionDuration
          }"
        ></view>
      </view>
    </scroll-view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'hd-tabs',
  props: {
    value: {
      type: [Number, String],
      default: function () {
        return 0
      }
    }, // 选中项
    activeColor: {
      type: String,
      default: ''
    }, // tab选中颜色
    lineColor: {
      type: String,
      default: ''
    }, // 下划线选中颜色
    lineAnimated: {
      // 是否展示下划线动画
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      $tabs: this
    }
  },
  data() {
    return {
      currentIndex: 0, // 当前选中项
      lineStyle: {},
      scrollLeft: 0,
      tabList: [], // tab项
      tabContextList: [], // tab对应组件
      tabsScrollLeft: 0,
      duration: 0.3,
      tabId: '',
      ddHack: false // 解决钉钉provide/inject报错的bug
    }
  },
  watch: {
    tabList() {
      this.setTabList()
    },
    value() {
      this.currentIndex = this.value
      this.setTabList()
    }
  },
  created() {
    // 适配钉钉
    // #ifdef MP-DINGTALK
    this.tabId = this.s4()
    // #endif
  },
  mounted() {
    this.ddHack = true
    this.currentIndex = this.value
    this.setTabList()
    if (!this.lineAnimated) {
      this.duration = 0
    }
  },
  methods: {
    s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    },
    select(item, index) {
      this.$emit('input', index)
    },
    setTabList() {
      this.$nextTick(() => {
        if (this.tabList.length > 0) {
          this.setLine()
          this.scrollIntoView()
        }
      })
    },
    setLine() {
      let lineWidth = 0
      let lineLeft = 0
      this.getElementData(`#${this.tabId}tab_item`, (data) => {
        let el = data[this.currentIndex]
        lineWidth = el.width / 2
        // lineLeft = el.width * (this.currentIndex + 0.5)  // 此种只能针对每个item长度一致的
        lineLeft = el.width / 2 + -data[0].left + el.left
        this.lineStyle = {
          width: `${lineWidth}px`,
          transform: `translateX(${lineLeft}px) translateX(-50%)`,
          transitionDuration: `${this.duration}s`
        }
      })
    },
    scrollIntoView() {
      // item滚动
      let lineLeft = 0
      this.getElementData(`#${this.tabId}tab_list`, (data) => {
        let list = data[0]
        this.getElementData(`#${this.tabId}tab_item`, (data) => {
          let el = data[this.currentIndex]
          // lineLeft = el.width * (this.currentIndex + 0.5) - list.width / 2 - this.scrollLeft
          lineLeft =
            el.width / 2 +
            -list.left +
            el.left -
            list.width / 2 -
            this.scrollLeft
          this.tabsScrollLeft = this.scrollLeft + lineLeft
        })
      })
    },
    getElementData(el, callback) {
      uni
        .createSelectorQuery()
        .in(this)
        .selectAll(el)
        .boundingClientRect()
        .exec((data) => {
          callback(data[0])
        })
    },
    scroll(e) {
      this.scrollLeft = e.detail.scrollLeft
    }
  }
}
</script>

<style lang="scss">
.hd-tabs {
  position: relative;
  background: #fff;
  .hd-tabs--wrap {
    position: relative;
    .hd-tab {
      position: relative;
      display: flex;
      font-size: 28rpx;
      white-space: nowrap;
      &-item {
        flex: 1;
        min-width: 22%;
        box-sizing: border-box;
        padding: 0 10rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 88rpx;
        font-size: 28rpx;
        color: #65686f;
        &--active {
          font-size: 32rpx;
          color: #32353a;
        }
      }
    }
    .hd-tab-line-wrap {
      width: 100%;
      position: relative;
      .hd-tab-line {
        display: block;
        height: 6rpx;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(-50%);
        z-index: 1;
        border-radius: 3rpx;
        background: linear-gradient(
          135deg,
          rgba(51, 145, 255, 1) 0%,
          rgba(28, 100, 253, 1) 100%
        );
      }
    }
  }
  .hd-tabs--wrap::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 2rpx solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
