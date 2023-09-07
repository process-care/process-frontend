import React from 'react';
import { PlateElement, PlateElementProps } from '@udecode/plate-common';

import { cn } from '@/utils/ui.ts'

export interface PlateTableRowElementProps extends PlateElementProps {
  hideBorder?: boolean;
}

const TableRowElement = React.forwardRef<
  React.ElementRef<typeof PlateElement>,
  PlateTableRowElementProps
>(({ hideBorder, children, ...props }, ref) => {
  return (
    <PlateElement
      asChild
      ref={ref}
      className={cn('h-full', hideBorder && 'border-none')}
      {...props}
    >
      <tr>{children}</tr>
    </PlateElement>
  );
});
TableRowElement.displayName = 'TableRowElement';

export { TableRowElement };
