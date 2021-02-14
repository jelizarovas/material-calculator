import React, { useState, useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import useMousePosition from "../utils/useMousePosition";

export const BillOfLading = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { x, y } = useMousePosition();
  const hasMovedCursor = typeof x === "number" && typeof y === "number";

  const { pdfDocument /*, pdfPage*/ } = usePdf({
    file: process.env.PUBLIC_URL + "/pdf/bol-sfm.pdf",
    page,
    canvasRef,
  });

  return (
    <div>
      <h1>{hasMovedCursor ? `Your cursor is at ${x}, ${-(y - 80 - 792)}.` : "Move your mouse around."}</h1>
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="pager">
            <li className="previous">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
            <li className="next">
              <button disabled={page === pdfDocument.numPages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

// https://codepen.io/ValerioEmanuele/pen/pGRZqe?editors=0010
// https://stackoverflow.com/questions/61666513/getting-mouse-coordinates-from-an-embedded-pdf-object-element
// [{"descrizione":"RAPINA ","posizioneX":128.2377740303541,"posizioneY":550.3238095238096,"valore":"X"},
// {"descrizione":"PACCHI ","posizioneX":5.826306913996632,"posizioneY":9.038095238095252,"valore":"X"}]

// const fileCoords = {
//   file: "bol.pdf",
//   poi: [
//     {
//       name: "Non-binding estimate",
//       type: "initials",
//       x: 24,
//       y: 462,
//     },
//     {
//       name: "Bind Estimate",
//       type: "initials",

//       x: 24,
//       y: 373,
//     },
//     {
//       name: "Valuation Basic",
//       type: "initials",

//       x: 24,
//       y: 323,
//     },
//     {
//       name: "Valuation Replacement with Deductible",
//       type: "initials",

//       x: 24,
//       y: 275,
//     },
//     {
//       name: "Valuation Replacement",
//       type: "initials",

//       x: 24,
//       y: 222,
//     },
//     {
//       name: "Valuation Client Signature",
//       type: "signature",

//       x: 24,
//       y: 103,
//     },
//     {
//       name: "Valuation Carrier Signature",
//       type: "signature",

//       x: 24,
//       y: 73,
//     },
//     {
//       name: "Signature of Customer",
//       type: "signature",

//       x: 320,
//       y: 40,
//     },
//   ],
// };

// const data = {
//   EMAIL: "",
//   "TOTAL ITEM 15 CU SMALL": "",
//   "AMOUNT Piano": "",
//   "TOTAL ITEM 30 CU MEDIUM": "",
//   "AMOUNT Removal": "",
//   "TOTAL ITEM 45 CU LARGE": "",
//   "AMOUNT Hoist": "",
//   "TOTAL ITEM DISHPACK": "",
//   "AMOUNT Ferry": "",
//   "TOTAL ITEM MIRROR PACK": "",
//   "AMOUNT Storage": "",
//   "TOTAL ITEM MATTRESS BAG": "",
//   "TOTAL ITEM WARDROBE": "",
//   "TOTAL ITEM Carpet Protection": "",
//   "SUBTOTAL 1234": "",
//   "TOTAL MOVING CHARGES": "",
//   "TOTAL AMOUNT PAID": "",
//   "TIPS  BALANCE DUE": "",
//   "PHONE 1": "",
//   "PHONE 2": "",
//   Name: "",
//   Origin: "",
//   "Other Stops": "",
//   Destination: "",
//   Notes: "",
//   PERSONNEL: "",
//   "valuation with deductible": "",
//   "Shipment Value": "",
//   "valuation no deductible": "",
//   "Selected Valuation": "",
//   "Hourly Rate": "",
//   "Mileage Miles": "",
//   "Hourly Time Start": "",
//   "Hourly Time Arrive": "",
//   "Hourly Time Depart": "",
//   "Hourly Time End": "",
//   "Hourly Time Breaks": "",
//   "Hourly Time TOTAL": "",
//   "Travel Fee": "",
//   "Mileage Weight Gross": "",
//   "Mileage Weight Tare": "",
//   "Mileage Weight Net": "",
//   "Mileage Rate": "",
//   "Total Transportation": "",
//   "QTY SMALL": "",
//   "QTY MEDIUM": "",
//   "QTY LARGE": "",
//   "QTY DISHPACK": "",
//   "QTY MIRROR PACK": "",
//   "QTY MATTRESS BAG": "",
//   "QTY WARDROBE": "",
//   "QTY Carpet Protection": "",
//   "QTY Custom": "",
//   Custom: "",
//   "RATE SMALL": "",
//   "RATE MEDIUM": "",
//   "RATE LARGE": "",
//   "RATE DISHPACK": "",
//   "RATE MIRROR PACK": "",
//   "RATE MATTRESS BAG": "",
//   "RATE WARDROBE": "",
//   "RATE Carpet Protection": "",
//   "RATE Custom": "",
//   "TOTAL ITEM Custom": "",
//   "TOTAL PACKING  MATERIAL": "",
//   "MISC CUSTOM 1": "",
//   "MISC CUSTOM 2": "",
//   "MISC CUSTOM 3": "",
//   "TOTAL OTHER": "",
//   "AMOUNT CUSTOM 1": "",
//   "AMOUNT CUSTOM 2": "",
//   "AMOUNT CUSTOM 3": "",
//   "CLEAR Hourly": "",
//   "CLEAR Hourly Rate TF": "",
//   "CLEAR Mileage": "",
//   "CLEAR QTY": "",
//   "CLEAR Total Items": "",
//   "CLEAR Misc Items": "",
//   "CLEAR Misc Amount": "",
//   "Clear Section": "",
//   Adjustment: "",
//   "CLEAR VALUATION": "",
//   "CLEAR TOTAL CHARGES": "",
//   "CLEAR D All": "",
//   "CLEAR Total Transportation": "",
//   "CLEAR Name": "",
//   "CLEAR Origin": "",
//   "CLEAR Other Stops": "",
//   "CLEAR Destination": "",
//   "CLEAR Personnel": "",
//   "CLEAR Notes": "",
//   "CLEAR Phone": "",
//   "CLEAR Email": "",
//   "Import Rates": "",
//   "CLEAR CUSTOMER INFORMATION": "",
//   "CLEAR ALL DATA": "",
//   Printer: "",
//   print3: "",
//   "File name": "",
//   SaveAS: "",
//   "Manual Box Sum": "",
//   "Manual Other Sum": "",
//   "Selected Printer": "",
// };
