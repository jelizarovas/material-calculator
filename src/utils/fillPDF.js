import { PDFDocument } from "pdf-lib";

//pass pdf with url key, or array data, with
//item can have following keys: type[text, signature, formField], page, text, x, y, size

export async function fillPDF(pdf, data) {
  if (!url || !data) return undefined;
  const { url } = pdf;
  const formPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(formPdfBytes);

  const pages = pdfDoc.getPages();
  const form = pdfDoc.getForm();

  const setFromField = ({ pdfField, text, condition = false }) => {
    if (!pdfField || !value || condition) return;
    if (Array.isArray(value)) value = value.join(", ");
    return form.getTextField(pdfField).setText(text.toString());
  };

  const setSignature = async ({ signature, x, y, width = 25, height = 10, page = 0 }) => {
    if (!signature || !x || !y) return;
    const bytes = await fetch(signature).then((res) => res.arrayBuffer());
    const image = await pdfDoc.embedPng(bytes);
    return pages[0].drawImage(image, { x, y, height, width });
  };

  const setTextField = ({ text, x, y, size = 10, page = 0 }) => {
    if (!text || !x || !y) return;
    return pages[page].drawText(text, { x, y, size });
  };

  data.map(async (item) => {
    if (item?.type === "text") return setTextField({ text: item?.text, x: item?.x, y: item?.y, page: item?.page });
    if (item?.type === "signature")
      return await setSignature({ signature: item?.signature, x: item?.x, y: item?.y, page: item?.page });
    if (item?.type === "formField")
      return setFormField({ pdfField: item?.pdfField, text: item?.text, condition: item?.condition });
  });

  form.flatten();
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
