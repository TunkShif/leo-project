import { Button as KButton } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"
import { splitProps, type Component, type ComponentProps } from "solid-js"
import { twMerge } from "tailwind-merge"
import { button } from "./button"

export const iconButton = cva("font-normal", {
  variants: {
    size: {
      small: "p-0.5 h-7 w-7",
      base: "p-1 h-9 w-9",
      large: "p-1.5 h-11 w-11",
      none: ""
    }
  },
  defaultVariants: {
    size: "base"
  }
})

type IconButtonProps = VariantProps<typeof button> &
  ComponentProps<typeof KButton.Root> & {
    label: string
  }

export const IconButton: Component<IconButtonProps> = (props: IconButtonProps) => {
  const [local, rest] = splitProps(props, [
    "class",
    "variant",
    "intent",
    "size",
    "label",
    "children"
  ])
  const classes = twMerge(
    button({ variant: local.variant, intent: local.intent, size: "none" }),
    iconButton({ size: local.size }),
    local.class
  )

  return (
    <KButton.Root class={classes} {...rest}>
      <span class="sr-only">{local.label}</span>
      {local.children}
    </KButton.Root>
  )
}
