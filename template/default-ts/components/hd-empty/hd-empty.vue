<template>
  <view class="empty-wrapper" :style="{'padding-top': marginTop}">
    <image v-if="img.length > 0" :src="img" mode="widthFix" />
    <text v-if="title.length > 0" class="title">{{ title }}</text>
    <text @click="clickSubtitle" v-if="subtitle.length > 0" class="subtitle">{{ subtitle }}</text>
    <view>
      <slot name="action"></slot>
    </view>
  </view>
</template>

<script>
import { defImg } from './img.js'
export default {
  name: 'hd-empty',
  props: {
    img: {
      type: String,
      default: defImg
    },
    title: {
      type: String,
      default: '暂无数据'
    },
    subtitle: {
      type: String,
      default: ''
    },
    marginTop: {
      type: String,
      default: '100px'
    }
  },
  computed: {},
  methods: {
    clickSubtitle() {
      this.$emit('titleClick')
    }
  }
}
</script>

<style scoped>
.empty-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.empty-wrapper .title {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(168, 168, 182, 1);
  line-height: 20px;
  margin-top: 6px;
}
.empty-wrapper image {
  width: calc(50%);
}
.empty-wrapper .subtitle {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(83, 80, 80, 1);
  line-height: 20px;
  margin-top: 6px;
}
</style>
