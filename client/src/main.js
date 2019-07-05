import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLodash from 'vue-lodash'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueLodash,
  render: h => h(App)
}).$mount('#app')
