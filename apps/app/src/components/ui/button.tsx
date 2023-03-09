import { cva, type VariantProps } from "class-variance-authority"
import { JSX, splitProps, type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

export const button = cva(
  `inline-flex justify-center items-center font-medium rounded-sm
  transition-colors duration-200 ease-in-out focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800
   disabled:pointer-events-none disabled:opacity-60`,
  {
    variants: {
      variant: {
        solid: "shadow-sm",
        outline: "border bg-transparent shadow-sm",
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
        class: "border-slate-900/20 text-slate-800 hover:bg-slate-100 active:bg-slate-200"
      },
      {
        variant: "ghost",
        intent: "normal",
        class: "text-slate-800 hover:bg-slate-100 active:bg-slate-200"
      },
      {
        variant: "solid",
        intent: "primary",
        class: "text-white bg-autumn-500 hover:bg-autumn-600 active:bg-autumn-700"
      },
      {
        variant: "outline",
        intent: "primary",
        class: "border-autumn-900/20 text-autumn-800 hover:bg-autumn-50 active:bg-autumn-100"
      },
      {
        variant: "ghost",
        intent: "primary",
        class: "text-autumn-800 hover:bg-autumn-50 active:bg-autumn-100"
      },
      {
        variant: "solid",
        intent: "danger",
        class: "text-white bg-tomato-500 hover:bg-tomato-600 active:bg-tomato-700"
      },
      {
        variant: "outline",
        intent: "danger",
        class: "border-tomato-900/20 text-tomato-800 hover:bg-tomato-100 active:bg-tomato-200"
      },
      {
        variant: "ghost",
        intent: "danger",
        class: "text-tomato-800 hover:bg-tomato-100 active:bg-tomato-200"
      }
    ],
    defaultVariants: {
      variant: "solid",
      intent: "normal",
      size: "base"
    }
  }
)

type ButtonProps = VariantProps<typeof button> & JSX.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "intent", "size", "children"])
  const classes = twMerge(
    button({ variant: local.variant, intent: local.intent, size: local.size }),
    local.class
  )

  return (
    <button class={classes} {...rest}>
      {local.children}
    </button>
  )
}
