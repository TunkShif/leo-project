import { Component, onCleanup, onMount } from "solid-js"
import createBook from "../reader-context/create-book"

const EpubViewer: Component = () => {
  let ref: HTMLDivElement

  const { book, rendition, render, destroy } = createBook("http://localhost:8000/epub/content.opf")

  onMount(() => {
    render(ref)
  })

  onCleanup(() => {
    destroy()
  })

  return (
    <>
      <button class="fixed top-1/2 left-4 -translate-y-1/2">&lt;</button>
      <div class="absolute inset-12">
        <div class="h-full" ref={ref!}></div>
      </div>
      <button class="fixed top-1/2 right-4 -translate-y-1/2">&gt;</button>
    </>
  )
}

export default EpubViewer
