import Book from "@/components/books/book"
import { useBooksData } from "@/pages/books"
import { For, Show } from "solid-js"

const BookDisplay = () => {
  const { books } = useBooksData()

  return (
    <div>
      <div class="grid grid-cols-[repeat(auto-fit,9rem)] gap-4">
        <Show when={!books.loading}>
          <For each={books()}>{(book) => <Book book={book} />}</For>
        </Show>
      </div>
    </div>
  )
}

export default BookDisplay
