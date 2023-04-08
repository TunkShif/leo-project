import { Book as BookModel } from "@leo-project/core"
import { A } from "@solidjs/router"
import { IconDots } from "@tabler/icons-solidjs"
import { Component, Show } from "solid-js"

type BookProps = {
  book: BookModel
}

const Book: Component<BookProps> = (props) => {
  const src = () => props.book.cover && URL.createObjectURL(props.book.cover)

  return (
    <div class="flex w-40 flex-col items-center justify-center space-y-2 rounded px-4 py-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800">
      <A class="flex flex-col items-center space-y-2" href={`/reader/${props.book.id!}`}>
        <div class="h-36 w-24 rounded-sm bg-[linear-gradient(120deg,#a1c4fd_0%,#c2e9fb_100%)]">
          <Show when={src()}>
            <img
              src={src()!}
              class="aspect-[1_/_1.5] h-full w-full rounded-sm object-cover"
              onLoad={() => src() && URL.revokeObjectURL(src()!)}
            />
          </Show>
        </div>
        <div class="line-clamp-2 text-center text-[12px] leading-tight">{props.book.name}</div>
      </A>
      <button class="inline-flex w-6 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-300 active:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500">
        <IconDots size={16} />
      </button>
    </div>
  )
}

export default Book
