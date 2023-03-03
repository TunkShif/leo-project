import { cva, type VariantProps } from "class-variance-authority"
import { JSX, splitProps, type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

const iconButton = cva(
  "inline-flex justify-center items-center rounded-[0.25em] active:translate-y-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        solid: "text-white font-medium bg-navy-600 hover:bg-navy-500 shadow-sm",
        outline:
          "border text-navy-500 bg-transparent border-navy-500 hover:text-navy-600 hover:bg-slate-200 shadow-sm",
        ghost: "text-navy-500 bg-transparent hover:text-navy-600 hover:bg-slate-200"
      },
      size: {
        small: "p-0.5 h-7 w-7",
        base: "p-1 h-9 w-9",
        large: "p-1.5 h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "solid",
      size: "base"
    }
  }
)

type IconButtonProps = VariantProps<typeof iconButton> &
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string
  }

const IconButton: Component<IconButtonProps> = (props: IconButtonProps) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "label", "children"])
  const classes = twMerge(iconButton({ variant: local.variant, size: local.size }), local.class)

  return (
    <button class={classes} {...rest}>
      <span class="sr-only">{local.label}</span>
      {local.children}
    </button>
  )
}

export default IconButton
