import { fs } from "@tauri-apps/api"

const BOOKS_DIR = "books"

export const createDataFolders = async () => {
  const options = {
    dir: fs.BaseDirectory.AppData
  }
  const exists = await fs.exists(BOOKS_DIR, options)
  if (!exists) {
    await fs.createDir(BOOKS_DIR, options)
  }
}
