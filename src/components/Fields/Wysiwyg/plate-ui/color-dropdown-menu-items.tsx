'use client';

import React from 'react';
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/utils/ui.ts'
import { Icons } from '@/components/Icons.tsx'
import { buttonVariants } from '@/components/Fields/Wysiwyg/plate-ui/button.tsx'
import { DropdownMenuItem } from '@/components/Fields/Wysiwyg/plate-ui/dropdown-menu.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/Fields/Wysiwyg/plate-ui/tooltip.tsx'

import { TColor } from './color-dropdown-menu.tsx'

type ColorDropdownMenuItemProps = {
  value: string;
  isBrightColor: boolean;
  isSelected: boolean;
  updateColor: (color: string) => void;
  name?: string;
} & DropdownMenuItemProps;

export function ColorDropdownMenuItem({
  name,
  value,
  isBrightColor,
  isSelected,
  updateColor,
  className,
  ...props
}: ColorDropdownMenuItemProps) {
  const content = (
    <DropdownMenuItem
      className={cn(
        buttonVariants({
          variant: 'outline',
          isMenu: true,
        }),
        'h-6 w-6 border border-solid border-muted p-0',
        !isBrightColor && 'border-transparent text-white',
        className
      )}
      style={{ backgroundColor: value }}
      onSelect={(e) => {
        e.preventDefault();
        updateColor(value);
      }}
      {...props}
    >
      {isSelected ? <Icons.check /> : null}
    </DropdownMenuItem>
  );

  return name ? (
    <Tooltip>
      <TooltipTrigger>{content}</TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  ) : (
    content
  );
}

type ColorDropdownMenuItemsProps = {
  color?: string;
  colors: TColor[];
  updateColor: (color: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ColorDropdownMenuItems({
  color,
  colors,
  updateColor,
  className,
  ...props
}: ColorDropdownMenuItemsProps) {
  return (
    <div
      className={cn('grid grid-cols-[repeat(10,1fr)] gap-1', className)}
      {...props}
    >
      {colors.map(({ name, value, isBrightColor }) => (
        <ColorDropdownMenuItem
          key={name ?? value}
          name={name}
          value={value}
          isBrightColor={isBrightColor}
          isSelected={color === value}
          updateColor={updateColor}
        />
      ))}
    </div>
  );
}
