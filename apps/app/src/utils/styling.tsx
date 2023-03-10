import type { createPolymorphicComponent } from "@kobalte/core"
import { splitProps } from "solid-js"
import { twMerge } from "tailwind-merge"

type PolymorphicComponent = ReturnType<typeof createPolymorphicComponent>
type Styled = <ComponentType extends PolymorphicComponent>(
  Component: ComponentType,
  baseClasses: string
) => typeof Component

// @ts-ignore
export const styled: Styled = (Component, baseClasses) => (props: Record<string, any>) => {
  const [local, rest] = splitProps(props, ["class"])
  return <Component class={twMerge(baseClasses, local.class)} {...rest} />
}
