import React, { useEffect } from "react";
import { useStorage } from "../../utils/useStorage";

export const ProgressBar = ({ file, setFile, onUrlAdded }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      onUrlAdded(url);
    }
  }, [url, setFile, onUrlAdded]);

  return <div>{progress + " %"}</div>;
};
