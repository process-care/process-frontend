import React from 'react';
import { useOutdentButton } from '@udecode/plate-indent';

import { Icons } from '@/components/icons.tsx'

import { ToolbarButton } from './toolbar.tsx'

export function OutdentToolbarButton() {
  const { props } = useOutdentButton();

  return (
    <ToolbarButton tooltip="Outdent" {...props}>
      <Icons.outdent />
    </ToolbarButton>
  );
}
