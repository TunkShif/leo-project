import { As } from "@kobalte/core"
import { IconX } from "@tabler/icons-solidjs"
import type { Meta, StoryObj } from "storybook-solidjs"
import { Button } from "./button"
import { IconButton } from "./icon-button"
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger
} from "./popover"

const PopoverExample = () => (
  <Popover>
    <PopoverTrigger asChild>
      <As component={Button} variant="outline">
        Open
      </As>
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent>
        <PopoverArrow />

        <PopoverTitle>About Kobalte</PopoverTitle>

        <PopoverDescription class="mt-2">
          A UI toolkit for building accessible web apps and design systems with SolidJS.
        </PopoverDescription>

        <PopoverCloseButton asChild>
          <As component={IconButton} label="Close" variant="ghost" size="small">
            <IconX size={16} />
          </As>
        </PopoverCloseButton>
      </PopoverContent>
    </PopoverPortal>
  </Popover>
)

const meta = {
  title: "Overlays/Popover",
  component: PopoverExample,
  tags: ["autodoc"]
} satisfies Meta<typeof PopoverExample>

export default meta

type Story = StoryObj<typeof PopoverExample>

export const Default: Story = {}
