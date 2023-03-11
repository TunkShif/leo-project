import { styled } from "@/utils/styling"
import { DropdownMenu as KDropdownMenu } from "@kobalte/core"
import { content } from "./shared"

const item = /* tw */ `relative flex items-center px-2 group-data-[left-slot]:pl-6 py-1.5 h-8
             text-sm text-strong leading-none rounded outline-none
             focus:bg-slate-100 ui-highlighted:bg-slate-100 dark:ui-highlighted:bg-slate-700
             ui-disabled:opacity-50 ui-disabled:cursor-not-allowed cursor-default select-none`

const separator = /* tw */ `-mx-2 my-1.5 h-px bg-slate-200 dark:bg-slate-700 border-none`

const label = /* tw */ `inline-block px-2 py-1.5 h-8 text-sm font-medium text-slate-500 dark:text-slate-400 select-none`

const indicator = /* tw */ `absolute inline-flex justify-center items-center w-6 left-0`

export const DropdownMenu = KDropdownMenu.Root

export const DropdownMenuArrow = KDropdownMenu.Arrow

export const DropdownMenuCheckboxItem = styled(KDropdownMenu.CheckboxItem, item)

export const DropdownMenuContent = styled(KDropdownMenu.Content, content, "min-w-[10rem]")

export const DropdownMenuGroup = KDropdownMenu.Group

export const DropdownMenuGroupLabel = styled(KDropdownMenu.GroupLabel, label)

export const DropdownMenuIcon = KDropdownMenu.Icon

export const DropdownMenuItem = styled(KDropdownMenu.Item, item)

export const DropdownMenuItemDescription = KDropdownMenu.ItemDescription

export const DropdownMenuItemIndicator = styled(KDropdownMenu.ItemIndicator, indicator)

export const DropdownMenuItemLabel = KDropdownMenu.ItemLabel

export const DropdownMenuPortal = KDropdownMenu.Portal

export const DropdownMenuRadioGroup = KDropdownMenu.RadioGroup

export const DropdownMenuRadioItem = styled(KDropdownMenu.RadioItem, item)

export const DropdownMenuSeparator = styled(KDropdownMenu.Separator, separator)

export const DropdownMenuSub = KDropdownMenu.Sub

export const DropdownMenuSubContent = styled(KDropdownMenu.SubContent, content, "min-w-[10rem]")

export const DropdownMenuSubTrigger = styled(KDropdownMenu.SubTrigger, item)

export const DropdownMenuTrigger = KDropdownMenu.Trigger
