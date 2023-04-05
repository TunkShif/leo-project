import { Title } from "@solidjs/meta"
import { Component, JSX, children, createMemo } from "solid-js"

type Slot = {
  slot: string
  props: SlotProps
}

type PageProps = {
  title: string
  children: JSX.Element
}

type SlotProps = {
  children: JSX.Element
}

export const Actions: Component<SlotProps> = (props) => {
  return {
    slot: "actions",
    props
  } as unknown as JSX.Element
}

export const Content: Component<SlotProps> = (props) => {
  return {
    slot: "content",
    props
  } as unknown as JSX.Element
}

export const Page: Component<PageProps> = (props) => {
  const resolvedChildren = children(() => props.children)
  const slots = createMemo(() => resolvedChildren.toArray() as unknown[] as Slot[])
  const actions = createMemo(() => slots().find((it) => it.slot === "actions")?.props.children)
  const content = createMemo(() => slots().find((it) => it.slot === "content")?.props.children)

  return (
    <>
      <Title>{props.title} - Leo Reader</Title>
      <header class="sticky top-0 z-10 flex w-full items-center justify-between border-b-[1px] border-slate-900/10 bg-white py-3 px-6 dark:border-white/10 dark:bg-slate-800/90">
        <div class="text-strong text-lg font-semibold">{props.title}</div>
        <div class="space-x-0.5">{actions()}</div>
      </header>
      <main class="p-8">{content()}</main>
    </>
  )
}
