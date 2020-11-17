import Vue from 'vue'
import Router from 'vue-router'
// 引入仓库
import store from '../store'

Vue.use(Router)
// 定义变量保存二级路由
// 在二级路由上添加路由守卫
function hasUrl(url) {
  return store.state.userInfo.menus_url.some(item => item == url);
}
export let indexRouters = [{
    path: '/menu',
    component: () => import('../views/menu/menu'),
    name: '菜单列表',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/menu') ? next() : next('/home');
    }
  },
  {
    path: '/role',
    component: () => import('../views/role/role'),
    name: '角色列表',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/role') ? next() : next('/home');
    }
  },
  {
    path: '/user',
    component: () => import('../views/user/user'),
    name: '用户列表',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/user') ? next() : next('/home');
    }
  },
  {
    path: '/cate',
    component: () => import('../views/cate/cate'),
    name: '商品分类',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/cate') ? next() : next('/home');
    }
  },
  {
    path: '/specs',
    component: () => import('../views/specs/specs'),
    name: '商品规格',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/specs') ? next() : next('/home');
    }
  },
  {
    path: '/goods',
    component: () => import('../views/goods/goods'),
    name: '商品管理',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/goods') ? next() : next('/home');
    }
  },
  {
    path: '/member',
    component: () => import('../views/member/member'),
    name: '会员管理',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/member') ? next() : next('/home');
    }
  },
  {
    path: '/banner',
    component: () => import('../views/banner/banner'),
    name: '轮播图管理',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/banner') ? next() : next('/home');
    }
  },
  {
    path: '/seck',
    component: () => import('../views/seck/seck'),
    name: '限时秒杀管理',
    // 调用路由独享守卫
    beforeEnter(to, from, next) {
      hasUrl('/seck') ? next() : next('/home');
    }
  },
];

const router = new Router({
  routes: [{
      path: "/index",
      component: () => import('../pages/index.vue'),
      children: [
        ...indexRouters,
        {
          path: '/home',
          component: () => import('../views/home')
        }
      ]
    },
    {
      path: "/login",
      component: () => import('../pages/login.vue')
    },
    // 重定向
    {
      path: "*",
      redirect: '/login'
    }
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return;
  }
  if (sessionStorage.getItem('userInfo')) {
    next();
    return;
  }
  next('/login');
})

// 导出路由
export default router
