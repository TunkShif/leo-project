import Button from "@/components/ui/button"
import type { Meta, StoryObj } from "storybook-solidjs"

const meta = {
  title: "Inputs/Button",
  component: Button,
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
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Solid: Story = {
  args: {
    size: "base",
    variant: "solid",
    children: "Button"
  }
}

export const Subtle: Story = {
  args: {
    size: "base",
    variant: "outline",
    children: "Button"
  }
}

export const Ghost: Story = {
  args: {
    size: "base",
    variant: "ghost",
    children: "Button"
  }
}
