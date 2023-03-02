import { createBook, RenderedBook } from "@/libs/book"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs"
import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js"
import { useReaderContext } from "./context"

const Viewer: Component = () => {
  let ref: HTMLDivElement

  const [book, setBook] = createSignal<RenderedBook>()
  const { theme } = useReaderContext()!

  onMount(() => {
    createBook("http://localhost:8000/epub/content.opf").render(ref).then(setBook)
  })

  createEffect(() => {
    const fontSize = theme.fontSize()
    book()?.theme.setFontSize(`${fontSize}%`)
  })

  onCleanup(() => {
    book()?.destroy()
  })

  return (
    <>
      <button
        class="fixed top-1/2 left-4 -translate-y-1/2 "
        onClick={() => book()?.pagination.prev()}
      >
        <IconChevronLeft />
      </button>
      <div class="absolute inset-12">
        <div id="viewer" class="h-full w-full" ref={ref!}></div>
      </div>
      <button
        class="fixed top-1/2 right-4 -translate-y-1/2"
        onClick={() => book()?.pagination.next()}
      >
        <IconChevronRight />
      </button>
    </>
  )
}

export default Viewer
