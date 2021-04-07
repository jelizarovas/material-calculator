import { PictureAsPdf } from "@material-ui/icons";
import React, { useState } from "react";
import { SectionTitle } from "../Layout/SectionTitle";
import { UploadForm } from "./UploadForm";

const items = [
  {
    id: "Fci3ht4RCfb9rr2U04Xd",
    name: "Accessorials",
    url:
      "https://firebasestorage.googleapis.com/v0/b/sfm-tools-448ab.appspot.com/o/pdf%2Faccesorials.pdf?alt=media&token=b9e30c40-5ea8-4000-8685-d0f22632829a",
  },
  {
    id: "QoRroeKIeEOcGvTZve1T",
    name: "Damage Waiver",
    url:
      "https://firebasestorage.googleapis.com/v0/b/sfm-tools-448ab.appspot.com/o/pdf%2FDamage%20Waiver.pdf?alt=media&token=7a30566b-ae9c-46e4-a302-0e93988ee8ad",
  },
  {
    id: "56yerfthdfg",
    name: "Residential Inspection",
    url:
      "https://firebasestorage.googleapis.com/v0/b/sfm-tools-448ab.appspot.com/o/pdf%2FRersidential%20Preinspection.pdf?alt=media&token=f920d38a-bd72-44b1-98ce-06acdc134022",
  },
  {
    id: "erty656",
    name: "Load Chart",
    url:
      "https://firebasestorage.googleapis.com/v0/b/sfm-tools-448ab.appspot.com/o/pdf%2FLoad%20Chart.pdf?alt=media&token=69dfea5c-fb71-4265-8dff-90ac89e29770",
  },
  {
    id: "sdfg5456",
    name: "Prohibited Items",
    url:
      "https://firebasestorage.googleapis.com/v0/b/sfm-tools-448ab.appspot.com/o/pdf%2FProhibited%20Items.pdf?alt=media&token=4652dbf3-2833-461c-baf1-9a0b79d2f6f2",
  },
];

export const PacketList = ({ pdf, setPdf }) => {
  const [customPdf, setCustomPdf] = useState([]);

  const onClick = (item) => {
    return (e) => {
      setPdf((pdf) => {
        if (pdf?.id !== item?.id) return { ...item };
        return pdf;
      });
    };
  };
  return (
    <div className="w-64 p-2">
      {/* {JSON.stringify(pdf)} */}
      <div className="my-10">
        <SectionTitle title="Packet List" hidePlus={true} />
        <ul className="p-1">
          {items.map((item, i) => (
            <ListItem key={i} name={item.name} onClick={onClick(item)} />
          ))}
        </ul>
      </div>
      <div>
        <SectionTitle title="Unique Paperwork" hidePlus={true} />
        {!!customPdf && customPdf.map((pdf, i) => <span>{pdf?.name}</span>)}
        <UploadForm customPdf={customPdf} setCustomPdf={setCustomPdf} />
      </div>
    </div>
  );
};

const ListItem = ({ name, id, onClick }) => {
  return (
    <li className="hover:text-blue-600 cursor-pointer" onClick={onClick}>
      <PictureAsPdf /> <span>{name}</span>
    </li>
  );
};
