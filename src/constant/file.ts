/**
 * 文件类型
 */
export enum FileType {
  /** 全部 */
  All,
  /** 图片 */
  Image,
  /** word文件 */
  Word,
  /** excel文件 */
  Excel,
  /** ppt文件 */
  PPT,
  /** pdf文件 */
  PDF,
  /** word/excel/ppt/pdf */
  Doc,
  /** 音频 */
  Audio,
  /** 视频 */
  Video,
  /** txt文档 */
  Txt,
  /** 压缩文件 */
  Zip,
  /** 安装包 */
  InstallPackage,
}

/**
 * 图片
 */
export const ImageExt = ['jpg', 'png', 'jpeg', 'gif', 'bmp']

/**
 * Word
 */
export const WordExt = ['doc', 'docx', 'dotx', 'rtf']

/**
 * Excel
 */
export const ExcelExt = ['xls', 'xlsx', 'xlsm', 'xlsb', 'xlt', 'xltm', 'xlsm', 'xla', 'xlm', 'xlw', 'odc']

/**
 * PPT
 */
export const PPTExt = ['ppt', 'pptx', 'potx', 'pptm', 'potm', 'pot', 'ppsx', 'pps', 'odp']

/**
 * PDF
 */
export const PDFExt = ['pdf']

/**
 * Word/Excel/PPT/PDF
 */
export const DocExt = [...WordExt, ...ExcelExt, ...PPTExt, ...PDFExt]

/**
 * 音频
 */
export const AudioExt = ['mp2', 'mp3', 'wav', 'wma', 'flac', 'midi', 'ra', 'ape', 'acc', 'cda', 'mov']

/**
 * 视频
 */
export const VideoExt = ['mp4', 'avi', 'wmv', 'rm', 'rmvb', 'flash', '3gp', 'flv', 'mov', 'm4v', 'mpg', 'mpeg', 'mpe']

/**
 * txt文档
 */
export const TxtExt = ['txt']

/**
 * 压缩包
 */
export const ZipExt = ['zip', 'rar', '7z']

/**
 * 安装包
 */
export const InstallPackageExt = ['apk', 'ios', 'ipa']

/**
 * 全部
 */
export const AllExt = [...ImageExt, ...DocExt, ...AudioExt, ...VideoExt, ...TxtExt, ...ZipExt, ...InstallPackageExt]
