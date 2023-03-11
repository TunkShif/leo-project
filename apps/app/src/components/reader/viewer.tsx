import { useReaderContext } from "@/components/reader/context"
import { createBook } from "@/libs/book"
import { onCleanup, onMount, type Component } from "solid-js"

const Viewer: Component = () => {
  let ref: HTMLDivElement
  const { book, setBook } = useReaderContext()

  onMount(() => {
    createBook("http://localhost:8000/OPS/content.opf").render(ref).then(setBook)
  })

  onCleanup(() => {
    book()?.destroy()
  })

  return (
    <div class="absolute inset-12">
      <div id="viewer" class="h-full w-full dark:hue-rotate-180 dark:invert" ref={ref!}></div>
    </div>
  )
}

export default Viewer
