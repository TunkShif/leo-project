import { delay } from "@/utils/async"
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
  cfiRange: CFIRange
  position: { x: number; y: number }
}>
export type SelectionClearedEvent = CustomEvent<undefined>

export class ViewerElement extends HTMLElement {
  private declare _book: Book
  private declare _rendition: Rendition

  private _viewer: HTMLDivElement

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

    this._viewer = viewer

    shadow.appendChild(style)
    shadow.appendChild(viewer)

    this._handleRelocated = this._handleRelocated.bind(this)
    this._handleSelectionChanged = this._handleSelectionChanged.bind(this)
    this._handleSelectionCleared = this._handleSelectionCleared.bind(this)
    this._handleContextMenu = this._handleContextMenu.bind(this)
  }

  async render(book: Book) {
    this._book = book
    this._rendition = book.renderTo(this._viewer, {
      width: "100%",
      height: "100%",
      allowScriptedContent: true
    })
    await this._rendition.display()
    this._addEventListeners()
  }

  disconnectedCallback() {
    this._removeEventListeners()
    this._rendition.destroy()
  }

  private get _iframe() {
    return this.shadowRoot!.querySelector("iframe")!
  }

  private _addEventListeners() {
    this._rendition.on("relocated", this._handleRelocated)
    this._rendition.on("selected", this._handleSelectionChanged)

    this._rendition.hooks.content.register((contents: Contents) => {
      console.debug("[epub-viewer] register content hook")
      contents.document.addEventListener("selectionchange", () =>
        this._handleSelectionCleared(contents)
      )
      contents.document.addEventListener("contextmenu", this._handleContextMenu)
    })
  }

  private _removeEventListeners() {
    this._rendition.off("relocated", this._handleRelocated)
    this._rendition.off("selected", this._handleSelectionChanged)

    this._rendition.hooks.content.clear()
  }

  private _handleRelocated(location: Location) {
    this.dispatchEvent(new CustomEvent("epub:relocated", { detail: location }))
  }

  private _handleSelectionChanged(cfiRange: string, contents: Contents) {
    const selection = contents.window.getSelection()!
    const text = selection.toString()
    const rects = selection.getRangeAt(0).getClientRects()

    const { right, top, height } = rects.item(rects.length - 1)!
    const { left: offsetX, top: offsetY } = this._iframe.getBoundingClientRect()

    this.dispatchEvent(
      new CustomEvent("epub:selected", {
        detail: {
          text,
          cfiRange,
          position: {
            x: right + offsetX,
            y: top + offsetY - height / 2
          }
        }
      })
    )
  }

  private async _handleSelectionCleared(contents: Contents) {
    await delay(10)
    const selection = contents.window.getSelection()
    if (selection === null || selection.isCollapsed) {
      this.dispatchEvent(new CustomEvent("epub:cleared"))
    }
  }

  private _handleContextMenu(e: Event) {
    console.log(e)
    e.preventDefault()
  }
}

customElements.define("epub-viewer", ViewerElement)
