import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font"

import { Icons, iconVariants } from "@/components/Icons.tsx"
import { ToolbarGroup } from "./plate-ui/toolbar.tsx"
import { ColorDropdownMenu } from "./plate-ui/color-dropdown-menu.tsx"

export default function MarkGroup (): JSX.Element {
  return (
    <ToolbarGroup>
      <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Couleur du texte">
        <Icons.color className={iconVariants({ variant: 'toolbar' })} />
      </ColorDropdownMenu>

      <ColorDropdownMenu
        nodeType={MARK_BG_COLOR}
        tooltip="Couleur de fond"
      >
        <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
      </ColorDropdownMenu>
    </ToolbarGroup>
  )
}