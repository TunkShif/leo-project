import { cva, type VariantProps } from "class-variance-authority"
import { JSX, splitProps, type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

const button = cva(
  "inline-flex justify-center items-center font-medium rounded-[0.25em] active:translate-y-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        solid: "text-white bg-navy-600 hover:bg-navy-500 shadow-sm",
        outline:
          "border text-navy-500 bg-transparent border-navy-500 hover:text-navy-600 hover:bg-slate-200 shadow-sm",
        ghost: "text-navy-500 bg-transparent hover:text-navy-600 hover:bg-slate-200"
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

const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "children"])
  const classes = twMerge(button({ variant: local.variant, size: local.size }), local.class)

  return (
    <button class={classes} {...rest}>
      {local.children}
    </button>
  )
}

export default Button
