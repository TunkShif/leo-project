import { FileStorage } from "@/core/storage"
import Epub from "epubjs"
import { MaybeAsync } from "purify-ts"

type BookServiceParams = {
  storage: FileStorage
}

export class BookService {
  #storage: FileStorage

  constructor({ storage }: BookServiceParams) {
    this.#storage = storage
  }

  async import() {
    return MaybeAsync.fromPromise(() => this.#storage.pick())
      .ifJust((file) => this.#storage.persist(file))
      .map((file) => this.#storage.read(file))
      .map((buffer) => {
        const epub = Epub()
        epub.open(buffer, "binary")
        epub.loaded.cover.then(console.log)
        return true
      })
      .orDefault(false)
  }
}
