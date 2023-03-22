import { useReaderContext } from "@/components/reader/context"
import Contents from "@/components/reader/toolbar/contents"
import { IconButton } from "@/components/ui"
import { As } from "@kobalte/core"
import { A } from "@solidjs/router"
import { IconArrowNarrowLeft, IconMinus, IconPlus, IconSettings } from "@tabler/icons-solidjs"
import { createResource } from "solid-js"

const Toolbar = () => {
  const { book, theme } = useReaderContext()
  const [metadata] = createResource(book, (book) => book.metadata)

  return (
    <header
      class="sticky inset-x-0 top-0 z-10 flex h-12 items-center justify-between
             border-b-[1px] border-slate-900/10 bg-white/90 px-2 backdrop-blur-sm
           dark:border-white/10 dark:bg-slate-800/90"
    >
      <div class="flex space-x-1">
        <IconButton label="Go Back" variant="ghost" asChild>
          <As component={A} href="/">
            <span class="sr-only">Go Back</span>
            <IconArrowNarrowLeft />
          </As>
        </IconButton>
        <Contents />
      </div>

      <h1 class="text-strong font-medium">{metadata.loading ? "..." : metadata()?.title}</h1>

      <div class="flex space-x-1">
        <IconButton variant="ghost" label="Reader Settings">
          <IconSettings />
        </IconButton>
        <IconButton variant="ghost" label="Increase Reader Font" onClick={theme.increaseFontSize}>
          <IconPlus />
        </IconButton>
        <IconButton variant="ghost" label="Increase Reader Font" onClick={theme.decreaseFontSize}>
          <IconMinus />
        </IconButton>
      </div>
    </header>
  )
}

export default Toolbar
