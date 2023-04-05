import Control from "@/components/reader/control"
import Popup from "@/components/reader/popup"
import { ReaderProvider } from "@/components/reader/provider"
import Toolbar from "@/components/reader/toolbar"
import "@/components/reader/viewer"
import type { ViewerElement } from "@/components/reader/viewer"
import { useReaderData } from "@/pages/reader"
import { Show, createEffect, createSignal } from "solid-js"

const Reader = () => {
  let ref: ViewerElement | undefined

  const book = useReaderData()

  const [rendered, setRendered] = createSignal(false)

  createEffect(() => {
    if (book.loading) return
    console.log(book())
    ref!.render(book()!).then(() => setRendered(true))
  })

  return (
    <Show when={!book.loading}>
      <ReaderProvider value={book()}>
        <div class="absolute inset-12">
          <epub-viewer class="h-full w-full dark:hue-rotate-180 dark:invert" ref={ref} />
        </div>

        <Toolbar />
        <Control />

        <Show when={rendered()}>
          <Popup />
        </Show>
      </ReaderProvider>
    </Show>
  )
}

export default Reader
