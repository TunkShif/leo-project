import type { Accessor, Component, JSX } from "solid-js"
import { createContext, createSignal, useContext } from "solid-js"

const FONT_SIZE_STEP = 25

type Context = {
  theme: {
    fontSize: Accessor<number>
    increaseFontSize: () => void
    decreaseFontSize: () => void
  }
}

type Props = {
  children: JSX.Element
}

const ReaderContext = createContext<Context>()

export const ReaderProvider: Component<Props> = (props) => {
  const [fontSize, setFontSize] = createSignal(100)

  const increaseFontSize = () => {
    if (fontSize() >= 200) return
    setFontSize((prev) => prev + FONT_SIZE_STEP)
  }

  const decreaseFontSize = () => {
    if (fontSize() <= 75) return
    setFontSize((prev) => prev - FONT_SIZE_STEP)
  }

  return (
    <ReaderContext.Provider
      value={{
        theme: {
          fontSize,
          increaseFontSize,
          decreaseFontSize
        }
      }}
    >
      {props.children}
    </ReaderContext.Provider>
  )
}

export const useReaderContext = () => useContext(ReaderContext)
