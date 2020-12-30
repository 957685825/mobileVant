/*
 * @Author: 子君
 * @Date: 2020-06-15 10:34:38
 * @LastEditors: 子君
 * @LastEditTime: 2020-07-17 10:40:48
 * @Description: 文件说明
 * @FilePath: \vue-base\src\router\index.js
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

// 为了首屏加载快，所以首页不使用懒加载
import Home from '../views/home/home'
import Index from '../views/index/index'
import Details from '../views/details/details'
import CalligraphyDetails from '../views/details/calligraphyDetails'
import fontFrom from '../views/details/from'
import Preface from '../views/details/preface'
import Booklist from '../views/books/bookList'
import BookInfo from '../views/books/bookInfo'
import turn from '../views/turn/turn'

const originalPush = VueRouter.prototype.push

// 处理路由跳转会报错的问题
VueRouter.prototype.push = function push(...rest) {
  return originalPush.apply(this, rest).catch(err => err)
}

Vue.use(VueRouter)
// 自动扫描 modules 里面的路由模块，路由模块请根据业务自行拆分
const files = require.context('./modules', false, /\.js$/)

const routes = []
// 获取所有的路由内容
files.keys().forEach(key => {
  const file = files(key).default
  // 根据导出的内容判断是否数组，如果数组需使用扩展运算符
  if (Array.isArray(file)) {
    routes.push(...file)
  } else {
    routes.push(file)
  }
})

routes.push(
  ...[
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      meta: {
        title: '霜满龛红--傅山的生平、思想与学术展'
      }
    },
    {
      path: '/Booklist',
      name: 'Booklist',
      component: Booklist,
      meta: {
        title: '傅山草书文稿'
      }
    },
    {
      path: '/turn',
      name: 'turn',
      component: turn,
      meta: {
        title: '傅山草书文稿'
      }
    },
    {
      path: '/BookInfo',
      name: 'BookInfo',
      component: BookInfo,
      meta: {
        title: '傅山草书文稿'
      }
    },
    {
      path: '/',
      name: 'Details',
      component: Details,
      meta: {
        title: '霜满龛红--傅山的生平、思想与学术展'
      }
    },
    {
      path: '/CalligraphyDetails',
      name: 'CalligraphyDetails',
      component: CalligraphyDetails,
      meta: {
        title: '书法锦集'
      }
    },
    {
      path: '/fontFrom',
      name: 'fontFrom',
      component: fontFrom,
      meta: {
        title: '书法锦集'
      }
    },
    {
      path: '/Preface',
      name: 'Preface',
      component: Preface,
      meta: {
        title: '前言'
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    // 无权限页面
    {
      path: '/no-permission',
      name: 'NoPermission',
      component: () => import('@/views/error-page/no-permission'),
      meta: {
        title: '访问无权限'
      }
    },
    // 404 页面路由
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/error-page/404'),
      meta: {
        title: '页面走丢了'
      }
    }
  ]
)

const router = new VueRouter({
  routes,
  // 页面滚动行为
  scrollBehavior(/* to, from, savedPosition */) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
