import Reader from "@/components/reader"
import { Title } from "@solidjs/meta"
import type { Component } from "solid-js"

const ReaderPage: Component = () => {
  return (
    <>
      <Title>Reader</Title>
      <div class="relative h-full min-h-screen w-full">
        <Reader />
      </div>
    </>
  )
}

export default ReaderPage
