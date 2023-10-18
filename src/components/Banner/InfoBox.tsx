import { ReactNode } from 'react';
import { InfoIcon } from 'lucide-react';

import { cn } from '@/utils/ui.ts'

type Props = {
  className?: string;
  children: ReactNode
}

export default function InfoBox({ className, children }: Props) {
  return (
    <div className={cn(className)}>
      <div className="flex items-center rounded-md bg-blue-50 p-5">
        <div className="flex-shrink-0">
          <InfoIcon className="h-7 w-7 text-blue-400" aria-hidden="true" />
        </div>

        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}
