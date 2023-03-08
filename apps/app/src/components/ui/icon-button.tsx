import { cva, type VariantProps } from "class-variance-authority"
import { JSX, splitProps, type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

export const iconButton = cva(
  `inline-flex justify-center items-center rounded-[0.25rem]
  transition-colors duration-200 ease-in-out focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800
  focus-visible:ring-autumn-300 disabled:pointer-events-none disabled:opacity-60`,
  {
    variants: {
      variant: {
        solid: "text-white bg-autumn-500 hover:bg-autumn-600 active:bg-autumn-700 shadow-sm",
        outline:
          "border border-autumn-900/20 text-autumn-700 bg-transparent hover:bg-autumn-50 active:bg-autumn-100 shadow-sm",
        ghost: "text-autumn-700 bg-transparent hover:bg-autumn-50 active:bg-autumn-100"
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

export const IconButton: Component<IconButtonProps> = (props: IconButtonProps) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "label", "children"])
  const classes = twMerge(iconButton({ variant: local.variant, size: local.size }), local.class)

  return (
    <button class={classes} {...rest}>
      <span class="sr-only">{local.label}</span>
      {local.children}
    </button>
  )
}
