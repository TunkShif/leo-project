import { useBookService } from "@/services"
import { EPUB } from "@leo-project/core"
import { RouteDataFuncArgs, useRouteData } from "@solidjs/router"
import { createResource } from "solid-js"

// TODO: to be implemented
export const ReaderData = ({ params }: RouteDataFuncArgs) => {
  const BookService = useBookService()

  const id = parseInt(params.id)
  const [epub] = createResource(() => BookService.find(id).then((book) => book && EPUB.open(book)))
  return epub
}

export const useReaderData = () => useRouteData<typeof ReaderData>()
