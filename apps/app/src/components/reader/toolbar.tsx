import { A } from "@solidjs/router"
import { useReaderContext } from "./context"

const Toolbar = () => {
  const { theme } = useReaderContext()!

  return (
    <header class="sticky inset-x-0 top-0 z-10 flex h-12 items-center justify-between border-b-[1px] border-gray-200 bg-white/90 px-2 backdrop-blur-sm">
      <div>
        <A href="/">back</A>
      </div>
      <h1 class="text-lg font-medium">Title</h1>
      <div>
        <div>settings</div>
        <button onClick={theme.increaseFontSize}>+</button>
        <button onClick={theme.decreaseFontSize}>-</button>
      </div>
    </header>
  )
}

export default Toolbar
