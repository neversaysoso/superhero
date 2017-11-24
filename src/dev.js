import Vue from 'vue'
import FastClick from 'fastclick'
import 'vux/src/styles/reset.less';
import "@/assets/sass/style.scss"

FastClick.attach(document.body)
Vue.config.productionTip = false

import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Hello'
Vue.use(VueRouter)
const routes = [{
  path: '/',
  component: Home
}]
const router = new VueRouter({
  routes
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')