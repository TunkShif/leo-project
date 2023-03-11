import { styled } from "@/utils/styling"
import { Popover as KPopover } from "@kobalte/core"
import { content } from "./shared"

export const Popover = KPopover.Root

export const PopoverTrigger = KPopover.Trigger

export const PopoverAnchor = KPopover.Anchor

export const PopoverPortal = KPopover.Portal

export const PopoverContent = styled(KPopover.Content, content, "p-4 w-72")

export const PopoverArrow = KPopover.Arrow

export const PopoverCloseButton = styled(KPopover.CloseButton, "absolute top-2 right-2")

export const PopoverTitle = styled(KPopover.Title, "text-strong font-medium")

export const PopoverDescription = styled(KPopover.Description, "text-sm")
