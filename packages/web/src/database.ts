import type { Book } from "@leo-project/core"
import Dexie, { type Table } from "dexie"

export class AppDatabase extends Dexie {
  declare books: Table<Book, number>

  constructor() {
    super("leo-app")
    this.version(1).stores({
      books: "++id"
    })
  }
}

export const db = new AppDatabase()
