import Control from "@/components/reader/control"
import Popup from "@/components/reader/popup"
import { ReaderProvider } from "@/components/reader/provider"
import Toolbar from "@/components/reader/toolbar"
import "@/components/reader/viewer"
import type { ViewerElement } from "@/components/reader/viewer"
import Epub from "epubjs"
import { Show, createSignal, onMount } from "solid-js"

const Reader = () => {
  let ref: ViewerElement | undefined

  const book = Epub("/test-book/OPS/content.opf")

  const [rendered, setRendered] = createSignal(false)

  onMount(() => {
    ref!.render(book).then(() => setRendered(true))
  })

  return (
    <ReaderProvider value={book}>
      <div class="absolute inset-12">
        <epub-viewer class="h-full w-full dark:hue-rotate-180 dark:invert" ref={ref} />
      </div>

      <Toolbar />
      <Control />

      <Show when={rendered()}>
        <Popup />
      </Show>
    </ReaderProvider>
  )
}

export default Reader
