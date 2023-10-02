'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  useColorDropdownMenu,
  useColorDropdownMenuState,
} from '@udecode/plate-font';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/Fields/Wysiwyg/plate-ui/dropdown-menu.tsx'
import { ToolbarButton } from '@/components/Fields/Wysiwyg/plate-ui/toolbar.tsx'

import { DEFAULT_COLORS, DEFAULT_CUSTOM_COLORS } from './color-constants.ts'
import { ColorPicker } from './color-picker.tsx'

export type TColor = {
  name: string;
  value: string;
  isBrightColor: boolean;
};

type ColorDropdownMenuProps = {
  nodeType: string;
  tooltip?: string;
} & DropdownMenuProps;

export function ColorDropdownMenu({
  nodeType,
  tooltip,
  children,
}: ColorDropdownMenuProps) {
  const state = useColorDropdownMenuState({
    nodeType,
    colors: DEFAULT_COLORS,
    customColors: DEFAULT_CUSTOM_COLORS,
    closeOnSelect: true,
  });

  const { menuProps, buttonProps } = useColorDropdownMenu(state);

  return (
    <DropdownMenu modal={false} {...menuProps}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltip={tooltip} {...buttonProps}>
          {children}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className='z-[2000]'>
        <ColorPicker
          color={state.selectedColor || state.color}
          colors={state.colors}
          customColors={state.customColors}
          updateColor={state.updateColorAndClose}
          updateCustomColor={state.updateColor}
          clearColor={state.clearColor}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}