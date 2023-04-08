import { useBookService } from "@/services"
import { useRouteData } from "@solidjs/router"
import { createResource } from "solid-js"

export const BooksData = () => {
  const BookService = useBookService()

  const [books, { refetch: refetchBooks }] = createResource(() => BookService.list())

  return {
    books,
    refetchBooks
  }
}

export const useBooksData = () => useRouteData<typeof BooksData>()
