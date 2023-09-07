'use client';

import React from 'react';

import { cn } from '@/utils/ui.ts'
import { buttonVariants } from '@/components/Fields/Wysiwyg/plate-ui/button.tsx'
import { DropdownMenuItem } from '@/components/Fields/Wysiwyg/plate-ui/dropdown-menu.tsx'
import { Separator } from '@/components/Fields/Wysiwyg/plate-ui/separator.tsx'

import { TColor } from './color-dropdown-menu.tsx'
import { ColorDropdownMenuItems } from './color-dropdown-menu-items.tsx'
import { ColorsCustom } from './colors-custom.tsx'

type ColorPickerProps = {
  color?: string;
  colors: TColor[];
  customColors: TColor[];
  updateColor: (color: string) => void;
  updateCustomColor: (color: string) => void;
  clearColor: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ColorPickerContent({
  color,
  colors,
  customColors,
  updateColor,
  updateCustomColor,
  clearColor,
  className,
  ...props
}: ColorPickerProps) {
  return (
    <div className={cn('flex flex-col gap-4 p-4', className)} {...props}>
      <ColorsCustom
        color={color}
        colors={colors}
        customColors={customColors}
        updateColor={updateColor}
        updateCustomColor={updateCustomColor}
      />

      <Separator />

      <ColorDropdownMenuItems
        color={color}
        colors={colors}
        updateColor={updateColor}
      />
      {color && (
        <DropdownMenuItem
          className={buttonVariants({
            variant: 'outline',
            isMenu: true,
          })}
          onClick={clearColor}
        >
          Clear
        </DropdownMenuItem>
      )}
    </div>
  );
}

export const ColorPicker = React.memo(
  ColorPickerContent,
  (prev, next) =>
    prev.color === next.color &&
    prev.colors === next.colors &&
    prev.customColors === next.customColors
);
