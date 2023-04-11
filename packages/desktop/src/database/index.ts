import sql from "@/database/migration"
import Database from "tauri-plugin-sql-api"

export const createDatabase = async () => {
  const db = await Database.load("sqlite:leo.db")
  await db.execute(sql)
  return db
}
