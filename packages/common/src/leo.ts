import { IBookService } from "@leo-project/core"

type AppServiceMap = {
  "book-service": IBookService
}

type AppServiceKeys = keyof AppServiceMap

const services: Map<AppServiceKeys, AppServiceMap[AppServiceKeys]> = new Map()

const hasRegistered = <K extends AppServiceKeys>(key: K) => services.has(key)

export const Leo = {
  register<K extends AppServiceKeys, S extends AppServiceMap[K]>(key: K, service: S) {
    if (hasRegistered(key)) {
      throw new Error(`Service '${key}' already registered!`)
    }
    services.set(key, service)
    return this
  },
  provide<K extends AppServiceKeys>(key: K) {
    if (!hasRegistered(key)) {
      throw new Error(`Service '${key}' not registered!`)
    }
    return services.get(key)!
  }
}
