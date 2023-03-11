import Epub from "epubjs"
import type { NavItem, Rendition } from "epubjs"
import type { Annotation } from "epubjs/types/annotations"

export type { NavItem } from "epubjs"

export type AnnotationType = "highlight" | "underline" | "mark"

export type BookMetadata = {
  title: string
  creator: string
  description: string
  publishAt: string
  publisher: string
  language: string
  rights: string
}

export type Book = {
  get cover(): Promise<string>
  get toc(): Promise<NavItem[]>
  get metadata(): Promise<BookMetadata>
  render(el: HTMLElement): Promise<RenderedBook>
}

export type RenderedBook = Book & {
  destroy(): void
  pagination: {
    prev(): Promise<void>
    next(): Promise<void>
    goto(location: string): Promise<void>
  }
  theme: {
    setFontSize(size: string): void
  }
  annotation: {
    add(
      type: AnnotationType,
      cfi: string,
      data?: any,
      className?: string,
      styles?: object
    ): Annotation
    remove(type: AnnotationType, cfi: string): void
  }
}

export const createBook = (url: string): Book => {
  let rendition: Rendition
  const epub = Epub(url)

  const book: Book = {
    get cover() {
      return epub.loaded.cover
    },
    get toc() {
      return epub.loaded.navigation.then(({ toc }) => toc)
    },
    get metadata() {
      return epub.loaded.metadata.then((metadata) => ({
        title: metadata.title,
        creator: metadata.creator,
        description: metadata.description,
        publisher: metadata.publisher,
        language: metadata.language,
        rights: metadata.rights,
        publishAt: metadata.pubdate
      }))
    },
    async render(el) {
      rendition = epub.renderTo(el, {
        width: "100%",
        height: "100%",
        allowScriptedContent: true
      })
      await rendition.display()
      return Object.assign(book, rendered)
    }
  }

  const rendered: Omit<RenderedBook, keyof Book> = {
    destroy() {
      rendition.destroy()
      epub.destroy()
    },
    pagination: {
      prev() {
        return rendition.prev()
      },
      next() {
        return rendition.next()
      },
      goto(location: string) {
        return rendition.display(location)
      }
    },
    theme: {
      setFontSize(size) {
        rendition.themes.fontSize(size)
      }
    },
    annotation: {
      add(type, cfi, data, className, styles) {
        return rendition.annotations.add(type, cfi, data, undefined, className, styles)
      },
      remove(type, cfi) {
        return rendition.annotations.remove(type, cfi)
      }
    }
  }

  return book
}
