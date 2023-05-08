import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '~/router/const'

const relationRouter: Array<RouteRecordRaw> = [
  {
    path: '/relation',
    component: LAYOUT,
    name: 'Relation',
    // redirect: '/relation/directive', //面包屑跳转路由
    meta: {
      title: '客户关系',
      icon: '#iconquanxian',
      alwaysShow: true
    },
    children: [
      {
        path: 'customer',
        component: () => import('~/views/relation/customer/index.vue'),
        name: 'relationCustomer',
        meta: {
          tagName: 'relationCustomer',
          title: '客户信息',
          icon: '#iconquanxian'
        }
      },
      {
        path: '/relation/customer/create',
        component: () => import('~/views/relation/customer/edit.vue'),
        name: 'relationCustomerCreate',
        meta: {
          tagName: 'relationCustomer',
          title: '客户信息',
          activeMenu: '/relation/customer/',
          hidden: true
        }
      },
      {
        path: 'customer/update',
        component: () => import('~/views/relation/customer/edit.vue'),
        name: 'relationCustomerUpdate',
        meta: {
          tagName: 'relationCustomer',
          title: '客户信息',
          activeMenu: '/relation/customer/',
          hidden: true
        }
      },
      {
        path: 'customer/show',
        component: () => import('~/views/relation/customer/show.vue'),
        name: 'relationCustomerShow',
        meta: {
          tagName: 'relationCustomer',
          title: '客户信息',
          activeMenu: '/relation/customer/',
          hidden: true
        }
      }

    ]
  }
]
export default relationRouter
