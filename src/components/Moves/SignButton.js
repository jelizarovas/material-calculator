import { Check, Gesture, CheckBoxOutlineBlank } from "@material-ui/icons";
import React, { useState } from "react";
import { SignatureBlock } from "../Inputs/SignatureBlock";

export const SignButton = ({ label = "Sign", dispatch, name, value }) => {
  const [showSignBlock, setShowSignBlock] = useState(false);

  const toggleShowBlock = () => setShowSignBlock(!showSignBlock);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mb-6">
        {!!value && (
          <button
            className="bg-blue-500 hover:bg-blue-800 text-white px-6 uppercase py-2 rounded-md w-64"
            onClick={toggleShowBlock}
          >
            <Check className="mr-2" />
            Done
          </button>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-800 text-white px-6 uppercase py-2 rounded-md w-64"
          onClick={toggleShowBlock}
        >
          <Gesture className="mr-2" />
          {label}
        </button>

        {showSignBlock && (
          <div className="mt-4 flex flex-col justify-center items-center w-full mb-6">
            <SignatureBlock dispatch={dispatch} name={name} />
            <button
              className="bg-green-500 hover:bg-green-800 text-white px-6 uppercase py-2 my-4 rounded-md w-64"
              onClick={toggleShowBlock}
            >
              <CheckBoxOutlineBlank className="mr-2" />
              Complete
            </button>
          </div>
        )}
      </div>
    </>
  );
};
