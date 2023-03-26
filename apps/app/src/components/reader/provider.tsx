import type { Book } from "epubjs"
import { createContext, useContext } from "solid-js"

const ReaderContext = createContext<Book>()

export const ReaderProvider = ReaderContext.Provider

export const useReader = () => useContext(ReaderContext)!
