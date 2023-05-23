import CryptoJS from 'crypto-js'
import { AESKey } from '~/config/encryption'

/**
 * 加密
 * @param word 被加密值
 * @param key 秘钥
 */
export const useEncrypt = (word: string, key: string = AESKey) => {
  key = 'xlaB7GS9wX7dwUoh7ZbCYsfYyWzG90XE'
  let keyStr = CryptoJS.enc.Utf8.parse(key)
  let wordStr = CryptoJS.enc.Utf8.parse(word)
  let eccryptStr = CryptoJS.AES.encrypt(wordStr, keyStr, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return eccryptStr.toString().replace(/\+/g, '%2B').replace(/\//g, '%2F').replace(/\=/g, '%3D')
}

/**
 * 解密
 * @param word 加密值
 * @param key 秘钥
 */
export const useDecrypt = (word: string, key: string = AESKey) => {
  key = 'xlaB7GS9wX7dwUoh7ZbCYsfYyWzG90XE'
  let keyStr = CryptoJS.enc.Utf8.parse(key)
  let decryptStr = CryptoJS.AES.decrypt(word, keyStr, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decryptStr).toString()
}