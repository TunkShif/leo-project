import { useReader } from "@/components/reader/provider"
import { IconButton } from "@/components/ui"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs"
import type { Component } from "solid-js"

const Control: Component = () => {
  const book = useReader()

  return (
    <>
      <IconButton
        class="fixed top-1/2 left-4"
        variant="ghost"
        label="Previous Page"
        onClick={() => book.rendition.prev()}
      >
        <IconChevronLeft />
      </IconButton>

      <IconButton
        class="fixed top-1/2 right-4"
        variant="ghost"
        label="Next Page"
        onClick={() => book.rendition.next()}
      >
        <IconChevronRight />
      </IconButton>
    </>
  )
}

export default Control
