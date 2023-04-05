import { createIDB } from "@/core/databases/idb"
import { IDBBookRepo } from "@/core/repos/book-repo"
import { BookService } from "@/core/services/book-service"

export type AppCore = {
  service: {
    book: BookService
  }
}

export const createApp = (): AppCore => {
  const idb = createIDB()
  const bookRepo = new IDBBookRepo(idb)
  const bookService = new BookService(bookRepo)

  return {
    service: {
      book: bookService
    }
  }
}
