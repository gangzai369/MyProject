// 引入核心库
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 调用vuex插件
Vue.use(Vuex)
// 引入封装好的module模块
import menu from './modules/menu' //菜单管理
import role from './modules/role' //角色管理
import user from './modules/user' //管理员管理
import cate from './modules/cate' //商品分类管理
import specs from './modules/specs' //商品规格管理
import goods from './modules/goods' //商品管理
import banner from './modules/banner' //轮播图管理
import member from './modules/member' //会员管理
import seck from './modules/seck' //秒杀管理

// 导出实例化的store仓库
export default new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : []
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    }
  },
  mutations: {
    REQ_USERLOGIN(state, payload) {
      state.userInfo = payload;
      if(payload){
        sessionStorage.setItem('userInfo',JSON.stringify(payload))
      }else{
        sessionStorage.removeItem('userInfo');
      }
    }
  },
  actions: {
    getUserLoginAction({
      commit
    }, payload) {
      commit('REQ_USERLOGIN', payload)
    }
  },
  modules: {
    menu,
    role,
    user,
    cate,
    specs,
    goods,
    banner,
    member,
    seck
  }
})
