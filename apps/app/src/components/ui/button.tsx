import { cva, type VariantProps } from "class-variance-authority"
import { JSX, splitProps, type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

export const button = cva(
  `inline-flex justify-center items-center font-medium rounded-[0.25rem]
  transition-colors duration-200 ease-in-out focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800
  focus-visible:ring-autumn-300 disabled:pointer-events-none disabled:opacity-60`,
  {
    variants: {
      variant: {
        solid: "text-white bg-autumn-500 hover:bg-autumn-600 active:bg-autumn-700 shadow-sm",
        outline:
          "border border-autumn-900/20 text-autumn-800 bg-transparent hover:bg-autumn-50 active:bg-autumn-100 shadow-sm",
        ghost: "text-autumn-800 bg-transparent hover:bg-autumn-50 active:bg-autumn-100"
      },
      size: {
        small: "px-2 h-7 text-sm",
        base: "px-3 h-9",
        large: "px-4 h-11 text-lg"
      }
    },
    defaultVariants: {
      variant: "solid",
      size: "base"
    }
  }
)

type ButtonProps = VariantProps<typeof button> & JSX.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "children"])
  const classes = twMerge(button({ variant: local.variant, size: local.size }), local.class)

  return (
    <button class={classes} {...rest}>
      {local.children}
    </button>
  )
}
