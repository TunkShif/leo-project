import type { IDB } from "@/core/databases/idb"
import type { FileStorage } from "@/core/storage"
import { Just, Nothing } from "purify-ts"

type FileSystemFileHandleParams = {
  idb: IDB
}

export class FileSystemAccessStorage implements FileStorage<FileSystemFileHandle> {
  #idb: IDB

  constructor({ idb }: FileSystemFileHandleParams) {
    this.#idb = idb
  }

  async pick() {
    const options = {
      id: "importEpub",
      multiple: false,
      excludeAcceptAllOption: true,
      types: [
        {
          description: "Epub",
          startIn: "documents",
          accept: {
            "application/epub+zip": [".epub"]
          }
        }
      ]
    }
    try {
      const [handle] = await window.showOpenFilePicker(options)
      return Just(handle)
    } catch (e) {
      return Nothing
    }
  }

  async persist(handle: FileSystemFileHandle) {
    const ret = await this.#idb.files.add({ data: { type: "handle", handle } })
    console.log(ret)
  }

  async read(handle: FileSystemFileHandle) {
    const file = await handle.getFile()
    return file.arrayBuffer()
  }

  async find(id: number) {
    // TODO: to be implemented
    return this.#idb.files.where("id").equals(id).first()
  }
}
