import axios from 'axios'
import { IconModel } from '@/models/common/iconModel'

/**
* 查询菜单图标
* @returns 菜单图标集合
*/
export const getMenuIcons = () => {
  return axios.get<IconModel>(`/src/assets/icons/menu/iconfont.json`).then((res) => {
    return res.data as IconModel
  })
}

/**
* 查询操作按钮图标
* @returns 操作按钮图标集合
*/
export const getOperateIcons = () => {
  return axios.get<IconModel>(`/src/assets/icons/operate/iconfont.json`).then((res) => {
    return res.data as IconModel
  })
}
