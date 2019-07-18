import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

import { store } from './store/store'
import Accounting from 'accounting-js'

Vue.filter('currency', (val) => {
  return Accounting.formatNumber(val)
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
