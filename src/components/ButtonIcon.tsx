import { cn } from "@/utils/ui"
import { LucideIcon } from "lucide-react"

// ---- PROPS

interface Props {
  type?: "round" | "plain" | "delete"
  icon: LucideIcon
  color?: string
  size?: number
  className?: string
  onClick?: () => void
}

// ---- COMPONENT

export default function ButtonIcon({ type = "round", icon : Icon, color, size, className, ...props }: Props): JSX.Element {
  const { variant, defaultSize } = variants(type)

  return (
    <div className={cn(
      className,
      variant,
      "cursor-pointer transition-all duration-200"
    )} {...props}>
      <Icon
        size={(Boolean(size)) ? size : defaultSize}
      />
    </div>
  )
}

// ---- UTILS

function variants(type: string) {
  switch (type) {
    case "delete":
      return { variant: "rounded-full bg-gray-300 hover:bg-red-500 p-[4px] text-white", defaultSize: 14 }

    case "round":
      return { variant: "rounded-full bg-black hover:bg-process-blue p-[4px] text-white", defaultSize: 14 }

    case "plain":
    default:
      return { variant: "text-black hover:text-process-blue", defaultSize: 24 }
  }
}