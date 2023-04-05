import { DataType } from "@/utilities/typing"

export type Source = DataType<{
  idb: { binary: ArrayBuffer } // (web) epub binary stored in IndexedDB
  fsa: { handle: FileSystemFileHandle } // (chrome) epub file handle stored in IndexedDB
  fs: { path: string } // (tauri) epub file located in local file system
  online: { url: string } // (cloud) unpacked epub uploaded to cloud server
}>

export type Book = {
  id?: number
  name: string
  cover?: Blob
  source: Source
}
