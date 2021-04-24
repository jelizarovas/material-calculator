import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export const SignatureBlock = ({ type, name, width = 500, height = 200, dispatch }) => {
  // const [imageURL, setImageURL] = useState(null);

  const sigCanvas = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
    dispatch({ payload: { [name]: "" } });
  };

  const save = () => {
    const url = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    // setImageURL(url);
    dispatch({ payload: { [name]: url } });
  };

  return (
    <div className="m-5 relative">
      <h2>{name}</h2>
      <div className="rounded-lg p-2 bg-blue-600 w-full">
        <SignatureCanvas
          penColor="blue"
          canvasProps={{
            width: "100%",
            height,
            className: "bg-white rounded-lg ",
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
