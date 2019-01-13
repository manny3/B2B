// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
//第三方套件

import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'
//自己撰寫的元件

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  //如果requiresAuth為true則維持原畫面，
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證')
    const api = `${process.env.APIPATH}/api/user/check`
    //修改成驗證用路徑
    //this.$http為vue元件使用，目前在router元件底下所以要刪除直接使用axios
    axios.post(api).then(response => {
      console.log(response.data)
      //判斷式，如果驗證帳號還在成功將路徑改至首頁，沒有則維持login頁面
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
