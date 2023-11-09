'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import {
  useAlignDropdownMenu,
  useAlignDropdownMenuState,
} from '@udecode/plate-alignment';

import { Icons, iconVariants } from '@/components/icons.tsx'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu.tsx'
import { ToolbarButton } from './toolbar.tsx'

const items = [
  {
    value: 'left',
    icon: Icons.alignLeft,
  },
  {
    value: 'center',
    icon: Icons.alignCenter,
  },
  {
    value: 'right',
    icon: Icons.alignRight,
  },
  {
    value: 'justify',
    icon: Icons.alignJustify,
  },
];

export interface AlignDropdownMenuProps extends DropdownMenuProps {}

export function AlignDropdownMenu({
  children,
  ...props
}: AlignDropdownMenuProps) {
  const state = useAlignDropdownMenuState();
  const { radioGroupProps } = useAlignDropdownMenu(state);

  const openState = useOpenState();
  const IconValue =
    items.find((item) => item.value === radioGroupProps.value)?.icon ??
    Icons.alignLeft;

  // console.log('AlignDropdownMenu', props, state, radioGroupProps, children)

  return (
    <DropdownMenu modal={true} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Align" isDropdown>
          <IconValue />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="z-[2000] min-w-0">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          {...radioGroupProps}
        >
          {items.map(({ value: itemValue, icon: Icon }) => (
            <DropdownMenuRadioItem key={itemValue} value={itemValue} hideIcon>
              <Icon className={iconVariants({ variant: 'toolbar' })} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
