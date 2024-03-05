'use client'

import { useCallback, useState } from "react"
import { Text, Flex, Button } from "@chakra-ui/react"
import { Document, Page, pdfjs } from "react-pdf"
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import { cn } from "@/utils/ui"

// ---- STATICS

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

// ---- TYPES

interface Props {
  url: string
}

// ---- COMPONENT

export default function PDFPreview({ url }: Props): JSX.Element {
  const [numPages, setNumPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }, [])

  return (
    <div className="flex flex-col h-full w-full max-w-fit justify-center self-center min-h-[500px]">
      <Document className="overflow-auto w-full h-full self-center" file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} className={cn(
          "m-auto w-fit h-full overflow-auto border shadow-sm",
        )}/>
      </Document>
 
      <Flex
        className="mt-[10px] w-full justify-between items-center self-center"
      >
        {pageNumber !== 1 ? (
          <Button variant="rounded" backgroundColor="black" p="0" onClick={() => setPageNumber(pageNumber - 1)}>
            {"<"}
          </Button>
        ) : (
          <p className="w-[40px]"></p>
        )}

        <Text variant="xs">
          Page {pageNumber} sur {numPages}
        </Text>
        {pageNumber !== numPages ? (
          <Button variant="rounded" backgroundColor="black" p="0" onClick={() => setPageNumber(pageNumber + 1)}>
            {">"}
          </Button>
        ) : (
          <p className="w-[40px]"></p>
        )}
      </Flex>
    </div>
  )
}
