import { Leo } from "@leo-project/common"
import { BookService, createDatabase, createDataFolders } from "@leo-project/desktop"

createDataFolders()
  .then(createDatabase)
  .then((db) => {
    Leo.register("book-service", new BookService(db))
  })
