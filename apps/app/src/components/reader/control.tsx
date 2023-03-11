import { useReaderContext } from "@/components/reader/context"
import { IconButton } from "@/components/ui"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs"
import { createEffect, type Component } from "solid-js"

const Control: Component = () => {
  const { book } = useReaderContext()

  return (
    <>
      <IconButton
        class="fixed top-1/2 left-4"
        variant="ghost"
        label="Previous Page"
        onClick={() => book()?.pagination.prev()}
      >
        <IconChevronLeft />
      </IconButton>

      <IconButton
        class="fixed top-1/2 right-4"
        variant="ghost"
        label="Next Page"
        onClick={() => book()?.pagination.next()}
      >
        <IconChevronRight />
      </IconButton>
    </>
  )
}

export default Control
