import { useReaderContext } from "@/components/reader/context"
import IconButton from "@/components/ui/icon-button"
import { createBook } from "@/libs/book"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs"
import { Component, onCleanup, onMount } from "solid-js"

const Viewer: Component = () => {
  let ref: HTMLDivElement
  const { book, setBook } = useReaderContext()!

  onMount(() => {
    createBook("http://localhost:8000/epub/content.opf").render(ref).then(setBook)
  })

  onCleanup(() => {
    book()?.destroy()
  })

  return (
    <>
      <IconButton
        class="fixed top-1/2 left-4 -translate-y-1/2 active:-translate-y-[calc(50%-0.125rem)]"
        variant="ghost"
        label="Previous Page"
        onClick={() => book()?.pagination.prev()}
      >
        <IconChevronLeft />
      </IconButton>
      <div class="absolute inset-12">
        <div id="viewer" class="h-full w-full" ref={ref!}></div>
      </div>
      <IconButton
        class="fixed top-1/2 right-4 -translate-y-1/2 active:-translate-y-[calc(50%-0.125rem)]"
        variant="ghost"
        label="Next Page"
        onClick={() => book()?.pagination.next()}
      >
        <IconChevronRight />
      </IconButton>
    </>
  )
}

export default Viewer
