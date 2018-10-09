// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'         // 2.6.0+版本需要手动添加
Vue.use(VueAwesomeSwiper)

import {get, post, upload, baseUrl} from './config/api'
import {setCookie, getCookie, clearCookie} from './config/util'
import Util from './config/util'

Vue.use(Util)

Vue.prototype.$setCookie = setCookie
Vue.prototype.$getCookie = getCookie
Vue.prototype.$clearCookie = clearCookie

Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$upload = upload

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
