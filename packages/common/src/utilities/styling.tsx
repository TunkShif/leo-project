import { splitProps, type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

type Styled = <ComponentType extends Component<any>>(
  Component: ComponentType,
  ...baseClasses: string[]
) => typeof Component

export const styled: Styled =
  (Component, ...baseClasses) =>
  // @ts-ignore
  (props: Record<string, any>) => {
    const [local, rest] = splitProps(props, ["class"])
    return <Component class={twMerge(...baseClasses, local.class)} {...rest} />
  }
