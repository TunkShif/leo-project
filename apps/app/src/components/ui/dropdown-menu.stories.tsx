import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconPointFilled
} from "@tabler/icons-solidjs"
import { createSignal } from "solid-js"
import type { Meta, StoryObj } from "storybook-solidjs"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "./dropdown-menu"

const DropdownMenuExample = () => {
  const [showGitLog, setShowGitLog] = createSignal(true)
  const [showHistory, setShowHistory] = createSignal(false)
  const [branch, setBranch] = createSignal("main")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger variant="outline" as={Button}>
        <span class="mr-1.5">Git Settings</span>
        <DropdownMenuIcon>
          <IconChevronDown size={20} />
        </DropdownMenuIcon>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent data-left-slot>
          <DropdownMenuItem>
            Commit <div class="ml-auto pl-5">⌘+K</div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Push <div class="ml-auto pl-5">⇧+⌘+K</div>
          </DropdownMenuItem>

          <DropdownMenuItem isDisabled>
            Update Project <div class="ml-auto pl-5">⌘+T</div>
          </DropdownMenuItem>

          <DropdownMenuSub overlap gutter={4} shift={-8}>
            <DropdownMenuSubTrigger>
              GitHub
              <div class="ml-auto pl-5">
                <IconChevronRight size={20} />
              </div>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Create Pull Request…</DropdownMenuItem>

                <DropdownMenuItem>View Pull Requests</DropdownMenuItem>

                <DropdownMenuItem>Sync Fork</DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>Open on GitHub</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem isChecked={showGitLog()} onCheckedChange={setShowGitLog}>
            <DropdownMenuItemIndicator>
              <IconCheck size={16} />
            </DropdownMenuItemIndicator>
            Show Git Log
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem isChecked={showHistory()} onCheckedChange={setShowHistory}>
            <DropdownMenuItemIndicator>
              <IconCheck size={16} />
            </DropdownMenuItemIndicator>
            Show History
          </DropdownMenuCheckboxItem>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuGroupLabel>Branches</DropdownMenuGroupLabel>

            <DropdownMenuRadioGroup value={branch()} onValueChange={setBranch}>
              <DropdownMenuRadioItem value="main">
                <DropdownMenuItemIndicator>
                  <IconPointFilled size={16} />
                </DropdownMenuItemIndicator>
                main
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="develop">
                <DropdownMenuItemIndicator>
                  <IconPointFilled size={16} />
                </DropdownMenuItemIndicator>
                develop
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>

          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

const meta = {
  title: "Overlays/DropdownMenu",
  component: DropdownMenuExample,
  tags: ["autodoc"]
} satisfies Meta<typeof DropdownMenuExample>

export default meta

type Story = StoryObj<typeof DropdownMenuExample>

export const Default: Story = {}
