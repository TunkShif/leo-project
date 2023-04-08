import type { Meta, StoryObj } from "storybook-solidjs"
import { Button } from "./button"

const meta = {
  title: "Inputs/Button",
  component: Button,
  tags: ["autodoc"],
  argTypes: {
    variant: {
      options: ["solid", "outline", "ghost"],
      control: { type: "select" }
    },
    intent: {
      options: ["normal", "primary", "danger"],
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
    intent: "normal",
    children: "Button"
  }
}

export const Outline: Story = {
  args: {
    size: "base",
    variant: "outline",
    intent: "normal",
    children: "Button"
  }
}

export const Ghost: Story = {
  args: {
    size: "base",
    variant: "ghost",
    intent: "normal",
    children: "Button"
  }
}
