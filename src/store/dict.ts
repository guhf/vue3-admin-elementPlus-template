import { defineStore } from "pinia";
import { DictData } from "@/models/sys/dictModel";
import { Options } from "@/models/common/optionModel";

export const useDictStore = defineStore('dict', {
  state: () => {
    return {
      dicts: {} as { [key: string]: Options }
    }
  },
  actions: {
    setDictData(dicts: DictData[]){
      dicts.filter((item) => {
        this.dicts[item.dictCode] = item.dictItems
      })
    },
    getDictData(dictCode: string = ''){
      return dictCode ? {[dictCode]: this.dicts[dictCode]} : this.dicts
    }
  }
})