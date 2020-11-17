// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 全局引入重置样式表
import './assets/css/reset.css'
// 全局引入element-ui
import ElementUI from 'element-ui'
// 全局引入element-UIcss样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入面包屑
import elBread from "../src/components/el-bread";
// 面包屑升级为全局组件
Vue.component('elBread',elBread)
// 全局调用插件
Vue.use(ElementUI);
//给vue原型挂载一个服务器地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

Vue.config.productionTip = false
// 导入store核心库
import store from './store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
