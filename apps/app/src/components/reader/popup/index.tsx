import { useReader } from "@/components/reader/provider"
import type { SelectedEvent, ViewerElement } from "@/components/reader/viewer"
import { IconButton, Popover, PopoverContent, PopoverPortal, PopoverTrigger } from "@/components/ui"
import { As } from "@kobalte/core"
import { IconBalloon } from "@tabler/icons-solidjs"
import { Component, Show, createSignal, from } from "solid-js"
import { Portal } from "solid-js/web"

type PopoverInternalProps = {
  position: { x: number; y: number }
  hide: () => void
}

const PopoverInternal: Component<PopoverInternalProps> = (props) => {
  let triggerRef: HTMLButtonElement | undefined
  let contentRef: HTMLDivElement | undefined

  return (
    <Popover gutter={8} placement="right-start">
      <PopoverTrigger asChild>
        <As
          component={IconButton}
          ref={triggerRef}
          label="Popup Trigger"
          variant="outline"
          class="opacity-90"
          style={{
            position: "absolute",
            top: `${props.position.y}px`,
            left: `${props.position.x}px`
          }}
        >
          <IconBalloon />
        </As>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent ref={contentRef}>
          <p>Popup Content</p>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

const Popup = () => {
  const [show, setShow] = createSignal(false)

  // Popup is mounted after the epub viewer has rendered the book,
  // so we can safely query the epub viewer element here.
  const viewer = document.querySelector<ViewerElement>("epub-viewer")!

  const position = from<{ x: number; y: number }>((set) => {
    const handler = (event: Event) => {
      const {
        detail: { position }
      } = event as SelectedEvent
      set(position)
    }

    viewer.addEventListener("epub:selected", handler)
    return () => viewer.removeEventListener("epub:selected", handler)
  })

  return (
    <Portal>
      <Show when={true}>
        <PopoverInternal hide={() => setShow(false)} position={position() ?? { x: 0, y: 0 }} />
      </Show>
    </Portal>
  )
}

export default Popup
