import { EPUB, type Book, type IBookService } from "@leo-project/core"
import { fs } from "@tauri-apps/api"
import { nanoid } from "nanoid"
import type Database from "tauri-plugin-sql-api"

// TODO: to be implemented

export class BookService implements IBookService {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  async import(file: File | FileSystemFileHandle): Promise<Book> {
    let binary!: ArrayBuffer
    if (file instanceof File) {
      binary = await file.arrayBuffer()
    }
    if (window.FileSystemFileHandle !== undefined && file instanceof FileSystemFileHandle) {
      binary = await file.getFile().then((f) => f.arrayBuffer())
    }

    const path = `books/${nanoid()}.epub`
    const source = { type: "fs", path } as const

    const epub = EPUB.load(binary)
    const name = (await epub.loaded.metadata).title
    const cover = await EPUB.getCoverImage(epub)

    const book = {
      name,
      cover,
      source
    }

    await fs.writeBinaryFile(path, binary, { dir: fs.BaseDirectory.AppData })

    await this.#db.execute(`INSERT INTO books (name, cover, source) VALUES ($1, $2, $3)`, [
      name,
      cover && Array.from(new Uint8Array(await cover.arrayBuffer())),
      JSON.stringify(source)
    ])

    epub.destroy()

    return book
  }

  async list(): Promise<Book[]> {
    return [] as Book[]
  }

  find(id: number): Promise<Book | null> {
    throw new Error("Method not implemented.")
  }
}
