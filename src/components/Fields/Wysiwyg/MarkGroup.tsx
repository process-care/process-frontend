import { MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE, MARK_STRIKETHROUGH, MARK_CODE } from "@udecode/plate-basic-marks";

import { Icons } from "@/components/icons";
import { MarkToolbarButton } from "./plate-ui/mark-toolbar-button";
import { ToolbarGroup } from "./plate-ui/toolbar";

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