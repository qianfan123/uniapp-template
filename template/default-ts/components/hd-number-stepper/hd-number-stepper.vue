<template>
  <view class="hd-number-stepper" @click.stop>
    <view @click.stop="_calcValue('minus')" class="hd-numbox__minus">
      <text
        class="hd-numbox--text hdIcon-minus"
        :class="{ 'hd-numbox--disabled': inputValue <= min || disabled }"
      ></text>
    </view>
    <input
      :disabled="disabled"
      @blur="_onBlur"
      @focus="_onFocus"
      class="hd-numbox__value"
      type="number"
      v-model="inputValue"
    />
    <view @click.stop="_calcValue('plus')" class="hd-numbox__plus">
      <text
        class="hd-numbox--text hdIcon-add"
        :class="{ 'hd-numbox--disabled': inputValue >= max || disabled }"
      ></text>
    </view>
  </view>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'hd-number-stepper',
  components: {}
})
export default class Index extends Vue {
  @Prop({ default: 1 })
  value: number = 1
  @Prop({ default: 1 })
  min: number = 1
  @Prop({ default: 100 })
  max: number = 100
  @Prop({ default: 1 })
  step: number = 1
  @Prop({ default: false })
  disabled: boolean = false

  inputValue = '1'
  focus = false
  needEmit = false

  @Watch('value')
  valueChanged(val: string, oldVal: string) {
    this.inputValue = val.toString()
    this.needEmit = false
  }

  @Watch('inputValue')
  inputValueChanged(newVal: string, oldVal: string) {
    // 输入期间 不更新
    // 初始化加载不更新
    if (this.needEmit) {
      if (+newVal !== +oldVal && !this.focus) {
        this.$emit('change', newVal)
      }
    } else {
      this.needEmit = true
    }
  }

  created() {
    this.inputValue = this.value.toString()
  }

  _calcValue(type: any) {
    if (this.disabled) {
      return
    }
    const scale = this._getDecimalScale()
    let value = Number(this.inputValue) * scale
    let step = this.step * scale
    if (type === 'minus') {
      value -= step
      if (value < this.min) {
        return
      }
      if (value > this.max) {
        value = this.max
      }
    } else if (type === 'plus') {
      value += step
      if (value > this.max) {
        return
      }
      if (value < this.min) {
        value = this.min
      }
    }

    this.inputValue = (value / scale).toString()
  }
  _getDecimalScale() {
    let scale = 1
    // 浮点型
    if (~~this.step !== this.step) {
      scale = Math.pow(10, (this.step + '').split('.')[1].length)
    }
    return scale
  }
  _onBlur(event: any) {
    this.focus = false
    let value = event.detail.value
    value = Number(value)
    // 不是数字
    if (!value) {
      this.inputValue = this.min.toString()
      this.$emit('change', this.min)
      return
    }
    // 不是整数倍
    if (value % this.step !== 0) {
      // this.inputValue = this.min;
      value = value - (value % this.step)
      this.inputValue = value
      this.$emit('change', value)
      return
    }
    value = +value
    if (value > this.max) {
      value = this.max
    } else if (value < this.min) {
      value = this.min
    }
    // this.inputValue = value;
    if (value !== this.inputValue) {
      this.$emit('change', value)
    }
  }
  _onFocus() {
    this.focus = true
  }
}
</script>
<style lang="scss" scoped>
// 扩大热区
$box-height: 30px;
$box-width: 30px;

.hd-number-stepper {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 72px;
  height: 22px;
  background-color: #fff;
}

.hd-numbox__value {
  width: 36px;
  height: 18px;
  font-size: 12px;
  text-align: center;
  background-color: #f7f8fa;
}

.hd-numbox__minus {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: $box-width;
  height: $box-height;
  color: $uni-text-color;
  font-size: 12px;
  text-align: center;
}

.hd-numbox__plus {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: $box-width;
  height: $box-height;
}

.hd-numbox--text {
  color: $uni-text-color;
  font-size: 16px;
  font-weight: 500;
}

.hd-numbox--disabled {
  color: $uni-text-color-disable;
}
</style>
