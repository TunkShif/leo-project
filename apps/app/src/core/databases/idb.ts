import type { Book } from "@/core/models"
import Dexie, { type Table } from "dexie"

class AppDatabase extends Dexie {
  declare books: Table<Book, number>

  constructor() {
    super("leo-app")
    this.version(1).stores({
      books: "++id"
    })
  }
}

export const createIDB = () => new AppDatabase()

export type IDB = AppDatabase
