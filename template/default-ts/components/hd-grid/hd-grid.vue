<template>
  <view class="hd-grid-wrapper" v-if="row > 0">
    <view v-for="(arr, index2) in dataArr" :key="index2" class="grid-sub">
      <view
        v-for="item in arr"
        :key="item.name"
        class="item"
        :style="getItemStyle"
        @click="_onClick(item)"
      >
        <image :src="item[imageKey]" @error="getErrorImage(item)" class="content-img" />
        <text class="hd-nowrap content-text">{{ item[textKey] }}</text>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'hd-grid',
  props: {
    pictures: {
      type: Array,
      default: function() {
        return []
      }
    },
    column: {
      type: Number,
      default: 5
    },
    imageKey: {
      //  图片映射的键
      type: String,
      default: 'img'
    },
    textKey: {
      //   文字说明映射的键
      type: String,
      default: 'name'
    },
    errorImg: {
      type: String,
      default: ''
    }
  },
  components: {},
  computed: {
    getItemStyle() {
      if (this.column !== null) {
        return `width: calc((100%)/${this.column})`
      }
      return ''
    }
  },
  data() {
    return {
      row: 0,
      dataArr: null
    }
  },

  watch: {
    pictures(newValue, oldValue) {
      if (newValue && newValue.length > 0) {
        this.row =
          newValue.length % this.column === 0
            ? newValue.length / this.column
            : Math.floor(newValue.length / this.column) + 1
        // 将数组拆分成n维数组
        let arr = []
        for (let i = 0; i < this.row; i++) {
          let subarr = []
          let addlength = i === this.row - 1 ? newValue.length : this.column + i * this.column
          subarr = newValue.slice(i * this.column, addlength)
          arr.push(subarr)
        }
        this.dataArr = arr
      }
    }
  },

  mounted() {},
  created() {},
  methods: {
    _onClick(data) {
      this.$emit('itemClick', data)
    },
    getErrorImage(item) {
      item[this.imageKey] = this.errorImg
    }
  }
}
</script>

<style scoped>
.hd-grid-wrapper {
  background-color: white;
  border-radius: 8px;
}
.hd-grid-wrapper .grid-sub {
  width: 100%;
  height: 92px;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-start;
  text-align: center;
}

.hd-grid-wrapper .grid-sub .item {
  height: 92px;
  font-size: 0px;
}

.content-img {
  margin-top: 11px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.content-text {
  display: block;
  margin: 0 auto;
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;
  line-height: 16px;
  height: auto;
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #5c6073;
  margin-top: 3px;
}
</style>
