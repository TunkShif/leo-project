import type { RenderedBook } from "@/libs/book"
import {
  JSX,
  createContext,
  createSignal,
  useContext,
  type Accessor,
  type Component,
  type Setter
} from "solid-js"

type Context = readonly [Accessor<RenderedBook | undefined>, Setter<RenderedBook | undefined>]

const ReaderContext = createContext<Context>()

type BookProviderProps = {
  children: JSX.Element
}

export const BookProvider: Component<BookProviderProps> = (props) => {
  const [book, setBook] = createSignal<RenderedBook>()

  return <ReaderContext.Provider value={[book, setBook]} children={props.children} />
}

export const useBook = () => useContext(ReaderContext)!
