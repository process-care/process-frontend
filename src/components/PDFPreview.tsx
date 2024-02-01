'use client'

import { useCallback, useState } from "react"
import { Text, Flex, Button } from "@chakra-ui/react"
import { Document, Page, pdfjs } from "react-pdf"
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"

// ---- STATICS

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

// ---- TYPES

interface Props {
  url: string
}

// ---- COMPONENT

export default function PDFPreview({ url }: Props): JSX.Element {
  const { isTablet } = useMediaQueries()

  const [numPages, setNumPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }, [])

  return (
    <div className="flex flex-col h-full justify-center">
      <Document className="overflow-auto border shadow-sm" file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} height={isTablet ? 400 : 900} />
      </Document>
 
      <Flex
        mt="10px"
        mb="10px"
        justifyContent="space-between"
        alignItems="center"
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
