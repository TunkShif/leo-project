import { db, type AppDatabase } from "@/database"
import { EPUB, OPFS, type Book, type IBookService } from "@leo-project/core"
import { nanoid } from "nanoid"

export class BookService implements IBookService {
  #db: AppDatabase

  constructor() {
    this.#db = db
  }

  async import(file: File): Promise<Book> {
    const binary = await file.arrayBuffer()
    const epub = EPUB.load(binary)
    const name = (await epub.loaded.metadata).title
    const cover = await EPUB.getCoverImage(epub)
    const path = `/books/${nanoid(5)}-${file.name}`
    const source = { type: "opfs", path } as const

    const book: Book = {
      name,
      cover,
      source
    }

    book.id = await this.#db.books.put(book)
    await OPFS.writeFile(path, binary)

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
