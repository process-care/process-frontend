import { useState } from "react";
import { Text, Flex, Button, Box } from "@chakra-ui/react";
import { Document, Page, pdfjs } from "react-pdf";

import { useMediaQueries } from "@/utils/hooks/mediaqueries";

// ---- STATICS

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// ---- TYPES

interface Props {
  url: string;
}

// ---- COMPONENT

export default function PDFPreview({ url }: Props): JSX.Element {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const { isTablet } = useMediaQueries();
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Box h="100%" overflow="auto">
      <Box mb="20px">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} height={isTablet ? 400 : 900} />
        </Document>
      </Box>
      
      <Flex
        display="flex"
        justifyContent="space-between"
        // mb="50px"
        h="150px"
        mt="-40px"
        alignItems="center"
        // pos="fixed"
        // w="49%"
        // bottom="0"
        // backgroundColor="white"
        // h="85px"
      >
        {pageNumber !== 1 ? (
          <Button variant="rounded" backgroundColor="black" p="0" onClick={() => setPageNumber(pageNumber - 1)}>
            {"<"}
          </Button>
        ) : (
          <p></p>
        )}

        <Text variant="xs">
          Page {pageNumber} sur {numPages}
        </Text>
        {pageNumber !== numPages ? (
          <Button variant="rounded" backgroundColor="black" p="0" onClick={() => setPageNumber(pageNumber + 1)}>
            {">"}
          </Button>
        ) : (
          <p></p>
        )}
      </Flex>
    </Box>
  );
};
