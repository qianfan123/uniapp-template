<template>
  <view>
    <slot v-if="showContent"></slot>
  </view>
</template>

<script>
export default {
  name: 'hd-tab',
  inject: ['$tabs'],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    // 是否展示
    showContent() {
      if (this.$tabs.tabList[this.$tabs.currentIndex]) {
        return this._uid === this.$tabs.tabList[this.$tabs.currentIndex].uid
      } else {
        return false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // #ifdef MP-ALIPAY
      this.$tabs.tabList = [{ title: this.title, uid: this._uid }].concat(
        this.$tabs.tabList
      )
      // #endif
      // #ifndef MP-ALIPAY
      this.$tabs.tabList = this.$tabs.tabList.concat([
        { title: this.title, uid: this._uid }
      ])
      // #endif
    })
  }
}
</script>

<style lang="scss" scoped></style>
