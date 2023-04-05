import { type AppCore, createApp } from "@/core"

declare global {
  // eslint-disable-next-line no-var
  var Leo: AppCore
}

window.Leo = createApp()
