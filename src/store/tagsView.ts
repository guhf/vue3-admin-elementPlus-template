import { Routes } from '@/models/route/routesModel'
import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'
import { usePermissionStore } from './permission'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      visitedViews: [] as TagView[],
      cachedViews: [] as (string | undefined)[]
    }
  },
  actions: {
    async addCachedView(view: TagView) {
      console.log('11111', view);
      
      await this.addVisitedView(view)

      if (!view.name) return
      if (this.cachedViews.includes(String(view.name))) return
      if (!view.meta?.noCache) {
        this.cachedViews.push(String(view.name))
      }
    },

    addVisitedView(view: TagView) {
      let visitedView = this.visitedViews.find(v => v.meta?.tagName === view.meta?.tagName)
      if (visitedView) {
        // 替换tagView路径
        visitedView.path = view.path
        visitedView.fullPath = view.path
        return
      }
      // if (this.visitedViews.some(v => v.meta?.tagName === view.meta?.tagName)) return

      this.visitedViews.push({
        title: view.meta?.title || 'no-name',
        fullPath: view.path || '',
        meta: view.meta || '',
        name: view.name || '',
        path: view.path || ''
      }as TagView)
    },
    delView(view: TagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
      this.delCachedView(view.meta?.tagName + '')
    },
    delOtherView(view: TagView) {
      this.otherViews(view)
    },
    delCachedView(tagName: string) {
      if (!tagName) return
      // 遍历获取与当前tagName相同的所有路由 Route
      let names = [] as string[]

      const getNames = (routes: Routes) => {
        routes.forEach((route) => {
          if(route.meta && route.meta.tagName && route.meta.tagName.toLowerCase() === tagName.toLowerCase()){
            names.push(route.name)
          }
          if(route.children && route.children.length){
            getNames(route.children)
          }
        })
      }

      getNames(usePermissionStore().routes)
      
      names.forEach((name: string) => {
        const index = this.cachedViews.indexOf(name)
        index > -1 && this.cachedViews.splice(index, 1)
      })
    },

    otherViews(view: TagView) {
      this.visitedViews = this.visitedViews.filter(v => {
        return v.meta?.affix || v.path === view.path
      })

      if (!view.name) return
      const index = this.cachedViews.indexOf(String(view.name))
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        this.cachedViews = []
      }
    },
    delAllViews() {
      // keep affix tags
      const affixTags = this.visitedViews.filter(tag => tag.meta?.affix)
      this.visitedViews = affixTags

      this.cachedViews = []
    },
    delAllCaChedViews() {
      this.cachedViews = []
    },
    updateVisitedView(view: TagView) {
      for (let v of this.visitedViews) {
        if (v.meta?.tagName === view.meta?.tagName) {
          v = {
            title: view.meta?.title || 'no-name',
            fullPath: view.path || '',
            meta: view.meta || '',
            name: view.name || '',
            path: view.path || ''
          } as TagView
          break
        }
      }
    }
  }
})

