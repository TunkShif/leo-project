import { createStore } from "solid-js/store"

export type PopupStore = {
  open: boolean
}

export type ViewerStore = {
  fontSize: number
}

const [popupStore, setPopupStore] = createStore<PopupStore>({
  open: false
})

const [viewerStore, setViewerStore] = createStore<ViewerStore>({
  fontSize: 100
})

export const usePopupStore = () => [popupStore, setPopupStore] as const
export const useViewerStore = () => [viewerStore, setViewerStore] as const
