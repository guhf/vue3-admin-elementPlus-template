
import { Directive } from 'vue'
import { usePermissionStore } from '@/store/permission'

export const permission: Directive = {
  mounted(el, binding) {
    const { value, arg } = binding

    if (value && value instanceof Array && value.length > 0) {
      const userAuth = usePermissionStore().auths
      const permissions = value
      const hasPermission = userAuth.some(auth => {
        return permissions.includes(auth)
      })

      if(!hasPermission && arg !== 'un'){
        el.parentNode && el.parentNode.removeChild(el)
      }
      return hasPermission
    }
  }
}
