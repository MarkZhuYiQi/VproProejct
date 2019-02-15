import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
// import Layout from '../views/layout/Layout'
import Index from '@/views/home/index.vue'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Index,
    redirect: '/home',
    name: 'Index',
    meta: { title: 'Index' },
    children: [
      {
        path: 'home',
        component: _import('home/home'),
        name: 'home',
        meta: { title: 'home' }
      },
      {
        path: 'login',
        component: _import('login/login'),
        name: 'login',
        meta: { title: 'login' }
      },
      {
        path: 'index/:nav',
        component: _import('home/home'),
        name: 'index',
        meta: { title: 'index' }
      },
      {
        path: 'personal',
        component: _import('personal/personal'),
        name: 'personal',
        meta: { title: 'personal', auth: true }
      },
      {
        path: 'detail/:courseId',
        component: _import('detail/detail'),
        name: 'detail',
        meta: { title: 'detail' }
      },
      {
        path: 'cart',
        component: _import('cart/cart'),
        name: 'cart',
        meta: { auth: true, title: 'cart' }
      },
      {
        path: 'settle',
        component: _import('settle/settle'),
        name: 'settle',
        meta: { auth: true }
      },
      {
        path: 'category/:nav',
        component: _import('category/category'),
        name: 'category',
        meta: { title: 'category' }
      },
      {
        path: 'orders',
        component: _import('orders/orders'),
        name: 'orders',
        meta: { auth: true, title: 'orders' }
      },
      {
        path: 'play',
        // component: _import('play/play'),
        component: () => import('@/views/play/play.vue'),
        name: 'play',
        meta: { auth: true, title: 'play' }
      },
      {
        path: 'message',
        redirect: '/home',
        name: 'message',
        meta: { title: 'Message', auth: true }
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

