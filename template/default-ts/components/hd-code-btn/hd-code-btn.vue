<!-- 验证码按钮组件 -->
<template>
  <view class="code-btn-wrapper">
    <button
      class="codeBtn"
      :style="{ 'opacity': seconds <= 0 ? '1' : '0.5', background: backgroundColor, color: color, borderColor: borderColor }"
      @click="codeBtnClick"
    >{{ btnTitle }}</button>
  </view>
</template>

<script>
export default {
  name: 'hd-code-btn',
  props: {
    // 验证码倒计时秒数
    second: {
      type: Number,
      default: 60
    },
    backgroundColor: {
      type: String,
      default: '#FFF'
    },
    color: {
      type: String,
      default: '#000'
    },
    borderColor: {
      type: String,
      default: '#000'
    },
    /// 是否自动开启倒计时
    autoCountDown: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: null,
      seconds: 0,
      btnTitle: '获取验证码'
    }
  },
  computed: {},

  watch: {
    second(newValue, oldValue) {
      console.log(newValue, this.autoCountDown)
      if (this.autoCountDown) {
        this.codeBtnClick()
      }
    }
  },

  created() {
    if (this.autoCountDown) {
      this.codeBtnClick()
    }
  },

  beforeDestroy() {
    // 清除定时器
    clearInterval(this.timer)
  },

  methods: {
    // 验证码按钮点击事件
    codeBtnClick() {
      if (this.seconds > 0) {
        console.log('不可点击')
        return
      }

      this.$emit('onClick')

      this.seconds = this.second
      this.countDown()
      this.timer = setInterval(() => {
        this.seconds--
        this.countDown()
      }, 1000)
    },

    // 开始倒计时
    countDown() {
      if (this.seconds <= 0) {
        this.timeUp()
      } else {
        this.btnTitle = this.seconds + '秒后重新获取'
      }
    },

    // 倒计时结束
    timeUp() {
      this.btnTitle = '获取验证码'
      clearInterval(this.timer)
      this.$emit('timeup')
    }
  }
}
</script>

<style scoped>
.code-btn-wrapper {
  display: inline-block;
}
.code-btn-wrapper .codeBtn {
  background-color: #fff;
  color: #000;
  font-size: 12px;
  text-align: center;
  border-radius: 12px;
  border: 0.5px solid #000;
  line-height: 24px;
  height: 24px;
  padding: 0 8px;
}
</style>
