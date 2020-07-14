import Vue from 'vue'
import App from './App.vue'
import initToast from '@/components/hd-toast/init.js'
import initLoading from '@/components/hd-loading/init.js'
import HDButton from '@/components/hd-button/hd-button.vue'
initToast(Vue)
initLoading(Vue)

Vue.component('hd-button', HDButton)

Vue.config.productionTip = false

new App().$mount()
