import type { RenderedBook } from "@/libs/book"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs"
import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js"
import { useReaderContext } from "./context"
import "./element"
import type { EpubViewerElement, RenderedEvent } from "./element"

const Viewer: Component = () => {
  let ref: EpubViewerElement

  const [book, setBook] = createSignal<RenderedBook>()
  const { theme } = useReaderContext()!

  onMount(() => {
    ref.addEventListener("ready", (e) => setBook((e as RenderedEvent).detail.book))
  })

  createEffect(() => {
    const fontSize = theme.fontSize()
    book()?.theme.setFontSize(`${fontSize}%`)
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
        <epub-viewer
          ref={ref!}
          class="h-full w-full"
          src="http://localhost:8000/epub/content.opf"
        ></epub-viewer>
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
