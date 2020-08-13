import Vue from 'vue'
import App from './App.vue'
import '@/assets/styles/border.css'
import '@/assets/styles/reset.css'
import router from './router'//相当于import router from './router/index.js'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
