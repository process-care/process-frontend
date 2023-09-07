import React from 'react';
import {
  useLinkToolbarButton,
  useLinkToolbarButtonState,
} from '@udecode/plate-link';

import { Icons } from '@/components/Icons.tsx'

import { ToolbarButton } from './toolbar.tsx'

export function LinkToolbarButton() {
  const state = useLinkToolbarButtonState();
  const { props } = useLinkToolbarButton(state);

  return (
    <ToolbarButton tooltip="Link" {...props}>
      <Icons.link />
    </ToolbarButton>
  );
}
