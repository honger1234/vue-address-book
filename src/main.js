import Vue from 'vue'
import App from './App.vue'
import '@/assets/styles/border.css'
import '@/assets/styles/reset.css'
import router from './router'//相当于import router from './router/index.js'
import '@/assets/styles/iconfont.css'//
// import '//at.alicdn.com/t/font_2018600_z02o6morqi.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  components:{
        App  //在 index.html页面不使用这个组件，就会返回 We're sorry but demo3 doesn't work properly without JavaScript enabled. Please enable it to continue.
       },
  router
}).$mount('#app')
