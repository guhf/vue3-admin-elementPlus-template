import { nextTick } from 'vue'
import type { Directive } from 'vue'

const adjustColumnWidth = (el: any, binding: any) => {
  const colgroup = el.querySelector('colgroup')
  const colDefs = [...colgroup.querySelectorAll('col')]
  colDefs.forEach((col) => {
    const clsName = col.getAttribute('name')
    const thFits = [...el.querySelectorAll(`th.${clsName}.fit`)]
    const tdFits = [...el.querySelectorAll(`td.${clsName}.fit`)]
    if (!tdFits.length) {
      return
    }

    const widthList = tdFits.map((fit) => {
      return fit.querySelector('.cell')?.scrollWidth || 0
    })

    const max = Math.max(...widthList)
    const cols = el.querySelectorAll(`col[name=${clsName}]`)

    setTimeout(() => {
      // 第一次设置之后不生效，暂未找到原因，先使用setTimeout
      cols.forEach((col: any) => {
        if (el.querySelector(`.${clsName}.fit .cell`).innerText) {
          col.setAttribute('width', max)
        } else {
          col.setAttribute('width', 0)
        }
      })

      thFits.forEach((fit: any) => {
        if (!tdFits[0].querySelector('.cell').innerText) {
          fit.style.display = 'none'
          fit.previousSibling.style.right = '0'
        } else {
          fit.style.display = ''
          fit.previousSibling.style.right = `${max}px`
        }
      })

      tdFits.forEach((fit: any) => {
        if (!fit.querySelector('.cell').innerText) {
          fit.style.display = 'none'
          fit.previousSibling.style.right = '0'
        } else {
          fit.style.display = ''
          fit.previousSibling.style.right = `${max}px`
        }
      })
      // binding.instance.doLayout()
    }, 10)
  })
}

export const fitColumn: Directive = {
  updated(el, binding, vnode, prevNode) {
    nextTick(() => {
      adjustColumnWidth(el, binding)
    })
  },
}
