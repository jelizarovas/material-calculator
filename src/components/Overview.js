import React, { /*useState,*/ useRef } from "react";
import { useClient, useClientDispatch } from "./Providers/ClientProvider";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";
import SignatureCanvas from "react-signature-canvas";

//get page dimentions https://github.com/Hopding/pdf-lib/issues/62#issuecomment-453847201
// Returns an object of shape: { width: number, height: number }
// const getPageDimensions = (page) => {
//     let mediaBox;

//     // Check for MediaBox on the page itself
//     const hasMediaBox = !!page.getMaybe('MediaBox');
//     if (hasMediaBox) {
//       mediaBox = page.index.lookup(page.get('MediaBox'));
//     }

//     // Check for MediaBox on each parent node
//     page.Parent.ascend((parent) => {
//       const parentHasMediaBox = !!parent.getMaybe('MediaBox');
//       if (!mediaBox && parentHasMediaBox) {
//         mediaBox = parent.index.lookup(parent.get('MediaBox'));
//       }
//     }, true);

//     // This should never happen in valid PDF files
//     if (!mediaBox) throw new Error('Page Tree is missing MediaBox');

//     // Extract and return the width and height
//     return { width: mediaBox.array[2].number, height: mediaBox.array[3].number };
//   };

async function fillForm(client) {
  //const pdf =  http://localhost:3000/material-calculator/pdf/bol.pdf
  const pdf = "pdf/bol.pdf";
  const baseUrl = window.location.origin.toString() + process.env.PUBLIC_URL + "/";
  const formUrl = baseUrl + pdf;
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const signatureUrl = client.signature;
  const signatureBytes = await fetch(signatureUrl).then((res) => res.arrayBuffer());
  const signatureImage = await pdfDoc.embedPng(signatureBytes);

  const initialsUrl = client.initials;
  const initialsBytes = await fetch(initialsUrl).then((res) => res.arrayBuffer());
  const initialsImage = await pdfDoc.embedPng(initialsBytes);

  const crewSignatureUrl = client.crewSignature;
  const crewSignatureBytes = await fetch(crewSignatureUrl).then((res) => res.arrayBuffer());
  const crewSignatureImage = await pdfDoc.embedPng(crewSignatureBytes);

  const form = pdfDoc.getForm();

  form.getTextField("Name").setText("     " + client.fullName);
  form.getTextField("EMAIL").setText("     " + client.email);
  form.getTextField("PHONE 1").setText("     " + client.phoneNumber.toString());
  form.getTextField("Origin").setText("     " + client.originAddress);
  form.getTextField("Other Stops").setText("     " + client.additionalStops);
  form.getTextField("Destination").setText("     " + client.destinationAddress);
  form.getTextField("Notes").setText("     " + client.notes);

  //ESTIMATE SIGNATURE
  if (client.agreedToEstimate === true) {
    firstPage.drawImage(signatureImage, {
      x: 24,
      y: 103 - 8,
      height: 35,
      width: 150,
    });
    firstPage.drawText(client.date, {
      x: 238,
      y: 103,
      size: 12,
    });
  }

  //CREW LEAD SIGNATURE
  if (client.crewLeadAssigned === true) {
    firstPage.drawImage(crewSignatureImage, {
      x: 24,
      y: 73 - 8,
      height: 35,
      width: 150,
    });
    firstPage.drawText(client.date, {
      x: 238,
      y: 73,
      size: 12,
    });
  }

  //JOB COMPLETE SIGNATURE
  if (client.jobComplete === true) {
    firstPage.drawImage(signatureImage, {
      x: 320,
      y: 40 - 8,
      height: 35,
      width: 150,
    });
    firstPage.drawText(client.date, {
      x: 530,
      y: 40,
      size: 12,
    });
  }

  client.estimateIsBinding
    ? //BINDING ESTIMATE INITIALS
      firstPage.drawImage(initialsImage, {
        x: 24,
        y: 373,
        height: 10,
        width: 25,
      })
    : //NON BINDING ESTIMATE INITIALS
      firstPage.drawImage(initialsImage, {
        x: 24,
        y: 462,
        height: 10,
        width: 25,
      });

  switch (client.valuation) {
    case "basic":
      //BASIC VALUE PROTECTION INITIALS
      firstPage.drawImage(initialsImage, {
        x: 24,
        y: 323,
        height: 10,
        width: 25,
      });
      break;
    case "replacement":
      //REPLACEMENT COST COVERAGE WITH NO DEDUCTIBLE
      firstPage.drawImage(initialsImage, {
        x: 24,
        y: 222,
        height: 10,
        width: 25,
      });
      break;
    case "replacementWithDeductible":
      //REPLACEMENT COST COVERAGE WITH $300 DEDUCTIBLE
      firstPage.drawImage(initialsImage, {
        x: 24,
        y: 275,
        height: 10,
        width: 25,
      });
      break;

    default:
      break;
  }

  form.flatten();
  const pdfBytes = await pdfDoc.save();

  download(pdfBytes, "new bol.pdf", "application/pdf");
}

export const Overview = () => {
  const client = useClient();

  return (
    <div>
      <pre className="max-w-md overflow-hidden text-xs bg-white">{client && JSON.stringify(client, 0, 2)}</pre>
      <div className="flex">
        <SignatureBlock type="signature" name="Customer Signature" />
        <SignatureBlock type="initials" name="Customer Initials" width="200" />
      </div>
      <div className="flex">
        <SignatureBlock type="crewSignature" name="Signature of Carrier" />
      </div>

      <br></br>
      <button className="bg-gray-700 p-2 m-2 text-white" onClick={() => fillForm(client)}>
        Get bill of lading
      </button>
    </div>
  );
};

const SignatureBlock = ({ type, name, width = 500, height = 200 }) => {
  // const [imageURL, setImageURL] = useState(null);

  const dispatch = useClientDispatch();

  const sigCanvas = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
    dispatch({ field: type, value: "" });
  };

  const save = () => {
    const url = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    // setImageURL(url);
    dispatch({ field: type, value: url });
  };

  return (
    <div className="m-5 relative">
      <h2>{name}</h2>
      <div className="rounded-lg p-2 bg-blue-600">
        <SignatureCanvas
          penColor="blue"
          canvasProps={{
            width,
            height,
            className: "bg-white rounded-lg",
          }}
          onEnd={save}
          ref={sigCanvas}
        />
      </div>
      <button className="bg-blue-600 p-2 m-2 text-white absolute top-4 right-2 rounded-lg" onClick={clear}>
        Reset
      </button>
      {/* {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "500px",
          }}
        />
      ) : null} */}
    </div>
  );
};
