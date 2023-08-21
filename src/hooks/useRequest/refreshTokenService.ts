import { useUserStore } from '~/store/user'

class RefreshTokenService {
  refreshPromise: Promise<any> | undefined

  constructor() {
    this.refreshPromise = undefined
  }

  refreshToken() {
    if (!this.refreshPromise) {
      this.refreshPromise = new Promise<void>((resolve, reject) => {
        useUserStore()
          .refreshAccessToken()
          .then(() => {
            this.refreshPromise = undefined
            resolve()
          })
      })
    }
    return this.refreshPromise
  }

  refreshing() {
    return Boolean(this.refreshPromise)
  }
}

export default new RefreshTokenService()
