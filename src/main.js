import Vue from 'vue'
import FastClick from 'fastclick'
import 'vux/src/styles/reset.less';
import "@/assets/sass/style.scss"

FastClick.attach(document.body)
Vue.config.productionTip = false

import ThMessage from './components/message'
import ThDoctortitlebar from './components/doctortitlebar'

const components = {
  ThMessage,
  ThDoctortitlebar
}

const install = function (Vue) {
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  ThMessage,
  ThDoctortitlebar,
  install
}


// import VueRouter from 'vue-router'
// import App from './App'
// import Home from './components/Hello'
// Vue.use(VueRouter)
// const routes = [{
//   path: '/',
//   component: Home
// }]
// const router = new VueRouter({
//   routes
// })
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app-box')