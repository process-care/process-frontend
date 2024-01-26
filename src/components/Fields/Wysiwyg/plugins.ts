import { createAlignPlugin } from "@udecode/plate-alignment";
import { createBasicMarksPlugin } from "@udecode/plate-basic-marks";
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import { createSoftBreakPlugin } from "@udecode/plate-break";
import { createCodeBlockPlugin, ELEMENT_CODE_BLOCK } from "@udecode/plate-code-block";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { RenderAfterEditable } from "@udecode/plate-common";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import { createFontColorPlugin, createFontBackgroundColorPlugin, createFontSizePlugin } from "@udecode/plate-font";
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from "@udecode/plate-heading";
import { createHighlightPlugin } from "@udecode/plate-highlight";
import { createLinkPlugin } from "@udecode/plate-link";
import { createListPlugin } from "@udecode/plate-list";
import { createImagePlugin, createMediaEmbedPlugin, ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from "@udecode/plate-media";
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { createSelectOnBackspacePlugin } from "@udecode/plate-select";
import { ELEMENT_TD, createTablePlugin } from "@udecode/plate-table";
import { LinkFloatingToolbar } from "./plate-ui/link-floating-toolbar";

export const basePlugins = [
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
  createSoftBreakPlugin({
    options: {
      rules: [
        { hotkey: 'shift+enter' },
        {
          hotkey: 'enter',
          query: {
            allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
          },
        },
      ],
    },
  }),
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
  createHighlightPlugin(),
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
]