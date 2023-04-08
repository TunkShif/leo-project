import { useReader } from "@/components/reader/provider"
import { IconButton, Popover, PopoverContent, PopoverPortal, PopoverTrigger } from "@/components/ui"
import { As, Collapsible as KCollapsible } from "@kobalte/core"
import { EPUB } from "@leo-project/core"
import { IconChevronRight, IconList } from "@tabler/icons-solidjs"
import type { NavItem } from "epubjs"
import { For, Match, Show, Switch, createResource, type Component } from "solid-js"

// TODO: scrollbar styling
// FIXME: nav item width shift

type ContentsItemProps = {
  item: NavItem
  onItemClick: (href: string) => void
}

const ContentsItem: Component<ContentsItemProps> = (props) => {
  const hasSubItems = () => props.item.subitems?.length ?? 0 > 0

  return (
    <Switch>
      <Match when={hasSubItems()}>
        <li>
          <KCollapsible.Root>
            <div class="flex w-full items-center overflow-x-hidden rounded">
              <KCollapsible.Trigger class="group inline-flex h-6 w-6 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                <IconChevronRight
                  size={18}
                  class="ui-group-expanded:rotate-90 transition-all duration-300"
                />
              </KCollapsible.Trigger>
              <button
                class="-ml-1 h-6 w-full flex-1 rounded px-1.5 py-1 text-start text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => props.onItemClick(props.item.href)}
              >
                <span class="inline-block w-[90%] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                  {props.item.label}
                </span>
              </button>
            </div>
            <KCollapsible.Content>
              <ul class="my-1 ml-2 space-y-1">
                <For each={props.item.subitems}>
                  {(item) => <ContentsItem item={item} onItemClick={props.onItemClick} />}
                </For>
              </ul>
            </KCollapsible.Content>
          </KCollapsible.Root>
        </li>
      </Match>

      <Match when={!hasSubItems()}>
        <li>
          <div class="flex w-full items-center overflow-x-hidden rounded">
            <button
              class="ml-5 h-6 w-full flex-1 select-none rounded px-1.5 py-1 text-start text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
              onClick={() => props.onItemClick(props.item.href)}
            >
              <span class="inline-block w-[90%] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                {props.item.label}
              </span>
            </button>
          </div>
        </li>
      </Match>
    </Switch>
  )
}

const Contents: Component = () => {
  const book = useReader()
  const navPath = () => book.packaging.navPath || book.packaging.ncxPath
  const [toc] = createResource(() => book.loaded.navigation.then((nav) => nav.toc))

  const handleNavigation = (href: string) =>
    book.rendition.display(EPUB.resolveNavHref(href, navPath()))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <As component={IconButton} variant="ghost" label="Contents">
          <IconList />
        </As>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent class="w-80 px-2 py-2" onOpenAutoFocus={(e) => e.preventDefault()}>
          <h2 class="text-subtle select-none px-2 text-sm font-medium">CONTENTS</h2>

          <ul class="mt-2 max-h-96 space-y-1 overflow-y-auto">
            <Show when={!toc.loading}>
              <For each={toc()!}>
                {(item) => <ContentsItem item={item} onItemClick={handleNavigation} />}
              </For>
            </Show>
          </ul>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

export default Contents
