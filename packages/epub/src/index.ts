import Epub from "epubjs"
import type { Book as EpubBook } from "epubjs"
import type { RenditionOptions } from "epubjs/types/rendition"

export type { Rendition, NavItem as TocItem, Location, Contents } from "epubjs"

export type BookMetadata = {
  title: string
  creator: string
  description: string
  publishAt: string
  publisher: string
  language: string
  rights: string
}

export class Book {
  private _book: EpubBook

  static from(url: string) {
    return new Book(url)
  }

  constructor(url: string) {
    this._book = Epub(url)
  }

  render(element: Element, options?: RenditionOptions) {
    return this._book.renderTo(element, options)
  }

  destroy() {
    this._book.destroy()
  }

  async getCover() {
    return await this._book.loaded.cover
  }

  async getToc() {
    const { toc } = await this._book.loaded.navigation
    return toc
  }

  async getMetadata(): Promise<BookMetadata> {
    const metadata = await this._book.loaded.metadata
    return {
      title: metadata.title,
      creator: metadata.creator,
      description: metadata.description,
      publisher: metadata.publisher,
      language: metadata.language,
      rights: metadata.rights,
      publishAt: metadata.pubdate
    }
  }
}
