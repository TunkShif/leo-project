import { IconCopy } from "@tabler/icons-solidjs"
import type { Meta, StoryObj } from "storybook-solidjs"
import { IconButton } from "./icon-button"

const meta = {
  title: "Inputs/IconButton",
  component: IconButton,
  tags: ["autodoc"],
  argTypes: {
    variant: {
      options: ["primary"],
      control: { type: "select" }
    },
    size: {
      options: ["small", "base", "large"],
      control: { type: "select" }
    },
    disabled: { control: { type: "boolean" }, defaultValue: false }
  }
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Solid: Story = {
  args: {
    size: "base",
    variant: "solid",
    label: "Copy",
    children: <IconCopy />
  }
}

export const Outline: Story = {
  args: {
    size: "base",
    variant: "outline",
    label: "Copy",
    children: <IconCopy />
  }
}

export const Ghost: Story = {
  args: {
    size: "base",
    variant: "ghost",
    label: "Copy",
    children: <IconCopy />
  }
}
