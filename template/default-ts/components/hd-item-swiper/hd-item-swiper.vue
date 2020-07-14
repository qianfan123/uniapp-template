<template>
  <view class="swipe" @click.stop="onClick">
    <view class="li" :class="{show_delete:moved,show_confirm: showConfirm}">
      <view class="content" @touchstart="touchStart" @touchend="touchEnd">
        <slot />
      </view>
      <div class="del" @click.stop="onDelete" v-if="!showConfirm">
        <div class="delete_">删除</div>
      </div>
      <div class="del confirm" @click.stop="onDeleteConfirm" v-if="showConfirm">
        <div style="height:100%;" class="flex_center_column width_100">确认删除</div>
      </div>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'hd-item-swiper',
  components: {}
})

export default class Index extends Vue {
  clientNum: any = {} // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
  // canEmit = false;
  moved = false
  showConfirm = false

  onClick() {
    if (this.moved) {
      this.moved = false
    }
  }
  /**
   * 删除item
   * index是下标
   */
  onDelete() {
    this.showConfirm = true
  }
  onDeleteConfirm() {
    this.moved = false
    this.showConfirm = false
    this.$emit('onDelete')
  }
  touchStart(event: any) {
    // 判断如果点击区域在删除按钮内，不做动作
    if (event.changedTouches.length === 0) {
      return
    }
    let touchs = event.changedTouches[0]
    // 记录开始滑动的鼠标位置
    this.clientNum.x1 = touchs.pageX
    this.moved = false
    this.showConfirm = false
  }
  touchEnd(event: any) {
    if (event.changedTouches.length === 0) {
      return
    }
    let touchs = event.changedTouches[0]
    // 记录结束滑动的鼠标位置
    this.clientNum.x2 = touchs.pageX
    this.moved = false
    this.showConfirm = false
    // 判断滑动距离大于50，判定为滑动成功，否则失败
    if (this.clientNum.x2 < this.clientNum.x1 && Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50) {
      event.preventDefault()
      this.moved = true
    } else if (
      this.clientNum.x2 > this.clientNum.x1 &&
      Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
    ) {
      event.preventDefault()
      this.moved = false
      this.showConfirm = false
    }
  }
}
</script>

<style scoped lang="scss">
.swipe {
  overflow-x: hidden;
  width: 100%;
  text-overflow: ellipsis;

  .li {
    position: relative;
    padding-left: 10px;
    line-height: 40px;
    background: #fdfdfd;
    border-bottom: 1px solid #e1e1e1;
    transform: translateX(0);
    transition: all 0.3s; /*滑动效果更生动*/
  }
  .delete_ {
    font-size: 16px;
    color: white;
  }
  .show_delete {
    transform: translateX(-86px); /*滑动后x轴位移-86px,使其可见*/
  }
  .show_confirm {
    transform: translateX(-104px); /*滑动后x轴位移-86px,使其可见*/
  }
  .del {
    position: absolute;
    top: 0;
    right: -1px;
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 86px;
    height: 100%;
    color: #fff;
    text-align: center;
    background-color: #fc2c4a;
    transform: translateX(86px); /*默认x轴位移86px，使其隐藏*/
  }
  .del.confirm {
    width: 104px;
    transform: translateX(104px); /*默认x轴位移104px，使其隐藏*/
  }
  .content {
    width: 100%;
    height: 100%;
  }
}
</style>
