import type { Book, FileHandle } from "@/core/models"
import Dexie, { type Table } from "dexie"

class AppDatabase extends Dexie {
  declare books: Table<Book>
  declare files: Table<FileHandle>

  constructor() {
    super("leo-app")
    this.version(1).stores({
      books: "++id, title, author, source",
      files: "++id, data"
    })
  }
}

export const createIDB = () => new AppDatabase()

export type IDB = AppDatabase
