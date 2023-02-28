import EpubViewer from "@/components/reader/epub-viewer"
import Header from "@/components/reader/header"
import { Title } from "@solidjs/meta"
import type { Component } from "solid-js"

const ReaderPage: Component = () => {
  return (
    <>
      <Title>Reader</Title>
      <div class="relative h-full min-h-screen w-full">
        <Header />
        <EpubViewer />
      </div>
    </>
  )
}

export default ReaderPage
