import { useCallback, useMemo, useRef } from "react";
import { useFormikContext } from "formik";
import { FormControl } from "@chakra-ui/react";

import { Plate, PlateEditor, PlateProvider, RenderAfterEditable, createPlateEditor, createPlugins, deserializeHtml } from '@udecode/plate-common';
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
import { serializeHtml } from '@udecode/plate-serializer-html';

import { QuestionRedux } from "@/redux/slices/types";

import { createPlateUI } from '@/utils/create-plate-ui';
import { Toolbar, ToolbarGroup } from "@/components/Fields/Wysiwyg/plate-ui/toolbar";
import { TooltipProvider } from "./plate-ui/tooltip";
import { TurnIntoDropdownMenu } from "./plate-ui/turn-into-dropdown-menu";
import { TableDropdownMenu } from "./plate-ui/table-dropdown-menu";
import { MediaToolbarButton } from "./plate-ui/media-toolbar-button";
import { LinkToolbarButton } from "./plate-ui/link-toolbar-button";
import { AlignDropdownMenu } from "./plate-ui/align-dropdown-menu";
import { EmojiDropdownMenu } from "./plate-ui/emoji-dropdown-menu";
import { MoreDropdownMenu } from "./plate-ui/more-dropdown-menu";

import MarkGroup from "./MarkGroup";
import ColorGroup from "./ColorGroup";
import { createTablePlugin } from "@udecode/plate-table";
import { createCodeBlockPlugin } from "@udecode/plate-code-block";
import { LinkFloatingToolbar } from "./plate-ui/link-floating-toolbar";
import { ListToolbarButton } from "./plate-ui/list-toolbar-button";
import { createFontBackgroundColorPlugin, createFontColorPlugin, createFontSizePlugin } from "@udecode/plate-font";

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

const plugins = createPlugins(
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
  const { setFieldValue, values } = useFormikContext<QuestionRedux>();
  const editorRef = useRef<PlateEditor | null>(null);

  const initialValue = useMemo(() => {
    const tmpEditor = createPlateEditor({ plugins })
    return deserializeHtml(tmpEditor, {
      // @ts-ignore : values type is weird ?
      element: values[id],
    });
  }, [])

  const onChange = useCallback((value: any) => {
    const editor = editorRef.current
    if (!editor) return

    const html = serializeHtml(editor, { nodes: editor?.children, convertNewLinesToHtmlBr: true, stripWhitespace: false });
    setFieldValue(id, html);
  }, [id, setFieldValue])

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
      
      {/* <div>
        <JoditReact
          config={{
            uploader: {
              insertImageAsBase64URI: true,
            },
            enableDragAndDropFileToEditor: true,
          }}
        />
      </div> */}
    </FormControl>
  );
};
