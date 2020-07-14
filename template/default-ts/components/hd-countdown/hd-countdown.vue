<template>
  <view class="hd-countdown">
    <view
      v-if="showDay"
      class="hd-countdown__number"
      :style="{borderColor:borderColor, color:color, background:backgroundColor}"
    >{{ d }}</view>
    <view v-if="showDay" class="hd-countdown__splitor" :style="{color:splitorColor}">天</view>
    <view
      class="hd-countdown__number"
      :style="{borderColor:borderColor, color:color, background:backgroundColor}"
    >{{ h }}</view>
    <view class="hd-countdown__splitor" :style="{color:splitorColor}">{{ showColon ? ':' : '时' }}</view>
    <view
      class="hd-countdown__number"
      :style="{borderColor:borderColor, color:color, background:backgroundColor}"
    >{{ i }}</view>
    <view class="hd-countdown__splitor" :style="{color:splitorColor}">{{ showColon ? ':' : '分' }}</view>
    <view
      class="hd-countdown__number"
      :style="{borderColor:borderColor, color:color, background:backgroundColor}"
    >{{ s }}</view>
    <view v-if="!showColon" class="hd-countdown__splitor" :style="{color:splitorColor}">秒</view>
  </view>
</template>
<script>
export default {
  name: 'hd-countdown',
  props: {
    showDay: {
      type: Boolean,
      default: true
    },
    showColon: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    borderColor: {
      type: String,
      default: '#000000'
    },
    color: {
      type: String,
      default: '#000000'
    },
    splitorColor: {
      type: String,
      default: '#FFFFFF'
    },
    day: {
      type: Number,
      default: 0
    },
    hour: {
      type: Number,
      default: 0
    },
    minute: {
      type: Number,
      default: 0
    },
    second: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timer: null,
      d: '00',
      h: '00',
      i: '00',
      s: '00',
      leftTime: 0,
      seconds: 0
    }
  },
  watch: {},
  created: function(e) {
    this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second)
    this.countDown()
    this.timer = setInterval(() => {
      this.seconds--
      if (this.seconds < 0) {
        this.timeUp()
        return
      }
      this.countDown()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    toSeconds(day, hours, minutes, seconds) {
      return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
    },
    timeUp() {
      clearInterval(this.timer)
      this.$emit('timeup')
    },
    countDown() {
      let seconds = this.seconds
      let [day, hour, minute, second] = [0, 0, 0, 0]
      if (seconds > 0) {
        day = Math.floor(seconds / (60 * 60 * 24))
        hour = Math.floor(seconds / (60 * 60)) - day * 24
        minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60
        second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
      } else {
        this.timeUp()
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      this.d = day
      this.h = hour
      this.i = minute
      this.s = second
    }
  }
}
</script>
<style scoped>
.hd-countdown {
  padding: 1px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.hd-countdown__splitor {
  justify-content: center;
  line-height: 20px;
  padding: 0 0;
  font-size: 12px;
  box-sizing: border-box;
}

.hd-countdown__number {
  line-height: 20px;
  justify-content: center;
  height: 20px;
  border-radius: 50%;
  margin: 0 2.5px;
  font-size: 12px;
  padding: 0 5px;
  box-sizing: border-box;
}
</style>