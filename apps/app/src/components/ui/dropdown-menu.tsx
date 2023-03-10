import { styled } from "@/utils/styling"
import { DropdownMenu as DropdownMenuPrimitives } from "@kobalte/core"

const content = /* tw */ `group p-2 min-w-[10rem] z-50 bg-white
                border border-slate-900/10 text-slate-800
                rounded-sm shadow-sm overflow-hidden`

const item = /* tw */ `relative flex items-center px-2 group-data-[left-slot]:pl-6 py-1.5 h-8 text-sm text-slate-800 rounded
             outline-none focus:bg-slate-100 ui-highlighted:bg-slate-100 ui-disabled:opacity-50
             leading-none cursor-default ui-disabled:cursor-not-allowed select-none`

const separator = /* tw */ `-mx-2 my-1 h-px bg-slate-100`

const label = /* tw */ `inline-block px-2 py-1.5 h-8 text-sm font-medium text-slate-500 select-none`

const indicator = /* tw */ `absolute inline-flex justify-center items-center w-6 left-0`

export const DropdownMenu = DropdownMenuPrimitives.Root

export const DropdownMenuArrow = styled(DropdownMenuPrimitives.Arrow, "z-50")

export const DropdownMenuCheckboxItem = styled(DropdownMenuPrimitives.CheckboxItem, item)

export const DropdownMenuContent = styled(DropdownMenuPrimitives.Content, content)

export const DropdownMenuGroup = DropdownMenuPrimitives.Group

export const DropdownMenuGroupLabel = styled(DropdownMenuPrimitives.GroupLabel, label)

export const DropdownMenuIcon = DropdownMenuPrimitives.Icon

export const DropdownMenuItem = styled(DropdownMenuPrimitives.Item, item)

export const DropdownMenuItemDescription = DropdownMenuPrimitives.ItemDescription

export const DropdownMenuItemIndicator = styled(DropdownMenuPrimitives.ItemIndicator, indicator)

export const DropdownMenuItemLabel = DropdownMenuPrimitives.ItemLabel

export const DropdownMenuPortal = DropdownMenuPrimitives.Portal

export const DropdownMenuRadioGroup = DropdownMenuPrimitives.RadioGroup

// @ts-ignore Why is the compiler complaining here, WTF?
export const DropdownMenuRadioItem = styled(DropdownMenuPrimitives.RadioItem, item)

export const DropdownMenuSeparator = styled(DropdownMenuPrimitives.Separator, separator)

export const DropdownMenuSub = DropdownMenuPrimitives.Sub

export const DropdownMenuSubContent = styled(DropdownMenuPrimitives.SubContent, content)

export const DropdownMenuSubTrigger = styled(DropdownMenuPrimitives.SubTrigger, item)

export const DropdownMenuTrigger = DropdownMenuPrimitives.Trigger
