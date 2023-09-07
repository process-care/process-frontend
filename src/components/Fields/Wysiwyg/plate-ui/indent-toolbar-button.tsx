import React from 'react';
import { useIndentButton } from '@udecode/plate-indent';

import { Icons } from '@/components/Icons.tsx'

import { ToolbarButton } from './toolbar.tsx'

export function IndentToolbarButton() {
  const { props } = useIndentButton();

  return (
    <ToolbarButton tooltip="Indent" {...props}>
      <Icons.indent />
    </ToolbarButton>
  );
}
