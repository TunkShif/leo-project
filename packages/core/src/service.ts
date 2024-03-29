import type { Book } from "@/models"

// TODO: with error handling
export interface IBookService {
  import(file: File): Promise<Book>
  list(): Promise<Book[]>
  find(id: number): Promise<Book | null>
}
