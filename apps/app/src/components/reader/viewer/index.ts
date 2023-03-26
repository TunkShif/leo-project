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
export type SelectedEvent = CustomEvent<{
  text: string
  cfiRange: CFIRange
  position: { x: number; y: number }
}>

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
    this._handleSelected = this._handleSelected.bind(this)
    this._handleMouseEvent = this._handleMouseEvent.bind(this)
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
    this._rendition.on("selected", this._handleSelected)

    this._rendition.hooks.content.register((contents: Contents) => {
      console.debug("[epub-viewer] register content hook")
      contents.document.addEventListener("click", this._handleMouseEvent)
    })
  }

  private _removeEventListeners() {
    this._rendition.off("relocated", this._handleRelocated)
    this._rendition.off("selected", this._handleSelected)

    this._rendition.hooks.content.clear()
  }

  private _handleRelocated(location: Location) {
    this.dispatchEvent(new CustomEvent("epub:relocated", { detail: location }))
  }

  private _handleSelected(cfiRange: string, contents: Contents) {
    const selection = contents.window.getSelection()!
    const text = selection.toString()

    const { right, top, height } = selection.getRangeAt(0).getClientRects().item(0)!
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

  private _handleMouseEvent(event: MouseEvent) {
    // [TODO) to be implemented
    console.log(event)
  }
}

customElements.define("epub-viewer", ViewerElement)
