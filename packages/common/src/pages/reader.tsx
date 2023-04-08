import Reader from "@/components/reader"
import { Title } from "@solidjs/meta"
import { Component } from "solid-js"

export const ReaderPage: Component = () => {
  return (
    <>
      <Title>Reader</Title>
      <div class="relative h-full min-h-screen w-full">
        <Reader />
      </div>
    </>
  )
}
