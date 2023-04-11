import { usePopupContext } from "@/components/reader/popup/provider"

const Content = () => {
  const context = usePopupContext()

  return (
    <div class="flex flex-col space-y-2">
      <div class="flex justify-between">
        <div>{context()?.text}</div>
        <div>...</div>
      </div>
      <div class="rounded bg-gray-50">
        <p class="text-sm">{context()?.context}</p>
      </div>
      <div>[]</div>
    </div>
  )
}

export default Content
