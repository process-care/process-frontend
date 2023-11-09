import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { MARK_CODE, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import {
  focusEditor,
  toggleMark,
  usePlateEditorState,
} from '@udecode/plate-common';

import { Icons } from '@/components/icons.tsx'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu.tsx'
import { ToolbarButton } from './toolbar.tsx'

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = usePlateEditorState();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={true} {...openState} {...props}>
      <DropdownMenuTrigger asChild type="button">
        <ToolbarButton pressed={openState.open} tooltip="Insert" type="button">
          <Icons.more />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="z-[2000] flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto"
      >
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key:  MARK_UNDERLINE,
              clear: MARK_UNDERLINE,
            });
            focusEditor(editor);
          }}
        >
          <Icons.underline className="mr-2 h-5 w-5" />
          Souligné
          {/* (⌘+,) */}
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key:  MARK_STRIKETHROUGH,
              clear: MARK_STRIKETHROUGH,
            });
            focusEditor(editor);
          }}
        >
          <Icons.strikethrough className="mr-2 h-5 w-5" />
          Rayé
          {/* (⌘+,) */}
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key:  MARK_CODE,
              clear: MARK_CODE,
            });
            focusEditor(editor);
          }}
        >
          <Icons.code className="mr-2 h-5 w-5" />
          Bloc de code
          {/* (⌘+,) */}
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key:  MARK_SUPERSCRIPT,
              clear: MARK_SUPERSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <Icons.superscript className="mr-2 h-5 w-5" />
          Exposant
          {/* (⌘+,) */}
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUBSCRIPT,
              clear: MARK_SUBSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <Icons.subscript className="mr-2 h-5 w-5" />
          Annotation
          {/* (⌘+.) */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
