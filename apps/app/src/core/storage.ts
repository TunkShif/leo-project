import type { Maybe } from "purify-ts"

export interface FileStorage<T = unknown> {
  pick(): Promise<Maybe<T>>
  read(handle: T): Promise<ArrayBuffer>
  find(id: number): Promise<T>
  persist(handle: T): Promise<void>
}
