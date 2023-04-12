import { db, type AppDatabase } from "@/database"
import { EPUB, type Book, type IBookService } from "@leo-project/core"

export class BookService implements IBookService {
  #db: AppDatabase

  constructor() {
    this.#db = db
  }

  // TODO: migrate to OPFS (Origin Private File System) for better compability
  async import(file: File | FileSystemFileHandle): Promise<Book> {
    let binary!: ArrayBuffer
    let source!: Book["source"]

    if (file instanceof File) {
      source = { type: "idb", binary }
      binary = await file.arrayBuffer()
    }

    if (window.FileSystemFileHandle !== undefined && file instanceof FileSystemFileHandle) {
      source = { type: "fsa", handle: file }
      binary = await file.getFile().then((f) => f.arrayBuffer())
    }

    const epub = EPUB.load(binary)
    const name = (await epub.loaded.metadata).title
    const cover = await EPUB.getCoverImage(epub)

    const book: Book = {
      name,
      cover,
      source
    }

    const id = await this.#db.books.put(book)
    book.id = id

    epub.destroy()
    return book
  }

  list(): Promise<Book[]> {
    return this.#db.books.toArray()
  }

  async find(id: number): Promise<Book | null> {
    const book = await this.#db.books.where("id").equals(id).first()
    return book ?? null
  }
}
