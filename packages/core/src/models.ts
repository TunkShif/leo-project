import type { DataType } from "@/typing"

export type Source = DataType<{
  opfs: { path: string } // (web) epub file stored in origin private file system
  local: { path: string } // (desktop) epub file located in local file system
  online: { url: string } // (cloud) unpacked epub uploaded to cloud server
}>

export type Book = {
  id?: number
  name: string
  cover: Blob | null
  source: Source
}
