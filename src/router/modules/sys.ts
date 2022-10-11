import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/const'

const sysRouter: Array<RouteRecordRaw> = [
  {
    path: '/sys',
    component: LAYOUT,
    name: 'Sys',
    // redirect: '/sys/directive', //面包屑跳转路由
    meta: {
      title: '系统设置',
      icon: '#iconquanxian',
      roles: ['admin', 'editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'role/',
        component: () => import('@/views/sys/role/index.vue'),
        name: 'sysRole',
        meta: {
          tagName: 'sysRole',
          title: '角色管理',
          icon: '#iconquanxian',
          roles: ['admin']
        }
      },
      {
        path: 'role/create',
        component: () => import('@/views/sys/role/edit.vue'),
        name: 'sysRoleCreate',
        meta: {
          tagName: 'sysRole',
          title: '角色管理',
          activeMenu: '/sys/role/',
          hidden: true,
          roles: ['admin']
        }
      },
      {
        path: 'role/update',
        component: () => import('@/views/sys/role/edit.vue'),
        name: 'sysRoleUpdate',
        meta: {
          tagName: 'sysRole',
          title: '角色管理',
          activeMenu: '/sys/role/',
          hidden: true,
          roles: ['admin']
        }
      },
      {
        path: 'role/show',
        component: () => import('@/views/sys/role/show.vue'),
        name: 'sysRoleShow',
        meta: {
          tagName: 'sysRole',
          title: '角色管理',
          activeMenu: '/sys/role/',
          hidden: true,
          roles: ['admin']
        }
      },

      {
        path: 'user/',
        component: () => import('@/views/sys/user/index.vue'),
        name: 'sysUser',
        meta: {
          tagName: 'sysUser',
          title: '用户管理',
          icon: '#iconquanxian',
          users: ['admin']
        }
      },
      {
        path: 'user/create',
        component: () => import('@/views/sys/user/edit.vue'),
        name: 'sysUserCreate',
        meta: {
          tagName: 'sysUser',
          title: '用户管理',
          activeMenu: '/sys/user/',
          hidden: true,
          users: ['admin']
        }
      },
      {
        path: 'user/update',
        component: () => import('@/views/sys/user/edit.vue'),
        name: 'sysUserUpdate',
        meta: {
          tagName: 'sysUser',
          title: '用户管理',
          activeMenu: '/sys/user/',
          hidden: true,
          users: ['admin']
        }
      },
      {
        path: 'user/show',
        component: () => import('@/views/sys/user/show.vue'),
        name: 'sysUserShow',
        meta: {
          tagName: 'sysUser',
          title: '用户管理',
          activeMenu: '/sys/user/',
          hidden: true,
          users: ['admin']
        }
      },
      {
        path: 'menu/',
        component: () => import('@/views/sys/menu/index.vue'),
        name: 'sysMenu',
        meta: {
          tagName: 'sysMenu',
          title: '菜单管理',
          icon: '#iconquanxian',
          menus: ['admin']
        }
      },
      {
        path: 'menu/create',
        component: () => import('@/views/sys/menu/edit.vue'),
        name: 'sysMenuCreate',
        meta: {
          tagName: 'sysMenu',
          title: '菜单管理',
          activeMenu: '/sys/menu/',
          hidden: true,
          menus: ['admin']
        }
      },
      {
        path: 'menu/update',
        component: () => import('@/views/sys/menu/edit.vue'),
        name: 'sysMenuUpdate',
        meta: {
          tagName: 'sysMenu',
          title: '菜单管理',
          activeMenu: '/sys/menu/',
          hidden: true,
          menus: ['admin']
        }
      }
    ]
  }
]
export default sysRouter
