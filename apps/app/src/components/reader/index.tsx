import type { Component } from "solid-js"
import { ReaderProvider } from "./context"
import Toolbar from "./toolbar"
import Viewer from "./viewer"

const Reader: Component = () => {
  return (
    <ReaderProvider>
      <Toolbar />
      <Viewer />
    </ReaderProvider>
  )
}

export default Reader
