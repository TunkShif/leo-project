import { Leo } from "@leo-project/common"
import { BookService, createDatabase, createRepo } from "@leo-project/desktop"

createDatabase()
  .then((db) => createRepo(db))
  .then((repo) => {
    Leo.register("book-service", new BookService(repo))
  })
