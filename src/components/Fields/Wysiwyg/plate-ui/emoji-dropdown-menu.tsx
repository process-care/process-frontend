import React from 'react';
import {
  EmojiDropdownMenuOptions,
  useEmojiDropdownMenuState,
} from '@udecode/plate-emoji';

import { Icons } from '@/components/icons.tsx'
import { EmojiToolbarDropdown } from '@/components/Fields/Wysiwyg/plate-ui/emoji-toolbar-dropdown.tsx'
import {
  ToolbarButton,
  ToolbarButtonProps,
} from '@/components/Fields/Wysiwyg/plate-ui/toolbar.tsx'

import { emojiCategoryIcons, emojiSearchIcons } from './emoji-icons.tsx'
import { EmojiPicker } from './emoji-picker.tsx'

type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions;
} & ToolbarButtonProps;

export function EmojiDropdownMenu({
  options,
  ...props
}: EmojiDropdownMenuProps) {
  const { isOpen, setIsOpen, emojiPickerState } =
    useEmojiDropdownMenuState(options);

  return (
    <EmojiToolbarDropdown
      control={
        <ToolbarButton pressed={isOpen} isDropdown tooltip="Emoji" {...props}>
          <Icons.emoji />
        </ToolbarButton>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <EmojiPicker
        {...emojiPickerState}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        icons={{
          categories: emojiCategoryIcons,
          search: emojiSearchIcons,
        }}
        settings={options?.settings}
      />
    </EmojiToolbarDropdown>
  );
}