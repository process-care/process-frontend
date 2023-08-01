import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from '@udecode/plate-code-block';
import {
  PlateElement,
  PlateLeaf,
  PlatePluginComponent,
  withProps,
} from '@udecode/plate-common';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading';
import { MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { ELEMENT_LINK } from '@udecode/plate-link';
import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
} from '@udecode/plate-list';
import { ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import {
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
} from '@udecode/plate-table';

import { BlockquoteElement } from '@/components/Fields/Wysiwyg/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/components/Fields/Wysiwyg/plate-ui/code-block-element';
import { CodeLeaf } from '@/components/Fields/Wysiwyg/plate-ui/code-leaf';
import { CodeLineElement } from '@/components/Fields/Wysiwyg/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/Fields/Wysiwyg/plate-ui/code-syntax-leaf';
import { HeadingElement } from '@/components/Fields/Wysiwyg/plate-ui/heading-element';
import { HighlightLeaf } from '@/components/Fields/Wysiwyg/plate-ui/highlight-leaf';
import { HrElement } from '@/components/Fields/Wysiwyg/plate-ui/hr-element';
import { ImageElement } from '@/components/Fields/Wysiwyg/plate-ui/image-element';
import { LinkElement } from '@/components/Fields/Wysiwyg/plate-ui/link-element';
import { ListElement } from '@/components/Fields/Wysiwyg/plate-ui/list-element';
import { MediaEmbedElement } from '@/components/Fields/Wysiwyg/plate-ui/media-embed-element';
import { ParagraphElement } from '@/components/Fields/Wysiwyg/plate-ui/paragraph-element';
import { withPlaceholders } from '@/components/Fields/Wysiwyg/plate-ui/placeholder';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/components/Fields/Wysiwyg/plate-ui/table-cell-element';
import { TableElement } from '@/components/Fields/Wysiwyg/plate-ui/table-element';
import { TableRowElement } from '@/components/Fields/Wysiwyg/plate-ui/table-row-element';
import { TodoListElement } from '@/components/Fields/Wysiwyg/plate-ui/todo-list-element';
import { withDraggables } from '@/components/Fields/Wysiwyg/plate-ui/with-draggables';

export const createPlateUI = (
  overrideByKey?: Partial<Record<string, PlatePluginComponent>>,
  {
    draggable,
    placeholder,
  }: { placeholder?: boolean; draggable?: boolean } = {}
) => {
  let components: Record<string, PlatePluginComponent> = {
    [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
    [ELEMENT_CODE_BLOCK]: CodeBlockElement,
    [ELEMENT_CODE_LINE]: CodeLineElement,
    [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
    [ELEMENT_HR]: HrElement,
    [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
    [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
    [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
    [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
    [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
    [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
    [ELEMENT_IMAGE]: ImageElement,
    [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
    [ELEMENT_LINK]: LinkElement,
    [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
    [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
    [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
    [ELEMENT_PARAGRAPH]: ParagraphElement,
    [ELEMENT_TABLE]: TableElement,
    [ELEMENT_TD]: TableCellElement,
    [ELEMENT_TH]: TableCellHeaderElement,
    [ELEMENT_TODO_LI]: TodoListElement,
    [ELEMENT_TR]: TableRowElement,
    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
    [MARK_CODE]: CodeLeaf,
    [MARK_HIGHLIGHT]: HighlightLeaf,
    [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
    [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
    [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
    [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
    [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
  };

  if (overrideByKey) {
    Object.keys(overrideByKey).forEach((key) => {
      (components as any)[key] = (overrideByKey as any)[key];
    });
  }

  if (placeholder) {
    components = withPlaceholders(components);
  }
  if (draggable) {
    components = withDraggables(components);
  }

  return components;
};
