import React, { useRef } from "react";
import { trimCanvas } from "../../utils/helperFunctions";
// import trimCanvas from "trim-canvas";
// import SignatureCanvas from "react-signature-canvas";
import SignaturePad from "react-signature-pad-wrapper";

export const SignatureBlock = ({ type = "Initial", name, width = 500, height = 200, dispatch = () => {} }) => {
  // const [imageURL, setImageURL] = useState(null);

  const sigCanvas = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
    dispatch({ field: name, value: "" });
  };

  const save = (e) => {
    const url = trimCanvas(sigCanvas.current._canvas).toDataURL("image/png");
    // setImageURL(url);
    dispatch({ field: name, value: url });
  };

  return (
    <div className="flex flex-col pt-2">
      {/* <h2>{name}</h2> */}
      <div className=" w-full relative">
        <div className="rounded-lg p-1 bg-gray-300 bg-opacity-50 relative ">
          <div className="w-4/5 mx-auto border-t-2 absolute bottom-6 z-0 left-0 right-0 text-center text-gray-400 select-none">
            {type}
          </div>
          <SignaturePad
            // penColor="blue"
            options={{ onEnd: save, penColor: "rgb(66, 133, 244)" }}
            canvasProps={{
              width,
              height,
              className: "bg-white bg-opacity-50 rounded-lg z-10",
            }}
            // onEnd={save}
            ref={sigCanvas}
          />
        </div>
        <button
          className="bg-gray-400 bg-opacity-50 no select-none hover:bg-opacity-100 text-xs p-2 m-2 text-white absolute top-0 right-0 rounded-lg"
          onClick={clear}
        >
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
    </div>
  );
};
