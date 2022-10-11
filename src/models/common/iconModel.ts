/**
 * 图标Glyphs
 */
export declare interface Glyphs {
  icon_id: string
  name: string
  font_class: string
  unicode?: string
  unicode_decimal?: number
}

/**
 * 图标
 */
export interface IconModel {
  id: string
  name: string
  font_family: string
  css_prefix_text?: string
  description?: string
  glyphs: Glyphs[]
}
