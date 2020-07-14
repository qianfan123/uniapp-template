<template>
  <view>{{ test }}</view>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    let test: string = '呵呵'
    return {
      test
    }
  },
  props: {
    dataArr: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {},
  computed: {},
  mounted() {},
  watch: {
    dataArr: {
      handler(newValue, oldValue) {},
      deep: true,
      immediate: true
    }
  },
  onLoad() {},
  methods: {}
})
</script>

<style></style>
