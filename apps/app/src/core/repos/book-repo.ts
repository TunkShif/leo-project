import type { IDB } from "@/core/databases/idb"
import type { Book, Source } from "@/core/models"
import { EPUB } from "@/utilities"
import type { FileHandle } from "@/utilities/file-picker"
import { Maybe } from "purify-ts"

export interface BookRepo {
  all(): Promise<Book[]>
  find(id: number): Promise<Maybe<Book>>
  save(handle: FileHandle): Promise<number>
}

export class IDBBookRepo implements BookRepo {
  #idb: IDB

  constructor(idb: IDB) {
    this.#idb = idb
  }

  async all() {
    return await this.#idb.books.toArray()
  }

  async find(id: number) {
    return await this.#idb.books.where("id").equals(id).first().then(Maybe.fromNullable)
  }

  async save(handle: FileHandle) {
    const file = handle.file
    const binary = await file.arrayBuffer()
    const epub = EPUB.open({ type: "binary", binary })

    const name = (await epub.loaded.metadata).title
    const cover = (await EPUB.cover(epub)).extract()

    const source: Source = handle.handle
      ? { type: "fsa", handle: handle.handle }
      : { type: "idb", binary: binary }

    const book = {
      name,
      cover,
      source
    }

    return await this.#idb.books.add(book)
  }
}
