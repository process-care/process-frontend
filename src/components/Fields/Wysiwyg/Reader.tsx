import { useEffect, useRef } from "react"

import { Plate, PlateEditor, PlateContent, createPlugins } from '@udecode/plate-common'
import { createPlateUI } from '@/components/Fields/Wysiwyg/create-plate-ui.ts'
import { basePlugins } from "./plugins.ts"

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

export default function WysiwygReader({ content }: Props): JSX.Element {
  const editorRef = useRef<PlateEditor | null>(null)
  
  useEffect(() => {
    console.log('content is new')
    console.log('content : ', content)
  }, [content])

  return (
    <Plate
      editorRef={editorRef}
      plugins={plugins}
      value={content}
    >
      <PlateContent
        className="text-base h-full overflow-auto text-left"
        readOnly={true}
      />
    </Plate>
  )
}
