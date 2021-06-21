import React, { useState, useRef, memo, useEffect } from "react";
import { getFormattedDate } from "../../utils/helperFunctions";
import download from "downloadjs";
import { Document, Page, pdfjs } from "react-pdf";
import { fillBOLForm } from "../../utils/fillBOLForm";
import { useMove } from "../Providers/MoveProvider";
import { AddCircleOutlined, FilterCenterFocusOutlined, RemoveCircleOutlined } from "@material-ui/icons";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PreviewPDF = memo((props) => {
  const client = useMove();

  const [data, setData] = useState(null);

  const [, /*numPages*/ setNumPages] = useState(null);
  const [pageNumber /*setPageNumber*/] = useState(1);

  // const [isFullscreen, setIsFS] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [sidebar, setSidebar] = useState(true);

  const toggleSidebar = (value) => setSidebar(value);

  const pdfWrapperRef = useRef();

  const getPreview = async () => {
    const newData = await fillBOLForm(client);
    return setData(newData);
  };

  useEffect(() => {
    getPreview();
  }, [getPreview]);

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
    <div className=" w-full flex-col flex justify-around items-center relative h-full max-h-screen overflow-hidden min-w-full bg-gray-200 ">
      <div
        className={data ? "" : "w-full h-full bg-black bg-opacity-75 absolute z-20 flex justify-center items-center"}
      >
        <button onClick={getPreview} className="bg-purple-600 p-4 rounded-lg text-white">
          {data ? "Update" : "Preview"}
        </button>
        <button onClick={downloadNow} className="bg-gray-600 p-4 rounded-lg text-white ml-10 ">
          Download
        </button>
      </div>

      {/* <Document
        file={data ? { data } : process.env.PUBLIC_URL + "/pdf/bol-sfm-fonts.pdf"}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas"
      >
        <Page pageNumber={pageNumber} className="flex" />
      </Document> */}
      <div className="flex w-full justify-around absolute top-5 z-10 bg-green-400">
        <Tooltip placement="left" title="Zoom Out">
          <ToolbarButton
            type="primary"
            icon={<RemoveCircleOutlined />}
            // disabled={scale <= 0.4}
            onClick={() => setScale(scale - 0.2)}
          />
        </Tooltip>
        <div>{scale}</div>
        <Tooltip placement="left" title="Zoom In">
          <ToolbarButton
            type="primary"
            icon={<AddCircleOutlined />}
            // disabled={scale >= 1}
            onClick={() => setScale(scale + 0.2)}
          />
        </Tooltip>
        <Tooltip placement="left" title={sidebar ? "Activate Focus Mode" : "De-activate Focus Mode"}>
          <ToolbarButton
            type="primary"
            icon={<FilterCenterFocusOutlined />}
            style={{
              background: sidebar ? "#fff" : "#0190be",
              color: sidebar ? "#0190be" : "#fff",
            }}
            onClick={() => {
              if (!sidebar) {
                setScale(0.8);
              }
              toggleSidebar(!sidebar);
            }}
          />
        </Tooltip>
      </div>
      <div ref={pdfWrapperRef}>
        <PDF
          pdf={data ? { data } : process.env.PUBLIC_URL + "/pdf/bol-sfm-fonts.pdf"}
          scale={scale}
          page={pageNumber}
          pdfWrapperRef={pdfWrapperRef}
          onSuccess={onDocumentLoadSuccess}
        />
      </div>
      <div>
        <button>Update</button>
        <button>Download</button>
        <button>Prev</button>
        <button>Next</button>
      </div>
      {/* <p>
          Page {pageNumber} of {numPages}
        </p> */}
    </div>
  );
});

const Tooltip = ({ placement, title, children }) => {
  return (
    <div>
      {/* <span>{title}</span> */}
      {children}
    </div>
  );
};

const ToolbarButton = ({ icon, type, disabled, onClick }) => {
  return <button onClick={onClick}>{icon}</button>;
};

const PDF = ({ pdf, scale, page, pdfWrapperRef, onSuccess }) => {
  useEffect(() => {
    console.log({ name: "new pdf", pdf });
    return () => {
      console.log({ name: "old pdf", pdf });
    };
  }, [pdf]);

  return (
    <Document
      file={pdf}
      renderMode="canvas"
      // loading={<div>Loading...</div>}
      onLoadSuccess={onSuccess}
      onLoadError={console.error}
      error={"Unable to load the library article. Please reach out to the support for further assistance."}
    >
      <TransformWrapper options={{ limitToBounds: false, minScale: 0.5 }}>
        <TransformComponent>
          <div className="flex flex-col items-center justify-center w-full ">
            <Page
              scale={scale}
              // width={pdfWrapperRef.current?.getBoundingClientRect().width * 0.95 || undefined}
              pageNumber={page}
            />
            <Page
              scale={scale}
              // width={pdfWrapperRef.current?.getBoundingClientRect().width * 0.95 || undefined}
              pageNumber={page + 1}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </Document>
  );
};
