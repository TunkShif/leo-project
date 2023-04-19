import { usePopupContext } from "@/components/reader/popup/provider"
import { IconButton } from "@/components/ui"
import { content } from "@/components/ui/styles"
import { Tabs as KTabs } from "@kobalte/core"
import { IconEdit } from "@tabler/icons-solidjs"
import { onMount } from "solid-js"
import { twMerge } from "tailwind-merge"

// TODO: long selected text styling

const Foo = () => {
  onMount(() => {
    console.log("Foo mounted")
  })
  return <div>foo</div>
}

const Bar = () => {
  onMount(() => {
    console.log("Bar mounted")
  })
  return <div>bar</div>
}

const Content = () => {
  const context = usePopupContext()

  return (
    <div class="space-y-1">
      <div class={twMerge(content, "w-96 px-4 pb-4 pt-2")}>
        <div class="flex flex-col space-y-1">
          <div class="flex items-center justify-between">
            <div class="text-strong font-medium">{context()?.text}</div>

            <div class="flex-shrink-0">
              <IconButton label="Edit" size="small" variant="ghost">
                <IconEdit />
              </IconButton>
            </div>
          </div>

          <div>
            <p class="text-sm leading-tight">{context()?.context}</p>
          </div>
        </div>
      </div>

      <div class={twMerge(content, "w-96")}>
        <KTabs.Root class="w-full">
          <KTabs.List class="inline-flex h-8 items-center space-x-2 rounded-sm bg-slate-100 p-1 shadow-sm dark:bg-slate-700 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
            <KTabs.Trigger
              value="foo"
              class="ui-selected:text-slate-900 ui-selected:bg-white dark:ui-selected:bg-slate-200 h-6 rounded-sm px-1.5 text-xs"
            >
              SpanishDict
            </KTabs.Trigger>
            <KTabs.Trigger
              value="bar"
              class="ui-selected:text-slate-900 ui-selected:bg-white dark:ui-selected:bg-slate-200 h-6 rounded-sm px-1.5 text-xs"
            >
              Bar
            </KTabs.Trigger>
          </KTabs.List>

          <div class="p-2 pt-4">
            <KTabs.Content value="foo">
              <Foo />
            </KTabs.Content>
            <KTabs.Content value="bar">
              <Bar />
            </KTabs.Content>
          </div>
        </KTabs.Root>
      </div>
    </div>
  )
}

export default Content
