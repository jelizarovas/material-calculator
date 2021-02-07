import React, { useState, useRef } from "react";
import { useClient } from "./Providers/ClientProvider";
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

async function fillForm(client, signature) {
  //const pdf =  http://localhost:3000/material-calculator/pdf/bol.pdf
  const pdf = "pdf/bol.pdf";
  const baseUrl =
    window.location.origin.toString() + process.env.PUBLIC_URL + "/";
  const formUrl = baseUrl + pdf;
  console.log(formUrl);
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

  const signatureUrl = signature;
  const signatureBytes = await fetch(signatureUrl).then((res) =>
    res.arrayBuffer()
  );

  // const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png'
  // const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(formPdfBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const signatureImage = await pdfDoc.embedPng(signatureBytes);
  // const emblemImage = await pdfDoc.embedPng(emblemImageBytes)

  const form = pdfDoc.getForm();

  const nameField = form.getTextField("Name");
  const emailField = form.getTextField("EMAIL");
  const phoneField = form.getTextField("PHONE 1");
  const originField = form.getTextField("Origin");
  const otherStopsField = form.getTextField("Other Stops");
  const destinationField = form.getTextField("Destination");
  nameField.setText("     " + client.fullName);
  emailField.setText("     " + client.email);
  phoneField.setText("     " + client.phoneNumber.toString());
  originField.setText("     " + client.originAddress);
  //   otherStopsField.setText();
  destinationField.setText("     " + client.destinationAddress);

  // const ageField = form.getTextField('Age')
  // const heightField = form.getTextField('Height')
  // const weightField = form.getTextField('Weight')
  // const eyesField = form.getTextField('Eyes')
  // const skinField = form.getTextField('Skin')
  // const hairField = form.getTextField('Hair')

  // const alliesField = form.getTextField('Allies')
  // const factionField = form.getTextField('FactionName')
  // const backstoryField = form.getTextField('Backstory')
  // const traitsField = form.getTextField('Feat+Traits')
  // const treasureField = form.getTextField('Treasure')

  //   const signatureImageField = form.getButton("CUSTOMER SIGNATURE");
  //   signatureImageField.setImage(signatureImage);

  // const factionImageField = form.getButton('Faction Symbol Image')

  //   emailField.setText("kingang23@gmail.com");
  // ageField.setText('24 years')
  // heightField.setText(`5' 1"`)
  // weightField.setText('196 lbs')
  // eyesField.setText('blue')
  // skinField.setText('white')
  // hairField.setText('brown')

  firstPage.drawImage(signatureImage, {
    x: 24,
    y: 73 - 8,
    height: 35,
    width: 150,
  });
  firstPage.drawImage(signatureImage, {
    x: 320,
    y: 40 - 8,
    height: 35,
    width: 150,
  });
  firstPage.drawImage(signatureImage, {
    x: 24,
    y: 103 - 8,
    height: 35,
    width: 150,
  });

  // alliesField.setText(
  //   [
  //     `Allies:`,
  //     `  • Princess Daisy`,
  //     `  • Princess Peach`,
  //     `  • Rosalina`,
  //     `  • Geno`,
  //     `  • Luigi`,
  //     `  • Donkey Kong`,
  //     `  • Yoshi`,
  //     `  • Diddy Kong`,
  //     ``,
  //     `Organizations:`,
  //     `  • Italian Plumbers Association`,
  //   ].join('\n'),
  // )

  // factionField.setText(`Mario's Emblem`)

  // factionImageField.setImage(emblemImage)

  // backstoryField.setText(
  //   [
  //     `Mario is a fictional character in the Mario video game franchise, `,
  //     `owned by Nintendo and created by Japanese video game designer Shigeru `,
  //     `Miyamoto. Serving as the company's mascot and the eponymous `,
  //     `protagonist of the series, Mario has appeared in over 200 video games `,
  //     `since his creation. Depicted as a short, pudgy, Italian plumber who `,
  //     `resides in the Mushroom Kingdom, his adventures generally center `,
  //     `upon rescuing Princess Peach from the Koopa villain Bowser. His `,
  //     `younger brother and sidekick is Luigi.`,
  //   ].join('\n'),
  // )

  // traitsField.setText(
  //   [
  //     `Mario can use three basic three power-ups:`,
  //     `  • the Super Mushroom, which causes Mario to grow larger`,
  //     `  • the Fire Flower, which allows Mario to throw fireballs`,
  //     `  • the Starman, which gives Mario temporary invincibility`,
  //   ].join('\n'),
  // )

  // treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'))
  form.flatten();
  const pdfBytes = await pdfDoc.save();

  download(pdfBytes, "new bol.pdf", "application/pdf");
}

export const Overview = () => {
  const client = useClient();

  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  return (
    <div>
      <pre>{client && JSON.stringify(client, 0, 2)}</pre>
      {/* <div className="bg-white border-gray-600"> */}
      <SignatureCanvas
        penColor="blue"
        canvasProps={{
          width: 500,
          height: 200,
          className: "bg-white",
          border: "1px solid black",
        }}
        onEnd={save}
        // backgroundColor="white"

        ref={sigCanvas}
      />
      <button
        className="bg-gray-700 p-2 m-2 text-white border-gray-900"
        onClick={save}
      >
        Save
      </button>
      <button className="bg-gray-700 p-2 m-2 text-white" onClick={clear}>
        Clear
      </button>
      {/* <button onClick={close}>Close</button> */}
      {imageURL ? (
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
      ) : null}
      <br></br>
      <button
        className="bg-gray-700 p-2 m-2 text-white"
        onClick={() => fillForm(client, imageURL)}
      >
        Get bill of lading
      </button>
    </div>
  );
};
