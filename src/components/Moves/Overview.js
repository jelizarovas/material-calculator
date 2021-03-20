import React, { /*useState,*/ useRef } from "react";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";
import SignatureCanvas from "react-signature-canvas";
import { Input } from "../Inputs/Input";
import { TextArea } from "../Inputs/TextArea";
import { SpeakerNotes } from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

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
  const pdf = "pdf/bol-sfm.pdf";
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
  if (client.anyAdditionalStops) form.getTextField("Other Stops").setText("     " + client.additionalStops);
  form.getTextField("Destination").setText("     " + client.destinationAddress);
  form.getTextField("Notes").setText("     " + client.notes);

  form.getTextField("Shipment Value").setText(client.shipmentValue.toString());
  form.getTextField("valuation with deductible").setText(client.valuationCostWithDeductible.toString());
  form.getTextField("valuation no deductible").setText(client.valuationCost.toString());
  form.getTextField("Selected Valuation").setText(client.totalValuation.toString());

  form.getTextField("PERSONNEL").setText("     " + client.personnel.join(", "));

  switch (client.jobType) {
    case "local":
      if (client.isTravelFeeFixed) {
        form.getTextField("Travel Fee").setText(client.travelFee);
      } else {
        form.getTextField("Hourly Time Start").setText(client.startTime);
        form.getTextField("Hourly Time End").setText(client.endTime);
      }

      form.getTextField("Hourly Time Arrive").setText(client.arriveTime);
      form.getTextField("Hourly Time Depart").setText(client.departTime);
      form.getTextField("Hourly Time Breaks").setText(client.breakTime);
      form.getTextField("Hourly Time TOTAL").setText(client.totalHours);
      form.getTextField("Hourly Rate").setText(client.hourlyRate);
      break;
    case "longDistance":
      form.getTextField("Mileage Miles").setText(client.distance);
      form.getTextField("Mileage Weight Gross").setText(client.grossWeight);
      form.getTextField("Mileage Weight Tare").setText(client.tareWeight);
      form.getTextField("Mileage Weight Net").setText(client.netWeight);
      form.getTextField("Mileage Rate").setText(client.mileageRate);
      break;
    case "flatRate":
      //FLAT RATE FIELDS
      // flatIsMaterialsIncluded
      //flatAmount
      break;

    default:
      break;
  }
  form.getTextField("Total Transportation").setText(client.totalTransportation.toString());

  form.getTextField("TOTAL PACKING  MATERIAL").setText(client.totalMaterials.toString());
  form.getTextField("TOTAL OTHER").setText(client.totalOtherFees.toString());
  form.getTextField("SUBTOTAL 1234").setText(client.subtotal.toString());
  form.getTextField("Adjustment").setText(client.adjustment.toString());
  form.getTextField("TOTAL MOVING CHARGES").setText(client.totalMovingCharges.toString());
  form.getTextField("TOTAL AMOUNT PAID").setText(client.totalAmountPaid.toString());
  form.getTextField("TIPS  BALANCE DUE").setText(client.remainingBalance.toString());

  const materials = client.materials.filter((m) => m.units > 0);
  materials.forEach((item, index) => {
    const i = index + 1;

    if (0 < i && i < 10) {
      form.getTextField(`C${i}`).setText(item.name);
      form.getTextField(`QTY C${i}`).setText(item.units.toString());
      form.getTextField(`RATE C${i}`).setText(item.rate.toString());
      form.getTextField(`TOTAL C${i}`).setText(item.total.toString());
    }
  });
  const miscFees = client.miscFees.filter((m) => m.value > 0 && m.selected);
  miscFees.forEach((item, index) => {
    const i = index + 1;

    if (0 < i && i < 9) {
      form.getTextField(`M${i}`).setText(truncateString(item.name, 9));
      form.getTextField(`AMOUNT M${i}`).setText(item.value);
    }
  });

  // form.getTextField("QTY SMALL").setText(client.materials.small.units);
  // form.getTextField("QTY MEDIUM").setText(client.materials.medium.units);
  // form.getTextField("QTY LARGE").setText(client.materials.large.units);
  // form.getTextField("QTY DISHPACK").setText(client.materials.dishpack.units);
  // form.getTextField("QTY MIRROR PACK").setText(client.materials.mirrorPack.units);
  // form.getTextField("QTY MATTRESS BAG").setText(client.materials.mattressBag.units);
  // form.getTextField("QTY WARDROBE").setText(client.materials.wardrobe.units);
  // form.getTextField("QTY Carpet Protection").setText(client.materials.carpetProtection.units);
  // form.getTextField("QTY Custom").setText(client.materials.custom.units);
  // form.getTextField("Custom").setText(client.materials.custom.text);

  // form.getTextField("RATE SMALL").setText(client.materials.small.rate);
  // form.getTextField("RATE MEDIUM").setText(client.materials.medium.rate);
  // form.getTextField("RATE LARGE").setText(client.materials.large.rate);
  // form.getTextField("RATE DISHPACK").setText(client.materials.dishpack.rate);
  // form.getTextField("RATE MIRROR PACK").setText(client.materials.mirrorPack.rate);
  // form.getTextField("RATE MATTRESS BAG").setText(client.materials.mattressBag.rate);
  // form.getTextField("RATE WARDROBE").setText(client.materials.wardrobe.rate);
  // form.getTextField("RATE Carpet Protection").setText(client.materials.carpetProtection.rate);
  // form.getTextField("RATE Custom").setText(client.materials.custom.rate);

  // form.getTextField("TOTAL ITEM 15 CU SMALL").setText(client.materials.small.total);
  // form.getTextField("TOTAL ITEM 30 CU MEDIUM").setText(client.materials.medium.total);
  // form.getTextField("TOTAL ITEM 45 CU LARGE").setText(client.materials.large.total);
  // form.getTextField("TOTAL ITEM DISHPACK").setText(client.materials.dishpack.total);
  // form.getTextField("TOTAL ITEM MIRROR PACK").setText(client.materials.mirrorPack.total);
  // form.getTextField("TOTAL ITEM MATTRESS BAG").setText(client.materials.mattressBag.total);
  // form.getTextField("TOTAL ITEM WARDROBE").setText(client.materials.wardrobe.total);
  // form.getTextField("TOTAL ITEM Carpet Protection").setText(client.materials.carpetProtection.total);
  // form.getTextField("TOTAL ITEM Custom").setText(client.materials.custom.total);

  // form.getTextField("AMOUNT Piano").setText(client.otherFees.piano);
  // form.getTextField("AMOUNT Removal").setText(client.otherFees.removal);
  // form.getTextField("AMOUNT Hoist").setText(client.otherFees.hoist);
  // form.getTextField("AMOUNT Ferry").setText(client.otherFees.ferry);
  // form.getTextField("AMOUNT Storage").setText(client.otherFees.storage);
  // form.getTextField("AMOUNT CUSTOM 1").setText(client.otherFees.custom1amount);
  // form.getTextField("AMOUNT CUSTOM 2").setText(client.otherFees.custom2amount);
  // form.getTextField("AMOUNT CUSTOM 3").setText(client.otherFees.custom3amount);
  // form.getTextField("MISC CUSTOM 1").setText(client.otherFees.custom1text);
  // form.getTextField("MISC CUSTOM 2").setText(client.otherFees.custom2text);
  // form.getTextField("MISC CUSTOM 3").setText(client.otherFees.custom3text);

  //ESTIMATE SIGNATURE
  if (client.agreedToEstimate === true) {
    firstPage.drawImage(signatureImage, {
      x: 24,
      y: 103 - 8,
      height: 35,
      width: 150,
    });
    firstPage.drawText(client.estimateAgreedDate || client.dates[0], {
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
    firstPage.drawText(client.dates[0], {
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
    firstPage.drawText(client.dates[0], {
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
  const client = useMove();
  const { totalAmountPaid, paymentOption, notes } = client;
  const dispatch = useMoveDispatch();

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  return (
    <div className="w-full">
      <TextArea name="notes" value={notes} onChange={onChange} Icon={SpeakerNotes} placeholder="Notes" />

      <h2>Payment Type</h2>
      <PaymentType value={paymentOption} onChange={onChange} />

      <h2>Total Amount Paid</h2>
      <Input
        name="totalAmountPaid"
        value={totalAmountPaid}
        onChange={onChange}
        Icon={() => {
          return <span>$</span>;
        }}
        placeholder="Total Amount Paid"
      />

      <div className="flex w-full">
        <SignatureBlock type="signature" name="Customer Signature" width="300" />
        <SignatureBlock type="initials" name="Customer Initials" width="200" />
      </div>
      <div className="flex">
        <SignatureBlock type="crewSignature" name="Signature of Carrier" width="300" />
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

  const dispatch = useMoveDispatch();

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

function truncateString(str, num) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "...";
}

const PaymentType = ({ onChange, value }) => {
  const paymentOptions = [
    { label: "Cash ", value: "cash", adjustmentRate: "-5%" },
    { label: "Check", value: "check", adjustmentRate: "0" },
    { label: "Card ", value: "card", adjustmentRate: "3%" },
    { label: "Billed Later ", value: "billLater" },
  ];

  return (
    <select
      name="paymentOption"
      value={value}
      onChange={onChange}
      className="m-2 w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900"
    >
      {paymentOptions.map((p) => (
        <option key={p.label} value={p.value}>
          {p.label.toString()}
        </option>
      ))}
      <option onSelect={() => console.log("more")}>More...</option>
    </select>
  );
};
