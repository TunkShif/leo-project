import { DataType } from "@/utilities/typing"

export type FileHandle = {
  id?: number
  data: DataType<{
    handle: { handle: FileSystemFileHandle }
    binary: { binary: Blob }
  }>
}

export type Source = DataType<{
  idb: { key: number } // (web) epub binary stored in IndexedDB
  fsa: { key: number } // (chrome) epub file handle stored in IndexedDB
  fs: { path: string } // (tauri) epub file located in local file system
  online: { url: string } // (cloud) unpacked epub uploaded to cloud server
}>

export type Book = {
  id?: number
  title: string
  author: string
  source: Source
}
