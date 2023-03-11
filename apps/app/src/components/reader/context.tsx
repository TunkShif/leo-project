import { RenderedBook } from "@/libs/book"
import { Accessor, Component, createEffect, createResource, JSX, Resource, Setter } from "solid-js"
import { createContext, createSignal, useContext } from "solid-js"

const FONT_SIZE_STEP = 25

type Context = {
  book: Accessor<RenderedBook | undefined>
  setBook: Setter<RenderedBook | undefined>
  theme: {
    increaseFontSize: () => void
    decreaseFontSize: () => void
  }
}

type Props = {
  children: JSX.Element
}

const ReaderContext = createContext<Context>()

export const ReaderProvider: Component<Props> = (props) => {
  const [book, setBook] = createSignal<RenderedBook>()
  const [fontSize, setFontSize] = createSignal(100)

  const increaseFontSize = () => {
    if (fontSize() >= 200) return
    setFontSize((prev) => prev + FONT_SIZE_STEP)
  }

  const decreaseFontSize = () => {
    if (fontSize() <= 75) return
    setFontSize((prev) => prev - FONT_SIZE_STEP)
  }

  createEffect(() => {
    book()?.theme.setFontSize(`${fontSize()}%`)
  })

  return (
    <ReaderContext.Provider
      value={{
        book,
        setBook,
        theme: {
          increaseFontSize,
          decreaseFontSize
        }
      }}
    >
      {props.children}
    </ReaderContext.Provider>
  )
}

export const useReaderContext = () => useContext(ReaderContext)!
