import { Book, type Rendition } from "@leo-project/epub"

const createBook = (url: string) => {
  let rendition: Rendition | null = null
  const book = Book.from(url)

  return {
    book,
    rendition,
    render(ref: HTMLElement) {
      rendition = book.render(ref, {
        width: "100%",
        height: "100%",
        allowScriptedContent: true
      })
      rendition.display()
    },
    destroy() {
      rendition?.destroy()
      book.destroy()
    }
  }
}

export default createBook
