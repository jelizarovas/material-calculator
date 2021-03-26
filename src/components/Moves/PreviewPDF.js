import React, { useState, memo } from "react";
import { getFormattedDate } from "../../utils/helperFunctions";
import download from "downloadjs";
import { Document, Page, pdfjs } from "react-pdf";
import { fillBOLForm } from "../../utils/fillBOLForm";
import { useMove } from "../Providers/MoveProvider";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PreviewPDF = memo(() => {
  const client = useMove();

  const [data, setData] = useState(null);

  const [, /*numPages*/ setNumPages] = useState(null);
  const [pageNumber /*setPageNumber*/] = useState(1);

  const getPreview = async () => {
    const newData = await fillBOLForm(client);
    return setData(newData);
  };

  const downloadNow = async () => {
    download(
      await fillBOLForm(client),
      `${client.fullName} BOL ${getFormattedDate(new Date())}.pdf`,
      "application/pdf"
    );
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className=" w-full flex-col flex justify-around items-center relative h-full ">
      <div
        className={data ? "" : "w-full h-full bg-black bg-opacity-75 absolute z-20 flex justify-center items-center"}
      >
        <button onClick={getPreview} className="bg-purple-600 p-4 rounded-lg text-white">
          {data ? "Update" : "Preview"}
        </button>
        <button onClick={downloadNow} className="bg-gray-600 p-4 rounded-lg text-white ml-10">
          Download
        </button>
      </div>

      <Document
        file={data ? { data } : process.env.PUBLIC_URL + "/pdf/bol-sfm-fonts.pdf"}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas"
      >
        <Page pageNumber={pageNumber} className="flex" />
      </Document>
      {/* <p>
          Page {pageNumber} of {numPages}
        </p> */}
    </div>
  );
});
