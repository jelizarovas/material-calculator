import { PDFDocument } from "pdf-lib";

export async function abhsFill(data) {
  //   const pdf =  http://localhost:3000/material-calculator/pdf/bol.pdf
  const pdf = "pdf/abhs.pdf";
  const baseUrl = window.location.origin.toString() + process.env.PUBLIC_URL + "/";
  const formUrl = baseUrl + pdf;
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);

  const pages = pdfDoc.getPages();
  const form = pdfDoc.getForm();

  const {
    reference,
    address,
    type,
    date,
    crew,
    start,
    breaks,
    end,
    totalTime,
    rate,
    travelFee,
    total,
    crewSignature,
    clientSignature,
  } = data;

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

  //A. CUSTOMER INFORMATION

  setField("reference", reference);
  setField("address", address);
  setField("type", type);
  setField("date", date);
  setField("crew", crew);
  setField("start", start);
  setField("breaks", breaks);
  setField("end", end);
  setField("totalTime", totalTime);
  setField("rate", rate);
  setField("travelFee", travelFee);
  setField("total", total);
  await setSignature(crewSignature, 107, 53, 150, 35);
  await setSignature(clientSignature, 378, 53, 150, 35);

  form.flatten();
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
