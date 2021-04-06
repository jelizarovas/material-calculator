import React, { useState, memo } from "react";
import { getFormattedDate } from "../../utils/helperFunctions";
import download from "downloadjs";
import { Document, Page, pdfjs } from "react-pdf";
import { fillBOLForm } from "../../utils/fillBOLForm";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PreviewPDF = memo(({ pdf } = {}) => {
  const [data, setData] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  //   const hasMovedCursor = typeof x === "number" && typeof y === "number";

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const url = pdf?.url || process.env.PUBLIC_URL + "/pdf/bol-sfm-fonts.pdf";

  const getCoordinates = (e) => {
    console.log("getcoordinates");
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    setCoordinates({ x: x.toFixed(2), y: -(y - 792).toFixed(2) });
    // console.log("Left? : " + x + " ; Top? : " + -(y - 792) + ".");
  };

  //   const getPreview = async () => {
  //     // const newData = await fillBOLForm();
  //     return setData(newData);
  //   };

  //   const downloadNow = async () => {
  //     download(await fillBOLForm(), `${getFormattedDate(new Date())}.pdf`, "application/pdf");
  //   };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={data ? { data } : url}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas"
        onClick={getCoordinates}
      >
        <Page pageNumber={pageNumber} className="flex" />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <h1>{`coordinate: x: ${coordinates.x}, y: ${coordinates.y}.`}</h1>
    </div>
  );
});
