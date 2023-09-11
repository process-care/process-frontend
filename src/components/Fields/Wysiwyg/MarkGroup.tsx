import { MARK_BOLD, MARK_ITALIC } from "@udecode/plate-basic-marks";

import { Icons } from "@/components/icons.tsx"
import { MarkToolbarButton } from "./plate-ui/mark-toolbar-button.tsx"
import { ToolbarGroup } from "./plate-ui/toolbar.tsx"

export default function MarkGroup (): JSX.Element {
  return (
    <ToolbarGroup>
      <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
        <Icons.bold />
      </MarkToolbarButton>

      <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
        <Icons.italic />
      </MarkToolbarButton>
    </ToolbarGroup>
  )
}