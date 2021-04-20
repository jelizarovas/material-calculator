import React, { useState, memo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PreviewPDF = memo(({ pdf } = {}) => {
  console.log("previewRerender");
  // const { url = process.env.PUBLIC_URL + "/pdf/bol-sfm-fonts.pdf" } = pdf;
  // const [data, setData] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  //   const hasMovedCursor = typeof x === "number" && typeof y === "number";

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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

  // if (!!pdf?.data) return <div>no data</div>;

  return (
    <div className="bg-white p-4 rounded-md">
      <Document
        file={!!pdf?.data ? { data: pdf.data } : pdf?.url}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas"
        onClick={getCoordinates}
      >
        <Page pageNumber={pageNumber} className="flex" />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button className="p-1" onclick={() => setPageNumber((page) => page--)}>
        prev page
      </button>
      <button onclick={() => setPageNumber((page) => page++)}>net page</button>
      <h1>{`coordinate: x: ${coordinates.x}, y: ${coordinates.y}.`}</h1>
    </div>
  );
});
