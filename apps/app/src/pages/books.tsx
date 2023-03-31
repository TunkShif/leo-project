import { A } from "@solidjs/router"
import { IconDots } from "@tabler/icons-solidjs"
import { For } from "solid-js"

const Book = () => {
  return (
    <div class="flex w-36 flex-col items-center justify-center space-y-2 rounded px-4 py-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800">
      <A href="/reader/blah" class="flex flex-col space-y-2">
        <div class="h-32 w-28 rounded bg-[linear-gradient(120deg,#a1c4fd_0%,#c2e9fb_100%)]">
          blah
        </div>
        <div class="line-clamp-2 text-xs">A Kind of Long Book Title</div>
      </A>
      <button class="inline-flex w-6 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600">
        <IconDots size={16} />
      </button>
    </div>
  )
}

const BooksPage = () => {
  return (
    <div>
      <div class="grid grid-cols-[repeat(auto-fit,9rem)] gap-4">
        <For each={Array(50).fill(0)}>{() => <Book />}</For>
      </div>
    </div>
  )
}

export default BooksPage
