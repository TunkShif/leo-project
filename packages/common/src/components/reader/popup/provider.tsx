import type { SelectionChangedEvent } from "@/components/reader/viewer"
import { createContext, useContext, type Accessor } from "solid-js"

const PopupContext = createContext<Accessor<SelectionChangedEvent["detail"] | undefined>>()

export const PopupProvider = PopupContext.Provider

export const usePopupContext = () => useContext(PopupContext)!
