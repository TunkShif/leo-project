import { Book, Rendition, Contents, Location } from "@leo-project/epub"
import { LitElement, css, html } from "lit"
import { customElement, property, query } from "lit/decorators.js"

export type RelocatedEvent = CustomEvent<{ location: Location }>
export type SelectionChangeEvent = CustomEvent<{
  cfi: string
  selected: string
  context: {
    startOffset: number
    endOffset: number
    text: string
  }
  position: { x: number; y: number }
}>
export type SelectionClearEvent = CustomEvent<undefined>

@customElement("epub-viewer")
export class EpubViewerElement extends LitElement {
  @property()
  src: string

  @property({ attribute: "font-size" })
  fontSize: string

  /**
   * Whether to display the browser context menu. Normally the context menu is displayed when the
   * page content is right-clicked on desktop or when text is selected on mobile. We make the context
   * menu togglable in case it overlaps with the popup on some platforms (like Safari).
   */
  @property({ attribute: "context-menu", type: Boolean })
  showContextMenu: boolean

  @query("#viewer")
  private _viewer: HTMLDivElement

  private _book: Book
  private _rendition: Rendition

  private _lastSelection: boolean | null = null

  static styles = css`
    :host {
      display: block;
    }

    #viewer {
      height: 100%;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this._book = Book.from(this.src)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._removeEventListeners()
    this._book.destroy()
  }

  firstUpdated() {
    this._rendition = this._book.render(this._viewer, {
      width: "100%",
      height: "100%",
      allowScriptedContent: true
    })
    this._rendition.display()
    this._addEventListeners()
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value)
    if (name === "font-size") {
      value && this.setFontSize(value)
    }
  }

  render() {
    return html` <div id="viewer"></div> `
  }

  private _addEventListeners() {
    this._rendition.on("relocated", this._handleRelocated)
    this._rendition.on("selected", this._handleSelectionChange)
    this._rendition.hooks.content.register(this._handleContentLoaded)
  }

  private _removeEventListeners() {
    this._rendition.off("relocated", this._handleRelocated)
    this._rendition.off("selected", this._handleSelectionChange)
  }

  private _handleRelocated = (location: Location) => {
    const event: RelocatedEvent = new CustomEvent("epub:relocated", {
      detail: { location }
    })
    this.dispatchEvent(event)
  }

  private _handleSelectionChange = (cfi: string, contents: Contents) => {
    const selection = contents.window.getSelection()

    if (selection && selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0)
      const selected = range.toString()
      const text = range.commonAncestorContainer.textContent!
      const context = {
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        text
      }

      const minPadding = 40
      const width = contents.document.body.getBoundingClientRect().width
      let { top, left } = selection.getRangeAt(0).getBoundingClientRect()
      while (left >= width) {
        left = left - width
      }
      if (left < minPadding) left = minPadding

      const position = { x: left, y: top }

      const event: SelectionChangeEvent = new CustomEvent("epub:selectionchange", {
        detail: { cfi, selected, context, position }
      })

      this.dispatchEvent(event)

      this._lastSelection = true
    }
  }

  private _handleContentLoaded = (contents: Contents) => {
    contents.document.addEventListener("contextmenu", (event) => {
      if (!this.showContextMenu) event.preventDefault()
    })

    contents.document.addEventListener("selectionchange", () => {
      const selection = contents.window.getSelection()
      if (
        this._lastSelection &&
        (selection === null ||
          selection.rangeCount === 0 ||
          selection.getRangeAt(0).toString() === "")
      ) {
        const event = new CustomEvent("epub:selectionclear")
        this.dispatchEvent(event)
        this._lastSelection = null
      }
    })
  }

  jumpToPage(location: string) {
    this._rendition.display(location)
  }

  prevPage() {
    this._rendition.prev()
  }

  nextPage() {
    this._rendition.next()
  }

  setFontSize(size: string) {
    this._rendition.themes.fontSize(size)
  }

  addAnnotation(
    type: "highlight" | "underline" | "mark",
    cfi: string,
    data?: any,
    className?: string,
    styles?: object
  ) {
    this._rendition.annotations.add(type, cfi, data, undefined, className, styles)
  }

  removeAnnotation(type: "highlight" | "underline" | "mark", cfi: string) {
    this._rendition.annotations.remove(cfi, type)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "epub-viewer": EpubViewerElement
  }
}
