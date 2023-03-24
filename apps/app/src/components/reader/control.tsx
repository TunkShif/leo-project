import { useBook } from "@/components/reader/book"
import { IconButton } from "@/components/ui"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs"
import { type Component } from "solid-js"

const Control: Component = () => {
  const [book] = useBook()

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
