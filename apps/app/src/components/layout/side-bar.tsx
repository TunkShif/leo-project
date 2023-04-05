import { A } from "@solidjs/router"
import { IconBooks, IconHistory, IconPuzzle } from "@tabler/icons-solidjs"
import { For } from "solid-js"

const navigations = [
  {
    name: "Recent",
    href: "/recent",
    Icon: IconHistory
  },
  {
    name: "Books",
    href: "/books",
    Icon: IconBooks
  },
  {
    name: "Plugins",
    href: "/plugins",
    Icon: IconPuzzle
  }
]

const SideBar = () => {
  return (
    <div class="fixed inset-y-0 w-64 flex-shrink-0 border-r-[1px] border-slate-900/10 bg-white p-4 dark:border-white/10 dark:bg-slate-800/90">
      <div class="text-strong h-16 text-lg font-medium">
        <A href="/">Leo</A>
      </div>
      <nav>
        <ul class="mt-8 space-y-1">
          <For each={navigations}>
            {({ name, href, Icon }) => (
              <li>
                <A
                  href={href}
                  activeClass="bg-slate-100 dark:bg-slate-700"
                  class="text-strong inline-flex h-9 w-full items-center rounded px-2 py-1.5 leading-none transition-colors hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                >
                  <span class="mr-2">
                    <Icon size={24} />
                  </span>
                  <span class="font-medium">{name}</span>
                </A>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
