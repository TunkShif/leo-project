import { Book } from "@/core/models"
import type { BookRepo } from "@/core/repos/book-repo"
import { EPUB } from "@/utilities"
import { FileHandle } from "@/utilities/file-picker"
import { match } from "ts-pattern"

export class BookService {
  #bookRepo: BookRepo

  constructor(bookRepo: BookRepo) {
    this.#bookRepo = bookRepo
  }

  // TODO: to be implemented
  // FIXME: handler permission
  open(book: Book) {
    return match(book.source)
      .with({ type: "idb" }, ({ binary }) => Promise.resolve(EPUB.open({ type: "binary", binary })))
      .with({ type: "fsa" }, async ({ handle }) => {
        console.log(await handle.requestPermission())
        const file = await handle.getFile()
        const binary = await file.arrayBuffer()
        return EPUB.open({ type: "binary", binary })
      })
      .with({ type: "online" }, ({ url }) => Promise.resolve(EPUB.open({ type: "url", url })))
      .run()
  }

  import(handle: FileHandle) {
    return this.#bookRepo.save(handle)
  }

  list() {
    return this.#bookRepo.all()
  }

  find(id: number) {
    return this.#bookRepo.find(id)
  }
}
