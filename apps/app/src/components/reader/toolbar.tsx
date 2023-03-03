import { A } from "@solidjs/router"
import { IconArrowNarrowLeft, IconMinus, IconPlus, IconSettings } from "@tabler/icons-solidjs"
import IconButton, { iconButton } from "../ui/icon-button"
import { useReaderContext } from "./context"

const Toolbar = () => {
  const { theme } = useReaderContext()!

  return (
    <header class="sticky inset-x-0 top-0 z-10 flex h-12 items-center justify-between border-b-[1px] border-gray-200 bg-white/90 px-2 backdrop-blur-sm">
      <div>
        <A href="/" class={iconButton({ variant: "ghost" })}>
          <span class="sr-only">Go Back to Home Page</span>
          <IconArrowNarrowLeft />
        </A>
      </div>
      <h1 class="text-lg font-medium">Title</h1>
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
