import { usePopupContext } from "@/components/reader/popup/provider"
import { IconButton } from "@/components/ui"
import { content } from "@/components/ui/styles"
import { Tabs as KTabs } from "@kobalte/core"
import { IconEdit } from "@tabler/icons-solidjs"
import { twMerge } from "tailwind-merge"

// TODO: long selected text styling

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
            <p class="text-justify text-sm leading-tight">{context()?.context}</p>
          </div>
        </div>
      </div>

      <div class={twMerge(content, "w-96")}>
        <KTabs.Root class="w-full">
          <KTabs.List class="flex h-8 w-full items-center space-x-2 rounded bg-slate-100 p-1">
            <KTabs.Trigger
              value="foo"
              class="ui-selected:text-slate-900 ui-selected:bg-white h-6 w-6 rounded p-0.5 text-xs"
            >
              Fo
            </KTabs.Trigger>
            <KTabs.Trigger
              value="bar"
              class="ui-selected:text-slate-900 ui-selected:bg-white h-6 w-6 rounded p-0.5 text-xs"
            >
              Ba
            </KTabs.Trigger>
          </KTabs.List>

          <KTabs.Content value="foo">Foo Content</KTabs.Content>
          <KTabs.Content value="bar">Bar Content</KTabs.Content>
        </KTabs.Root>
      </div>
    </div>
  )
}

export default Content
