import { type Repo } from "@/database"
import { books } from "@/database/schema"
import { EPUB, type Book, type IBookService } from "@leo-project/core"

// TODO: to be implemented

export class BookService implements IBookService {
  #repo: Repo

  constructor(repo: Repo) {
    this.#repo = repo
  }

  async import(handle: FileSystemFileHandle): Promise<Book> {
    throw new Error("Method not implemented.")
    // const file = await handle.getFile()
    // const binary = await file.arrayBuffer()
    // const source = { type: "fs", path: file.path } as const
    //
    // const epub = EPUB.load(binary)
    // const name = (await epub.loaded.metadata).title
    // const cover = await EPUB.getCoverImage(epub)
    //
    // const book: Book = {
    //   name,
    //   cover,
    //   source
    // }
    //
    // console.log(book)
    //
    // return book
  }

  async list(): Promise<Book[]> {
    const a = this.#repo.select().from(books).all()
    console.log(a)
    return [] as Book[]
  }

  find(id: number): Promise<Book | null> {
    throw new Error("Method not implemented.")
  }
}
