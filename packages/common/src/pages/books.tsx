import BookDisplay from "@/components/books/book-display"
import { Actions, Content, Page } from "@/components/layout/page"
import { IconButton } from "@/components/ui"
import { useBooksData } from "@/pages/books.data"
import { useBookService } from "@/services"
import { IconDots, IconPlus } from "@tabler/icons-solidjs"

const BooksPage = () => {
  const BookService = useBookService()
  const { refetchBooks } = useBooksData()

  const showFilePicker = () =>
    new Promise<File | null>((resolve) => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "application/epub+zip"
      input.addEventListener("change", () => {
        resolve(input.files?.[0] ?? null)
      })
      input.click()
    })

  const handleImport = async () => {
    const file = await showFilePicker()
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

export default BooksPage
