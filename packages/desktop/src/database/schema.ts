import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const books = sqliteTable("books", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  cover: blob("cover"),
  source: blob("source")
})
