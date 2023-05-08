import { ContentType, Device } from '~/constant/headers'
import settings from "./setting.config";
type Headers = {
    'Content-Type': string
    version: string
    device: Device,
    Authorization: string
}

const _header: Headers = {
  'Content-Type': ContentType.JSON,
  version: settings.version ?? '1.0',
  device: Device.WEB,
  Authorization: ""
}

export interface NetworkConfig{
    host?: string
    timeout?: number
    loading?: false
    headers: Headers
}

/**
 * 网络配置
 */
const networkConfig: NetworkConfig = {
  host: import.meta.env.VITE_API_URL + "",
  timeout: 30000,
  loading: false,
  headers: _header
}

export default networkConfig
