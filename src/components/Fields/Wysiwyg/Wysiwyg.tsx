import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useField } from "formik"
import { FormControl } from "@chakra-ui/react"

import { Plate, PlateEditor, PlateProvider, RenderAfterEditable, createPlateEditor, createPlugins } from '@udecode/plate-common';
import { createFontBackgroundColorPlugin, createFontColorPlugin, createFontSizePlugin } from "@udecode/plate-font"
import { createBasicMarksPlugin } from '@udecode/plate-basic-marks';
import { createBlockquotePlugin } from '@udecode/plate-block-quote';
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from '@udecode/plate-paragraph';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, createHeadingPlugin } from '@udecode/plate-heading';
import { ELEMENT_OL, ELEMENT_UL, createListPlugin } from '@udecode/plate-list';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';
import { createLinkPlugin } from "@udecode/plate-link";
import { ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED, createImagePlugin, createMediaEmbedPlugin } from "@udecode/plate-media";

import { createPlateUI } from '@/utils/create-plate-ui.ts'
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
import { createTablePlugin } from "@udecode/plate-table";
import { createCodeBlockPlugin } from "@udecode/plate-code-block";
import { LinkFloatingToolbar } from "./plate-ui/link-floating-toolbar.tsx"
import { ListToolbarButton } from "./plate-ui/list-toolbar-button.tsx"
import { useDebounce } from "@/utils/hooks/debounce.ts";
import { serializeHtml } from "@udecode/plate-serializer-html";

// ---- TYPES

interface Props {
  id: string;
  className?: string;
}

// ---- STATICS

const editableProps = {
  style: {
    padding: '15px',
    borderLeft: '1px solid rgb(226, 232, 240)',
    borderRight: '1px solid rgb(226, 232, 240)',
    borderBottom: '1px solid rgb(226, 232, 240)',
    backgroundColor: 'white',
    borderBottomLeftRadius: '7px',
    borderBottomRightRadius: '7px',
    fontSize: '15px',
    height: '100%',
    overflow: 'auto',
  }
};

export const plugins = createPlugins(
  [
    // Basics
    createBasicMarksPlugin(),
    createBlockquotePlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),
    createCodeBlockPlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createListPlugin(),
    // Media
    createImagePlugin(),
    createMediaEmbedPlugin(),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
        },
      },
    }),
    // Table
    createTablePlugin(),
    // Emojis & colors
    createComboboxPlugin(),
    createEmojiPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    // Align stuff
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
          ],
        },
      },
    }),
  ],
  {
    components: createPlateUI(),
  }
);

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
    <FormControl id={id} className={className}>
      <PlateProvider
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

        <Plate editableProps={editableProps}>
          <LinkFloatingToolbar />
        </Plate>
      </PlateProvider>
    </FormControl>
  );
}

// ---- HOOKS

export function useWysiwygSerializer(value: any) {
  // Create a temporary editor
  const tmpEditor = useMemo(() => createPlateEditor({ plugins }), [])

  // Serialize the html
  const html = useMemo(() => {
    if (!value) return null
    return serializeHtml(
      tmpEditor,
      {
        nodes: value,
        convertNewLinesToHtmlBr: true,
        stripWhitespace: false
      }
    )
  }, [tmpEditor, value])

  return html
}
