import { delay } from "@/utilities/async"
import type { Book, Contents, Location, Rendition } from "epubjs"
import type { ComponentProps } from "solid-js"

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "epub-viewer": Omit<ComponentProps<"div">, "ref"> & {
        ref: ViewerElement | ((el: ViewerElement) => void) | undefined
      }
    }
  }
}

export type CFIRange = string

export type RelocatedEvent = CustomEvent<Location>
export type SelectionChangedEvent = CustomEvent<{
  text: string
  context: string
  cfiRange: CFIRange
  position: { x: number; y: number }
}>
export type SelectionClearedEvent = CustomEvent<undefined>

export class ViewerElement extends HTMLElement {
  #rendition!: Rendition

  #viewer: HTMLDivElement

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })

    const style = document.createElement("style")
    const viewer = document.createElement("div")

    viewer.id = "viewer"
    style.textContent = `
      :host {
        display: block;
      }

      #viewer {
        width: 100%;
        height: 100%;
      }
    `

    this.#viewer = viewer

    shadow.appendChild(style)
    shadow.appendChild(viewer)
  }

  async render(book: Book) {
    this.#rendition = book.renderTo(this.#viewer, {
      width: "100%",
      height: "100%",
      allowScriptedContent: true
    })
    await this.#rendition.display()
    this.#addEventListeners()
  }

  disconnectedCallback() {
    this.#removeEventListeners()
    this.#rendition.destroy()
  }

  get #iframe() {
    return this.shadowRoot!.querySelector("iframe")!
  }

  #addEventListeners() {
    this.#rendition.on("relocated", this.#handleRelocated)
    this.#rendition.on("selected", this.#handleSelectionChanged)

    this.#rendition.hooks.content.register((contents: Contents) => {
      console.debug("[epub-viewer] register content hook")
      contents.document.addEventListener("selectionchange", () =>
        this.#handleSelectionCleared(contents)
      )
      contents.document.addEventListener("contextmenu", this.#handleContextMenu)
    })
  }

  #removeEventListeners() {
    this.#rendition.off("relocated", this.#handleRelocated)
    this.#rendition.off("selected", this.#handleSelectionChanged)

    this.#rendition.hooks.content.clear()
  }

  #handleRelocated = (location: Location) => {
    this.dispatchEvent(new CustomEvent("epub:relocated", { detail: location }))
  }

  #handleSelectionChanged = (cfiRange: string, contents: Contents) => {
    const selection = contents.window.getSelection()!
    const text = selection.toString()
    const context = this.#getSelectedTextContext(selection)
    const rects = selection.getRangeAt(0).getClientRects()

    if (text.trim().length === 0) return

    const { right, top, height } = rects.item(rects.length - 1)!
    const { left: offsetX, top: offsetY } = this.#iframe.getBoundingClientRect()

    // TODO: properly calculate position when iframe can scroll
    this.dispatchEvent(
      new CustomEvent("epub:selected", {
        detail: {
          text,
          context,
          cfiRange,
          position: {
            x: right + offsetX,
            y: top + offsetY - height / 2
          }
        }
      })
    )
  }

  #handleSelectionCleared = async (contents: Contents) => {
    await delay(10)
    const selection = contents.window.getSelection()
    if (selection === null || selection.isCollapsed) {
      this.dispatchEvent(new CustomEvent("epub:cleared"))
    }
  }

  // TODO: make it optional
  #handleContextMenu = (e: Event) => {
    e.preventDefault()
  }

  // TODO: improvement on context text extraction logic needed
  #getSelectedTextContext(selection: Selection) {
    const range = selection.getRangeAt(0)
    const text = range.commonAncestorContainer.textContent!

    let i = range.startOffset
    let j = range.endOffset
    while (j < text.length && !ENDING_PUNCTUATIONS.includes(text[j])) j++
    while (i > 0 && !ENDING_PUNCTUATIONS.includes(text[i - 1])) i--

    return text.slice(i, j + 1)
  }
}

const ENDING_PUNCTUATIONS = `.?!;。`

if (!customElements.get("epub-viewer")) {
  customElements.define("epub-viewer", ViewerElement)
}
