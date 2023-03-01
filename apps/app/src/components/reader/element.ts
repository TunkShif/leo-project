import { createBook, RenderedBook } from "@/libs/book"
import { css, html, LitElement } from "lit"
import { customElement, property, query } from "lit/decorators.js"
import type { JSX } from "solid-js"

export type RenderedEvent = CustomEvent<{ book: RenderedBook }>

@customElement("epub-viewer")
export class EpubViewerElement extends LitElement {
  declare book: RenderedBook

  @property()
  declare src: string

  @query("#viewer")
  declare viewer: HTMLDivElement

  static styles = css`
    :host {
      display: block;
    }

    #viewer {
      height: 100%;
    }
  `

  override render() {
    return html` <div id="viewer"></div> `
  }

  override firstUpdated() {
    createBook(this.src)
      .render(this.viewer)
      .then((rendered) => {
        this.book = rendered
        this.dispatchEvent(new CustomEvent("ready", { detail: { book: rendered } }))
      })
  }

  override disconnectedCallback() {
    super.disconnectedCallback()
    this.book.destroy()
  }
}

type EpubViewerElementProps = JSX.HTMLAttributes<HTMLElement> & {
  src: string
}

declare global {
  interface HTMLElementTagNameMap {
    "epub-viewer": EpubViewerElement
  }
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "epub-viewer": EpubViewerElementProps
    }
  }
}
