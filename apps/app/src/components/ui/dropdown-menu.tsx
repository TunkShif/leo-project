import { styled } from "@/utils/styling"
import { DropdownMenu as KDropdownMenu } from "@kobalte/core"
import { content, item, label, separator } from "./styles"

const items = [
  item,
  "group-data-[left-slot]/root:pl-6 ui-highlighted:bg-slate-100 dark:ui-highlighted:bg-slate-700 ui-disabled:opacity-50 ui-disabled:cursor-not-allowed select-none"
]

const indicator = /* tw */ `absolute inline-flex justify-center items-center w-6 left-0`

export const DropdownMenu = KDropdownMenu.Root

export const DropdownMenuArrow = KDropdownMenu.Arrow

export const DropdownMenuCheckboxItem = styled(KDropdownMenu.CheckboxItem, ...items)

export const DropdownMenuContent = styled(KDropdownMenu.Content, content, "min-w-[10rem]")

export const DropdownMenuGroup = KDropdownMenu.Group

export const DropdownMenuGroupLabel = styled(KDropdownMenu.GroupLabel, label)

export const DropdownMenuIcon = KDropdownMenu.Icon

export const DropdownMenuItem = styled(KDropdownMenu.Item, ...items)

export const DropdownMenuItemDescription = KDropdownMenu.ItemDescription

export const DropdownMenuItemIndicator = styled(KDropdownMenu.ItemIndicator, indicator)

export const DropdownMenuItemLabel = KDropdownMenu.ItemLabel

export const DropdownMenuPortal = KDropdownMenu.Portal

export const DropdownMenuRadioGroup = KDropdownMenu.RadioGroup

export const DropdownMenuRadioItem = styled(KDropdownMenu.RadioItem, ...items)

export const DropdownMenuSeparator = styled(KDropdownMenu.Separator, separator, "-mx-2 my-1.5")

export const DropdownMenuSub = KDropdownMenu.Sub

export const DropdownMenuSubContent = styled(KDropdownMenu.SubContent, content, "min-w-[10rem]")

export const DropdownMenuSubTrigger = styled(KDropdownMenu.SubTrigger, ...items)

export const DropdownMenuTrigger = KDropdownMenu.Trigger
