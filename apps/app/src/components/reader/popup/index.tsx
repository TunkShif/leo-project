import type { SelectionChangedEvent, ViewerElement } from "@/components/reader/viewer"
import { IconButton, Popover, PopoverContent, PopoverPortal, PopoverTrigger } from "@/components/ui"
import { As } from "@kobalte/core"
import { IconBalloon } from "@tabler/icons-solidjs"
import { Show, createEffect, createSignal, from, onCleanup } from "solid-js"
import { Portal } from "solid-js/web"

const Popup = () => {
  const [show, setShow] = createSignal(false)

  // Popup is mounted after the epub viewer has rendered the book,
  // so we can safely query the epub viewer element here.
  const viewer = document.querySelector<ViewerElement>("epub-viewer")!

  const position = from<{ x: number; y: number }>((set) => {
    const handler = (event: Event) => {
      const {
        detail: { position }
      } = event as SelectionChangedEvent
      set(position)
      setShow(true)
    }

    viewer.addEventListener("epub:selected", handler)
    return () => viewer.removeEventListener("epub:selected", handler)
  })

  createEffect(() => {
    const handler = () => setShow(false)

    viewer.addEventListener("epub:cleared", handler)
    onCleanup(() => viewer.removeEventListener("epub:cleared", handler))
  })

  return (
    <Portal>
      <Show when={show()}>
        <Popover gutter={8} placement="right-start">
          <PopoverTrigger asChild>
            <As
              component={IconButton}
              label="Popup Trigger"
              variant="outline"
              class="opacity-90"
              style={{
                position: "absolute",
                top: `${position()?.y ?? 0}px`,
                left: `${position()?.x ?? 0}px`
              }}
            >
              <IconBalloon />
            </As>
          </PopoverTrigger>

          <PopoverPortal>
            <PopoverContent>
              <p>Popup Content</p>
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </Show>
    </Portal>
  )
}

export default Popup
