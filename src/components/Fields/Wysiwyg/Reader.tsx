import { useEffect, useRef } from "react"

import { Plate, PlateEditor, PlateContent, createPlugins } from '@udecode/plate-common'
import { createPlateUI } from '@/components/Fields/Wysiwyg/create-plate-ui.ts'
import { basePlugins } from "./plugins.ts"
import { cn } from "@/utils/ui.ts"

// ---- TYPES

interface Props {
  className?: string
  content: any
}

// ---- STATICS

export const plugins = createPlugins(
  basePlugins,
  {
    components: createPlateUI(),
  }
)

// ---- COMPONENT

export default function WysiwygReader({ className, content }: Props): JSX.Element {
  const editorRef = useRef<PlateEditor | null>(null)

  // Hack to reload the content of the reader when content changes
  // See : https://github.com/udecode/plate/discussions/2206
  useEffect(() => {
    if (!editorRef.current?.children) return
    editorRef.current.children = content ?? []
    editorRef.current.onChange()
  }, [content])

  return (
    <Plate
      editorRef={editorRef}
      plugins={plugins}
      initialValue={content}
    >
      <PlateContent
        className={cn(
          "text-base h-full overflow-auto text-left",
          className
        )}
        readOnly={true}
      />
    </Plate>
  )
}
