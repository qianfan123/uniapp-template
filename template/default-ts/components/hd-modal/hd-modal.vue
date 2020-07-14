<template>
  <view class="_showModal" v-show="show">
    <view class="_shade"></view>
    <view class="_modalBox" @touchmove.stop.prevent="">
      <view class="_modal">
        <slot name="title">
          <view class="title" v-show="title">{{ title }}</view>
        </slot>
        <slot name="content">
          <view class="_content">
            {{ content }}
          </view>
        </slot>
        <slot name="btn">
          <view class="btnbox">
            <view
              class="cancel btn"
              v-show="showCancel"
              :style="cancelColor"
              @click.stop="clickBtn('cancel')"
            >
              {{ cancelText }}
            </view>
            <view
              class="confirm btn"
              :style="confirmColor"
              @click.stop="clickBtn('confirm')"
            >
              {{ confirmText }}
            </view>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'hd-modal',
  computed: {
    show() {
      return this.$modalStore.state.show
    },
    title() {
      return this.$modalStore.state.title
    },
    content() {
      return this.$modalStore.state.content
    },
    showCancel() {
      return this.$modalStore.state.showCancel
    },
    cancelText() {
      return this.$modalStore.state.cancelText
    },
    cancelColor() {
      return 'color:' + this.$modalStore.state.cancelColor
    },
    confirmText() {
      return this.$modalStore.state.confirmText
    },
    confirmColor() {
      return 'color:' + this.$modalStore.state.confirmColor
    }
  },
  methods: {
    closeModal() {
      this.$modalStore.commit('hideModal')
    },
    clickBtn(res) {
      this.$modalStore.commit('hideModal')
      this.$modalStore.commit('success', res)
    }
  },
  beforeDestroy() {
    this.$modalStore.commit('hideModal')
  }
}
</script>

<style lang="scss" scoped>
._showModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  ._shade {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.6;
    z-index: 11000;
  }
  ._modalBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12000;
    display: flex;
    justify-content: center;
    align-items: center;
    ._modal {
      flex: none;
      width: 70%;
      // min-height:200upx;
      background: #fff;
      border-radius: 10upx;
      box-sizing: border-box;
      padding-top: 40rpx;
      .title {
        color: #282c34;
        height: 40rpx;
        text-align: center;
        font-weight: 500;
        font-size: 36rpx;
        line-height: 36rpx;
        // border-bottom: 1upx solid #e1e1e1;
      }
      ._content {
        padding: 30rpx;
        text-align: center;
        font-size: 30rpx;
        font-weight: 400;
        color: rgba(88, 90, 94, 1);
        line-height: 44rpx;
      }
      .btnbox {
        display: flex;
        .btn {
          width: 50%;
          font-size: 30upx;
          text-align: center;
          flex: auto;
          line-height: 80upx;
          border-top: 1upx solid #e1e1e1;
          border-right: 1upx solid #e1e1e1;
        }
        .btn:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
