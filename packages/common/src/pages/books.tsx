import BookDisplay from "@/components/books/book-display"
import { Actions, Content, Page } from "@/components/layout/page"
import { IconButton } from "@/components/ui"
import { useBooksData } from "@/pages/books.data"
import { useBookService } from "@/services"
import { FilePicker } from "@/utilities/file-picker"
import { IconDots, IconPlus } from "@tabler/icons-solidjs"

export const BooksPage = () => {
  const BookService = useBookService()
  const { refetchBooks } = useBooksData()

  const handleImport = async () => {
    const file = await FilePicker.open()
    // TODO: error handling
    if (!file) return

    await BookService.import(file)
    refetchBooks()
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
