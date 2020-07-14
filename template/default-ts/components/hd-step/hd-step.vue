<template>
  <view class="hd-step-wrapper">
    <view class="progress-item-wrapper" v-for="(item, index) in dataSourceArr" :key="index">
      <view style="align-items: flex-end;display: flex;flex-direction: column;flex-shrink: 0;">
        <text class="date" :style="{color: index == 0 ? '#535050':'#A8A8B6'}">{{ item[dateKey] }}</text>
        <text class="timer-h">{{ item[timeKey] }}</text>
      </view>
      <view class="middle-wrapper">
        <view class="icon-wrapper">
          <text
            v-if="index == 0"
            class="hdIcon-check-circle"
            style="color: #0065FF;font-size: 17px;"
          ></text>
          <text v-if="index != 0" class="hdIcon-check-circle" style="color: #CCC;font-size: 17px;"></text>
        </view>
        <view class="line-wrapper" v-if="index != dataSourceArr.length - 1"></view>
      </view>
      <view style="display: flex;flex-direction: column;margin-left: 12px;">
        <text
          class="state-title"
          :style="{color: index == 0 ? '#535050':'#A8A8B6'}"
        >{{ item[titleKey] }}</text>
        <text
          class="sub-title"
          :style="{color: index == 0 ? '#535050':'#A8A8B6'}"
        >{{ item[subtitleKey] }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  name: 'hd-step',
  computed: {},
  props: {
    dataSourceArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    dateKey: {
      type: String,
      default: 'date'
    },
    timeKey: {
      type: String,
      default: 'time'
    },
    titleKey: {
      type: String,
      default: 'title'
    },
    subtitleKey: {
      type: String,
      default: 'subtitle'
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
.hd-step-wrapper .progress-item-wrapper {
  width: 100%;
  padding-left: 12px;
  align-items: flex-start;
  display: flex;
}
.hd-step-wrapper .progress-item-wrapper .date {
  height: 15px;
  font-size: 12px;
  font-family: Helvetica;
  color: rgba(83, 80, 80, 1);
  line-height: 15px;
}
.hd-step-wrapper .progress-item-wrapper .timer-h {
  height: 12px;
  font-size: 10px;
  font-family: Helvetica;
  color: rgba(168, 168, 182, 1);
  line-height: 12px;
}
.hd-step-wrapper .progress-item-wrapper .middle-wrapper {
  min-height: 72px;
  align-items: center;
  justify-content: flex-start;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
}
.hd-step-wrapper .progress-item-wrapper .middle-wrapper .icon-wrapper {
  background-color: rgba(247, 248, 250, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 50%;
  width: 21px;
  height: 21px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.hd-step-wrapper .progress-item-wrapper .middle-wrapper .line-wrapper {
  width: 1px;
  background-color: rgba(229, 229, 229, 1);
  flex-grow: 1;
}
.hd-step-wrapper .progress-item-wrapper .state-title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(83, 80, 80, 1);
  line-height: 20px;
}
.hd-step-wrapper .progress-item-wrapper .sub-title {
  font-size: 12px;
  font-weight: 400;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: pre-line;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
