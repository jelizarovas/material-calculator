import React, { /*useState,*/ useRef } from "react";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";
import SignatureCanvas from "react-signature-canvas";
import { Input } from "../Inputs/Input";
import { TextArea } from "../Inputs/TextArea";
import { SpeakerNotes } from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { truncateString } from "../../utils/helperFunctions";

async function fillForm(client) {
  //const pdf =  http://localhost:3000/material-calculator/pdf/bol.pdf
  const pdf = "pdf/bol-sfm.pdf";
  const baseUrl = window.location.origin.toString() + process.env.PUBLIC_URL + "/";
  const formUrl = baseUrl + pdf;
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);

  const pages = pdfDoc.getPages();
  const form = pdfDoc.getForm();

  const setField = (pdfField, value, condition = false) => {
    if (!pdfField || !value || condition) return;
    if (Array.isArray(value)) value = value.join(", ");
    return form.getTextField(pdfField).setText(value.toString());
  };

  const setSignature = async (signature, x, y, width = 25, height = 10) => {
    if (!signature || !x || !y) return;
    const bytes = await fetch(signature).then((res) => res.arrayBuffer());
    const image = await pdfDoc.embedPng(bytes);
    return pages[0].drawImage(image, { x, y, height, width });
  };

  const setDateField = (date, x, y, size = 10) => {
    if (!date || !x || !y) return;
    return pages[0].drawText(date, { x, y, size });
  };

  //A. CUSTOMER INFORMATION
  setField("Name", client.fullName);
  setField("EMAIL", client.email);
  setField("PHONE", client.phoneNumber);
  setField("Origin", client.originAddress);
  if (client.anyAdditionalStops === true) setField("Other Stops", client.additionalStops);
  setField("Destination", client.destinationAddress);
  setField("Notes", client.notes);

  //B. ESTIMATE TYPE
  client.estimateIsBinding
    ? await setSignature(client.initials, 24, 462)
    : await setSignature(client.initials, 24, 373);

  //C. VALUATION
  if (client.valuation === "basic") await setSignature(client.initials, 24, 323);
  if (client.valuation === "replacementWithDeductible") await setSignature(client.initials, 24, 275);
  setField("valuation with deductible", client.valuationCostWithDeductible);
  if (client.valuation === "replacement") await setSignature(client.initials, 24, 222);
  setField("valuation no deductible", client.valuationCost);
  setField("Shipment Value", client.shipmentValue);
  setField("Selected Valuation", client.totalValuation);

  // AGREE TO CONTRACT - CREW & CUSTOMER SIGNATURES
  if (client.agreedToEstimate) {
    await setSignature(client.signature, 24, 95, 150, 35);
    setDateField(client.estimateAgreedDate || client.dates[0], 238, 103);
  }
  if (client.crewLeadAssigned) {
    await setSignature(client.crewSignature, 24, 65, 150, 35);
    setDateField(client.dates[0], 238, 73);
  }

  //APPENDIX INITIALS
  if (client.appendixExists) await setSignature(client.initials, 29, 39, 20, 8);

  //D.TIME, MILES, MATERIALS, RATES
  setField("PERSONNEL", client.personnel);

  if (client.jobType === "local") {
    if (client.isTravelFeeFixed) {
      setField("Travel Fee", client.travelFee);
    } else {
      setField("Hourly Time Start", client.startTime);
      setField("Hourly Time End", client.endTime);
    }
    setField("Hourly Time Arrive", client.arriveTime);
    setField("Hourly Time Depart", client.departTime);
    setField("Hourly Time Breaks", client.breakTime);
    setField("Hourly Time TOTAL", client.totalHours);
    setField("Hourly Rate", client.hourlyRate);
  }
  if (client.jobType === "longDistance") {
    setField("Mileage Miles", client.distance);
    if (client.weightType === "weightTicket") {
      setField("Mileage Weight Gross", client.grossWeight);
      setField("Mileage Weight Tare", client.tareWeight);
    }
    setField("Mileage Weight Net", client.netWeight);
    setField("Mileage Rate", client.mileageRate);
  }
  setField("Total Transportation", client.totalTransportation);

  //PACKING & MATERIAL
  client?.materials
    .filter((m) => m.units > 0)
    .forEach((item, index) => {
      const i = index + 1;
      if (index < 9) {
        //TODO remainder send to appendix
        setField(`C${i}`, item.name);
        setField(`QTY C${i}`, item.units);
        setField(`RATE C${i}`, item.rate);
        setField(`TOTAL C${i}`, item.total);
      }
    });
  setField("TOTAL PACKING  MATERIAL", client.totalMaterials);

  //MISC FEES
  client?.miscFees
    .filter((m) => m.value > 0 && m.selected)
    .forEach((item, i) => {
      if (i < 8) {
        //TODO remainder send to appendix
        setField(`M${i + 1}`, truncateString(item.name, 9));
        setField(`AMOUNT M${i + 1}`, item.value);
      }
    });
  setField("TOTAL OTHER", client.totalMiscFees);

  //E. TOTAL CHARGES
  setField("SUBTOTAL 1234", client.subtotal);
  setField("AdjustmentText", client.adjustmentText);
  setField("Adjustment", client.adjustment);
  setField("TOTAL MOVING CHARGES", client.totalMovingCharges);
  setField("TOTAL AMOUNT PAID", client.totalAmountPaid);
  setField("BalanceDueText", client.balanceDueText);
  setField("TIPS  BALANCE DUE", client.remainingBalance);

  if (client.jobComplete) {
    await setSignature(client.signature, 320, 32, 150, 35);
    setDateField(client.dates[0], 530, 40);
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
