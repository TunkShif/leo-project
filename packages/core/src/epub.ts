import type { Book } from "@/models"
import { OPFS } from "@/opfs"
import Epub, { type Book as EpubBook } from "epubjs"
import { match } from "ts-pattern"

export const EPUB = {
  // TODO: other sources
  open(book: Book) {
    return match(book.source)
      .with({ type: "opfs" }, async ({ path }) => {
        const file = await OPFS.readFile(path)
        return file && this.load(await file.arrayBuffer())
      })
      .run()
  },
  load(source: string | ArrayBuffer) {
    if (typeof source === "string") {
      return Epub(source)
    }

    if (source instanceof ArrayBuffer) {
      const epub = Epub()
      epub.open(source, "binary")
      return epub
    }

    throw new Error("Cannot load EPUB from provided source!")
  },
  async getCoverImage(book: EpubBook) {
    const url = await book.coverUrl()
    if (!url) return null
    const response = await fetch(url)
    return await response.blob()
  },
  // @see https://github.com/futurepress/epub.js/issues/1084
  resolveNavHref(href: string, navPath: string) {
    const placeholder = "https://foo.bar/"
    return new URL(href, placeholder + navPath).href.replace(placeholder, "")
  }
}
