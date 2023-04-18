/* @refresh reload */
import { App, Leo } from "@leo-project/common"
import { BookService } from "@leo-project/web"
import { render } from "solid-js/web"

import "@leo-project/common/dist/index.css"

Leo.register("book-service", new BookService())

const root = document.getElementById("root")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  )
}

render(() => <App />, root!)
