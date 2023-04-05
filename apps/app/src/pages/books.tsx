import BookDisplay from "@/components/books/book-display"
import { Actions, Content, Page } from "@/components/layout/page"
import { IconButton } from "@/components/ui"
import { FilePicker } from "@/utilities"
import { useRouteData } from "@solidjs/router"
import { IconDots, IconPlus } from "@tabler/icons-solidjs"
import { MaybeAsync } from "purify-ts"
import { createResource } from "solid-js"

export const BooksData = () => {
  const [books, { refetch: refetchBooks }] = createResource(() => Leo.service.book.list())

  return {
    books,
    refetchBooks
  }
}

export const useBooksData = () => useRouteData<typeof BooksData>()

export const BooksPage = () => {
  const { refetchBooks } = useBooksData()

  const handleImport = () => {
    MaybeAsync(async ({ fromPromise }) => {
      const handle = await fromPromise(FilePicker.open())
      return await Leo.service.book.import(handle)
    })
      .ifJust(() => refetchBooks())
      .run()
  }

  return (
    <Page title="Books">
      <Actions>
        <IconButton variant="ghost" size="base" label="Import a New Book" onClick={handleImport}>
          <IconPlus />
        </IconButton>
        <IconButton variant="ghost" size="base" label="Settings">
          <IconDots />
        </IconButton>
      </Actions>

      <Content>
        <BookDisplay />
      </Content>
    </Page>
  )
}
