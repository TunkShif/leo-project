import { useBook } from "@/components/reader/book"
import { useViewerStore } from "@/components/reader/stores"
import { createBook } from "@/libs/book"
import { createEffect, onCleanup, onMount, type Component } from "solid-js"

const Viewer: Component = () => {
  let ref: HTMLDivElement | undefined

  const [viewerStore] = useViewerStore()
  const [book, setBook] = useBook()

  onMount(() => {
    createBook("http://localhost:8000/OPS/content.opf").render(ref!).then(setBook)
  })

  createEffect(() => {
    book()?.theme.setFontSize(`${viewerStore.fontSize}%`)
  })

  onCleanup(() => {
    book()?.destroy()
  })

  return (
    <div class="absolute inset-12">
      <div id="viewer" class="h-full w-full dark:hue-rotate-180 dark:invert" ref={ref} />
    </div>
  )
}

export default Viewer
