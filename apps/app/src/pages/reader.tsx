import Reader from "@/components/reader"
import { Title } from "@solidjs/meta"
import { RouteDataFuncArgs, useRouteData } from "@solidjs/router"
import { Component, createResource } from "solid-js"

// TODO: to be implemented
export const ReaderData = ({ params }: RouteDataFuncArgs) => {
  const id = parseInt(params.id)
  const [epub] = createResource(() =>
    Leo.service.book.find(id).then((book) => Leo.service.book.open(book.extract()!))
  )
  return epub
}

export const useReaderData = () => useRouteData<typeof ReaderData>()

export const ReaderPage: Component = () => {
  return (
    <>
      <Title>Reader</Title>
      <div class="relative h-full min-h-screen w-full">
        <Reader />
      </div>
    </>
  )
}
