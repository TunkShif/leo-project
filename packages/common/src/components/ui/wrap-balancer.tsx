// ported from https://github.com/shuding/react-wrap-balancer
import { JSX, onCleanup, onMount, type Component } from "solid-js"

type BalancerProps = {
  ratio?: number
  children: JSX.Element
}

const Balancer: Component<BalancerProps> = (props) => {
  let ref!: HTMLElement
  let observer: ResizeObserver | null = null

  const relayout = (ratio = 1) => {
    const container = ref.parentElement!
    const update = (width: number) => (ref.style.maxWidth = width + "px")

    ref.style.maxWidth = ""

    const width = ref.clientWidth
    const height = ref.clientHeight

    let lower: number = width / 2 - 0.25
    let upper: number = width + 0.5
    let middle: number

    if (width) {
      while (lower + 1 < upper) {
        middle = Math.round((lower + upper) / 2)
        update(middle)
        if (container.clientHeight === height) {
          upper = middle
        } else {
          lower = middle
        }
      }

      update(upper * ratio + width * (1 - ratio))
    }

    if (!observer) {
      observer = new ResizeObserver(() => relayout(ratio))
      observer.observe(container)
    }
  }

  onMount(() => {
    setTimeout(() => relayout(props.ratio), 0)

    onCleanup(() => {
      observer?.disconnect()
    })
  })

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        "vertical-align": "top",
        "text-decoration": "inherit"
      }}
    >
      {props.children}
    </span>
  )
}

export default Balancer
