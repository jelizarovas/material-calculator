import React, { useState } from "react";
import { ProgressBar } from "./ProgressBar";

export const UploadForm = ({ customPdf, setCustomPdf }) => {
  const [file, setFile] = useState(null);
  const [error] = useState(null);
  const [url] = useState(null);

  const onUrlAdded = (url) => {
    setCustomPdf((currCustomPdfs) => {
      return [...currCustomPdfs, url];
    });
  };

  // const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (!!selected) setFile(selected);
    //   if (selected && types.includes(selected.type)) {
    //     setError("");
    //   } else {
    //     setFile(null);
    //     setError("Please select an image file (png or jpg)");
    //   }
  };
  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} onUrlAdded={onUrlAdded} />}
      </div>
      {url && <span>{url}</span>}
    </form>
  );
};
