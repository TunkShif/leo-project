import { Button as KButton } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"
import { splitProps, type Component, type ComponentProps } from "solid-js"
import { twMerge } from "tailwind-merge"

export const button = cva(
  `inline-flex justify-center items-center font-medium rounded-sm
  transition-colors duration-200 ease-in-out focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800
   disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        solid: "shadow-sm",
        outline: "border bg-white dark:bg-transparent shadow-sm dark:shadow-inner",
        ghost: "bg-transparent",
        none: ""
      },
      intent: {
        normal: "focus-visible:ring-slate-500",
        primary: "focus-visible:ring-autumn-300",
        danger: "focus-visible:ring-tomato-300",
        none: ""
      },
      size: {
        small: "px-2 h-7 text-xs",
        base: "px-3 h-9 text-sm",
        large: "px-4 h-11 text-base",
        none: ""
      }
    },
    compoundVariants: [
      {
        variant: "solid",
        intent: "normal",
        class: "text-white bg-slate-600 hover:bg-slate-700 active:bg-slate-800"
      },
      {
        variant: "outline",
        intent: "normal",
        class: `border-slate-900/20 dark:border-white/20 text-strong
                hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600`
      },
      {
        variant: "ghost",
        intent: "normal",
        class:
          "text-strong hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600"
      },
      {
        variant: "solid",
        intent: "primary",
        class: "text-white bg-autumn-500 hover:bg-autumn-600 active:bg-autumn-700"
      },
      {
        variant: "outline",
        intent: "primary",
        class: `border-autumn-900/20 dark:border-autumn-100/20 text-autumn-800 dark:text-autumn-300 dark:hover:text-autumn-200
                hover:bg-autumn-50 dark:hover:bg-autumn-800 active:bg-autumn-100 dark:active:bg-autumn-700`
      },
      {
        variant: "ghost",
        intent: "primary",
        class: `text-autumn-800 dark:text-autumn-300 dark:hover:text-autumn-200
                hover:bg-autumn-50 dark:hover:bg-autumn-800 active:bg-autumn-100 dark:active:bg-autumn-700`
      },
      {
        variant: "solid",
        intent: "danger",
        class: "text-white bg-tomato-500 hover:bg-tomato-600 active:bg-tomato-700"
      },
      {
        variant: "outline",
        intent: "danger",
        class: `border-tomato-900/20 dark:border-tomato-100/20 text-tomato-800 dark:text-tomato-400 dark:hover:text-tomato-300
                hover:bg-tomato-100 dark:hover:bg-tomato-800 active:bg-tomato-200 dark:active:bg-tomato-700`
      },
      {
        variant: "ghost",
        intent: "danger",
        class: `text-tomato-800 dark:text-tomato-400 dark:hover:text-tomato-300
                hover:bg-tomato-100 dark:hover:bg-tomato-800 active:bg-tomato-200 dark:active:bg-tomato-700`
      }
    ],
    defaultVariants: {
      variant: "solid",
      intent: "normal",
      size: "base"
    }
  }
)

type ButtonProps = VariantProps<typeof button> & ComponentProps<typeof KButton.Root>

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "intent", "size", "children"])
  const classes = () =>
    twMerge(button({ variant: local.variant, intent: local.intent, size: local.size }), local.class)

  return (
    <KButton.Root class={classes()} {...rest}>
      {local.children}
    </KButton.Root>
  )
}
