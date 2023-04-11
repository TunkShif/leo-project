/* @refresh reload */
import { render } from "solid-js/web"

import { App } from "@leo-project/common"

import "@/prerender"
import "@leo-project/common/dist/index.css"

const root = document.getElementById("root")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  )
}

// TODO: render root after service registration is done
render(() => <App />, root!)
