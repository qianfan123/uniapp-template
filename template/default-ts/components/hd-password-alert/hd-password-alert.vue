<template>
  <view>
    <!-- mask层 -->
    <view :class="['mask', show ? '' : 'visible']"></view>
    <!-- 金额 -->
    <view :class="['content', show ? '' : 'visible']">
      <view class="title">
        <view
          class="close"
          @click="close()"
          style="display: flex;align-items: center;justify-content: center"
        >
          <text class="hdIcon-close" style="color: #999;margin-left: 10px;font-size: 24px;"></text>
        </view>
        <view class="center">请输入支付密码</view>
        <view class="close"></view>
      </view>
      <view class="code">
        <view class="code-box">
          <block v-for="(item, index) in 6" :key="index">
            <view class="code-box-item">{{ (password[index] && '●') || '' }}</view>
          </block>
        </view>
        <input type="number" v-model="password" />
      </view>
      <view
        @click="clickPwd"
        style="display: flex;justify-content: flex-end;width: 270px;margin-top: -20px;"
      >
        <text style="font-size: 12px;color: #A8A8B6;">忘记密码？点这里</text>
      </view>
    </view>

    <!-- 键盘 -->
    <view v-if="show" :class="['keyboard', show ? 'active' : '', isIphoneX ? 'isIphone' : '']">
      <block v-for="(item, index) in 9" :key="index">
        <view class="keyboard-item" @tap="key(index + 1)">{{ index + 1 }}</view>
      </block>
      <view class="keyboard-item hide"></view>
      <view class="keyboard-item" @tap="key(0)">
        <text>0</text>
      </view>
      <view class="keyboard-item delte" @tap="del()">
        <text class="img hdIcon-delete-keyboard" style="font-size: 24px;"></text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'hd-password-alert',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isIphoneX: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      password: '',
      trantision: false
    }
  },
  watch: {
    show(newValue, oldValue) {
      this.password = ''
    }
  },
  methods: {
    key(key) {
      if (this.password.length < 6) {
        this.password += key
        if (this.password.length === 6) {
          this.$emit('inputComplete', this.password)
        }
      }
    },
    clear() {
      this.password = ''
    },
    close() {
      this.password = ''
      this.trantision = false
      this.$emit('close', false)
    },
    clickPwd() {
      this.$emit('gotoChangePwd')
    },
    del() {
      if (this.password.length > 0) {
        this.password = this.password.substring(0, this.password.length - 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  display: none;
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  background: rgba(102, 102, 102, 0.3);
  opacity: 1;
  z-index: 2;
  visibility: visible;
}
.content {
  width: 294px;
  height: 180px;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  margin-left: -148px;
  top: 15%;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  z-index: 999;
  opacity: 1;
  visibility: visible;
  transition: all 0.6s ease;
}
.visible {
  opacity: 0;
  z-index: 0;
  visibility: hidden;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 530px;
  font-size: 16px;
}
.center {
  color: #333;
  font-size: 16px;
}
.close {
  width: 25px;
  height: 25px;
}
image {
  width: 100%;
  height: 100%;
}
.pay-money {
  width: 262px;
  height: 120px;
  border-bottom: 0.5px solid #ebebeb;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.pay-money view {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay-way {
  width: 260px;
  height: 43px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8a8a8a;
  font-size: 14px;
}
.money {
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 25px;
}
.money text {
  font-size: 30px;
  margin-left: 5px;
}
.pay-img {
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay-img image {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.code {
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.code-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #d0d0d0;
}
.code-box-item {
  width: 43px;
  height: 43px;
  background: #fff;
  font-size: 20px;
  line-height: 38px;
  text-align: center;
}
.code-box-item:not(:last-child) {
  border-right: 1px solid #d0d0d0;
}
.keyboard {
  position: absolute;
  bottom: -400rpx;
  left: 0;
  width: 100%;
  background: #ebebeb;
  display: flex;
  justify-content: center;
  z-index: 999;
  flex-wrap: wrap;
  transition: all 0.2s ease-in 0.2s;
}
.active {
  bottom: 0px;
}
.keyboard-item {
  box-sizing: border-box;
  width: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-size: 20px;
  color: #333;
  height: 50px;
  border: 0.5px solid #ebebeb;
  border-top: none;
  border-left: none;
}
.hide {
  opacity: 0;
}
.delte {
  background: none;
  box-shadow: none;
}
.isIphone {
  padding-bottom: 34px !important;
}
</style>
