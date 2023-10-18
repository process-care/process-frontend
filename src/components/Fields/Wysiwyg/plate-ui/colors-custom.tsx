'use client';

import React from 'react';
import { useColorsCustom, useColorsCustomState } from '@udecode/plate-font';

import { buttonVariants } from '@/components/Fields/Wysiwyg/plate-ui/button.tsx'
import { DropdownMenuItem } from '@/components/Fields/Wysiwyg/plate-ui/dropdown-menu.tsx'

import { TColor } from './color-dropdown-menu.tsx'
import { ColorDropdownMenuItems } from './color-dropdown-menu-items.tsx'
import { ColorInput } from './color-input.tsx'

type ColorsCustomProps = {
  color?: string;
  colors: TColor[];
  customColors: TColor[];
  updateCustomColor: (color: string) => void;
  updateColor: (color: string) => void;
};

export function ColorsCustom({
  color,
  colors,
  customColors,
  updateColor,
  updateCustomColor,
}: ColorsCustomProps) {
  const state = useColorsCustomState({
    color,
    colors,
    customColors,
    updateCustomColor,
  });
  const { inputProps, menuItemProps } = useColorsCustom(state);

  return (
    <div className="flex flex-col gap-4">
      <ColorInput {...inputProps}>
        <DropdownMenuItem
          className={buttonVariants({
            variant: 'outline',
            isMenu: true,
          })}
          {...menuItemProps}
        >
          CUSTOM
        </DropdownMenuItem>
      </ColorInput>

      <ColorDropdownMenuItems
        color={color}
        colors={state.computedColors}
        updateColor={updateColor}
      />
    </div>
  );
}
