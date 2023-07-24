import { defineStore } from 'pinia'
import type { DictData } from '~/models/sys/dictModel'
import type { Options } from '~/models/common/optionModel'

export const useDictStore = defineStore('dict', {
  state: () => {
    return {
      dicts: {} as { [key: string]: Options },
    }
  },
  actions: {
    setDictData(dicts: DictData[]) {
      dicts.forEach((item) => {
        this.dicts[item.dictCode] = item.dictItems
      })
    },
    getDictData(dictCode = '') {
      return dictCode ? { [dictCode]: this.dicts[dictCode] } : this.dicts
    },
  },
})
