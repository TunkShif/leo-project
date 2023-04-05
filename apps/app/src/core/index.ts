import { createIDB } from "@/core/databases/idb"
import { BookService } from "@/core/services/book-service"
import { FileSystemAccessStorage } from "@/core/storages/fsa"

export type AppCore = {
  service: {
    book: BookService
  }
}

export const createApp = (): AppCore => {
  const idb = createIDB()

  const fsaStorage = new FileSystemAccessStorage({ idb })

  const bookService = new BookService({
    storage: fsaStorage
  })

  return {
    service: {
      book: bookService
    }
  }
}
