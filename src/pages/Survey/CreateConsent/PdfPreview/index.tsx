import React, { useState } from "react";
import { Document, Page } from "react-pdf";

interface Props {
  url: string;
}

export const PdfPreview: React.FC<Props> = ({ url }) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} sur {numPages}
      </p>
    </div>
  );
};
