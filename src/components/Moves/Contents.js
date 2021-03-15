import React, { useState } from "react";
import ReactJson from "react-json-view";
import { useMove } from "../Providers/MoveProvider";

export const Contents = () => {
  const [show, setShow] = useState(true);
  const client = useMove();

  const scroll = show ? "overflow-scroll" : "overflow-auto";
  return (
    <div className={`absolute z-50 top-0 max-h-screen bg-white w-1/5 text-xs  ${scroll}`}>
      <button className="bg-yellow-600 text-white px-5" onClick={() => setShow(!show)}>
        {show ? "x" : "show"}
      </button>
      {show ? (
        <ReactJson src={client} collapseStringsAfterLength={50} />
      ) : // <pre className="max-w-md overflow-hidden text-xs bg-white">{client && JSON.stringify(client, 0, 2)}</pre>
      null}
    </div>
  );
};
