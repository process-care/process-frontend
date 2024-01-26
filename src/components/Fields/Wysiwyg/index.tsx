import { useCallback, useEffect, useRef, useState } from "react"
import { useField } from "formik"

import { Plate, PlateEditor, PlateContent, createPlugins } from '@udecode/plate-common'
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list'
import { LinkFloatingToolbar } from "./plate-ui/link-floating-toolbar.tsx"
import { ListToolbarButton } from "./plate-ui/list-toolbar-button.tsx"
import { useDebounce } from "@/utils/hooks/debounce.ts"

import { createPlateUI } from '@/components/Fields/Wysiwyg/create-plate-ui.ts'
import { Toolbar, ToolbarGroup } from "@/components/Fields/Wysiwyg/plate-ui/toolbar.tsx"
import { TooltipProvider } from "./plate-ui/tooltip.tsx"
import { TurnIntoDropdownMenu } from "./plate-ui/turn-into-dropdown-menu.tsx"
import { TableDropdownMenu } from "./plate-ui/table-dropdown-menu.tsx"
import { MediaToolbarButton } from "./plate-ui/media-toolbar-button.tsx"
import { LinkToolbarButton } from "./plate-ui/link-toolbar-button.tsx"
import { AlignDropdownMenu } from "./plate-ui/align-dropdown-menu.tsx"
import { EmojiDropdownMenu } from "./plate-ui/emoji-dropdown-menu.tsx"
import { MoreDropdownMenu } from "./plate-ui/more-dropdown-menu.tsx"
import MarkGroup from "./MarkGroup.tsx"
import ColorGroup from "./ColorGroup.tsx"
import { basePlugins } from "./plugins.ts"

// ---- TYPES

interface Props {
  id: string
  className?: string
}

// ---- STATICS

const styles = {
  padding: '15px',
  borderLeft: '1px solid rgb(226, 232, 240)',
  borderRight: '1px solid rgb(226, 232, 240)',
  borderBottom: '1px solid rgb(226, 232, 240)',
  backgroundColor: 'white',
  borderBottomLeftRadius: '7px',
  borderBottomRightRadius: '7px',
  overflow: 'auto',
  maxHeight: 'calc(100vh - 330px)',
}

export const plugins = createPlugins(
  basePlugins,
  {
    components: createPlateUI(),
  }
)

// ---- COMPONENT

export default function Wysiwyg({ id, className }: Props): JSX.Element {
  const editorRef = useRef<PlateEditor | null>(null)
  const [_field, { initialValue, error }, { setValue }] = useField(id)
  const [rawValue, setRawValue] = useState<any>(null)
  const debouncedValue = useDebounce(rawValue, 500)

  if (error) console.error(error)

  // Update internale state on keystrokes
  const onChange = useCallback((input: any) => {
    setRawValue(input)
  }, [])

  // Update the field (which triggers an update) only on debounced value change
  useEffect(() => {
    if (debouncedValue) setValue(debouncedValue)
  }, [debouncedValue, id, setValue])

  return (
    <Plate
      editorRef={editorRef}
      plugins={plugins}
      initialValue={initialValue}
      onChange={onChange}
    >
      <TooltipProvider>
        <div className="border-[1px] rounded-t-[7px]">
          <Toolbar className="rounded-t-[7px] bg-slate-100">
            <TurnIntoDropdownMenu />

            <MarkGroup />
            <MoreDropdownMenu />

            <ToolbarGroup>
              <ListToolbarButton nodeType={ELEMENT_UL} />
              <ListToolbarButton nodeType={ELEMENT_OL} />
              <AlignDropdownMenu />
            </ToolbarGroup>
          </Toolbar>

          <Toolbar className="border-t-[1px] bg-slate-100">
            <ToolbarGroup noSeparator>
              <LinkToolbarButton />
              <EmojiDropdownMenu />
            </ToolbarGroup>

            <ColorGroup />

            <ToolbarGroup>
              <MediaToolbarButton />
              <TableDropdownMenu />
            </ToolbarGroup>
          </Toolbar>
        </div>
      </TooltipProvider>

      <PlateContent
        style={styles}
        className="text-base"
      />

      <LinkFloatingToolbar />
    </Plate>
  )
}
