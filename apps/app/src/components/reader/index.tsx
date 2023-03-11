import { ReaderProvider } from "@/components/reader/context"
import Control from "@/components/reader/control"
import Toolbar from "@/components/reader/toolbar"
import Viewer from "@/components/reader/viewer"
import type { Component } from "solid-js"

const Reader: Component = () => {
  return (
    <ReaderProvider>
      <Toolbar />
      <Viewer />
      <Control />
    </ReaderProvider>
  )
}

export default Reader
