import sql from "@/database/migration"
import { drizzle, type SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy"
import Database from "tauri-plugin-sql-api"

export const createDatabase = async () => {
  const db = await Database.load("sqlite:leo.db")

  const result = await db.execute(sql)
  console.debug("[migration] Migration result: ", result)

  return db
}

export const createRepo = (db: Database) =>
  drizzle(
    async (sql, param, method) => {
      try {
        switch (method) {
          case "run": {
            const result = await db.execute(sql, param)

            console.debug("[drizzle] Database execution result: ", result)

            return { rows: [] }
          }
          case "get":
          case "all":
          case "values": {
            const result = await db.select<unknown[]>(sql, param)
            console.debug("[drizzle] Database query result: ", result)

            return { rows: result }
          }
        }
      } catch (e) {
        console.error("[drizzle] Error from database proxy: ", e)
        return { rows: [] }
      }
    },
    { logger: true }
  )

export type Repo = SqliteRemoteDatabase
