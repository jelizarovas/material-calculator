import React, { useState, useEffect } from "react";
import { useStorage } from "../../utils/useStorage";

export const Paramounts = () => {
  return (
    <div>
      <h1>Paramount Jobs</h1>

      <UploadForm />
    </div>
  );
};

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

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
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div>{progress + " %"}</div>;
};
