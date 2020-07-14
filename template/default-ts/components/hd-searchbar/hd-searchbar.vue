<template>
  <view class="searchBar">
    <view class="searchBar-content" v-if="disable === false">
      <text class="hdIcon-search" style="margin-left: 8px;color: #C8C7CC;"></text>
      <input
        ref="input"
        v-model="query"
        type="text"
        class="search-input"
        :placeholder-style="placeholderStyle"
        :placeholder="placeText"
        @confirm="beginSearch"
      />
      <view class="close-wrapper" @click.stop="clear">
        <text class="hdIcon-close-circle" style="color: #ddd;" v-show="query"></text>
      </view>
    </view>
    <view class="searchBar-content" v-else @click.stop="clickSearch">
      <text class="hdIcon-search" style="margin-left: 8px;color: #C8C7CC;"></text>
      <input class="search-input" :disabled="true" :placeholder="placeText" />
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'hd-searchbar',
  props: {
    placeText: {
      type: String,
      default: '请输入搜索关键字'
    },
    disable: {
      type: Boolean,
      default: false
    },
    placeholderStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {},
  created() {
    this.$watch(
      'query',
      this.debounce(newQuery => {
        this.$emit('textChange', newQuery)
      }, 300)
    )
  },
  methods: {
    clickSearch() {
      this.$emit('searchClick')
    },
    clear() {
      this.query = ''
    },
    blur() {
      this.$refs.input.blur()
    },
    beginSearch() {
      this.$emit('clickDone', this.query)
    },
    debounce(func, delay) {
      let timer
      return function(...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    }
  }
}
</script>

<style scoped>
.searchBar-content {
  width: 100%;
  min-height: 36px;
  border-radius: 6px;
  display: flex;
  border: solid 1px #eee;
  align-items: center;
}

.search-input {
  flex-grow: 1;
  margin-left: 8px;
  outline: 0;
  font-size: 12px;
  background-color: transparent;
}

.close-wrapper {
  width: 30px;
  height: 36px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
