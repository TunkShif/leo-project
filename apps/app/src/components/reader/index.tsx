import { BookProvider } from "@/components/reader/book"
import Control from "@/components/reader/control"
import Popup from "@/components/reader/popup"
import Toolbar from "@/components/reader/toolbar"
import Viewer from "@/components/reader/viewer"
import type { Component } from "solid-js"

const Reader: Component = () => {
  return (
    <BookProvider>
      <Toolbar />
      <Viewer />
      <Control />
      <Popup />
    </BookProvider>
  )
}

export default Reader
