import { Text, Flex, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface Props {
  url: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PdfPreview: React.FC<Props> = ({ url }) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} height={600} />
      </Document>
      <Flex
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="5px "
      >
        {pageNumber !== 1 ? (
          <Button
            variant="rounded"
            backgroundColor="black"
            p="0"
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            {"<"}
          </Button>
        ) : (
          <p></p>
        )}

        <Text variant="xs">
          Page {pageNumber} sur {numPages}
        </Text>
        {pageNumber !== numPages ? (
          <Button
            variant="rounded"
            backgroundColor="black"
            p="0"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            {">"}
          </Button>
        ) : (
          <p></p>
        )}
      </Flex>
    </div>
  );
};
