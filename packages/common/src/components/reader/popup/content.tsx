import { usePopupContext } from "@/components/reader/popup/provider"
import { IconButton } from "@/components/ui"
import { IconEdit } from "@tabler/icons-solidjs"

// TODO: long selected text styling

const Content = () => {
  const context = usePopupContext()

  return (
    <div class="flex flex-col space-y-1">
      <div class="flex items-center justify-between">
        <div class="text-strong font-medium">{context()?.text}</div>
        <div class="flex-shrink-0">
          <IconButton label="Edit" size="small" variant="ghost">
            <IconEdit />
          </IconButton>
        </div>
      </div>
      <div>
        <p class="text-justify text-sm leading-tight">{context()?.context}</p>
      </div>
      <div>[]</div>
    </div>
  )
}

export default Content
