import { Gesture, LockOpen, Clear } from "@material-ui/icons";
import React, { useState } from "react";
import { SignatureBlock } from "../Inputs/SignatureBlock";

export const SignButton = ({ label = "Sign", dispatch, name, value }) => {
  const [showSignBlock, setShowSignBlock] = useState(false);

  const toggleShowBlock = () => setShowSignBlock(!showSignBlock);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto ">
        {showSignBlock ? (
          <div className="mt-1 flex flex-col justify-center items-center w-full mb-6">
            <SignatureBlock dispatch={dispatch} name={name} width="428" />
            <div className="flex space-x-4">
              <button
                className="hover:bg-gray-300 text-gray-500 px-6 uppercase py-2 my-4 rounded-md"
                onClick={toggleShowBlock}
              >
                <Clear className="mr-2" />
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-800 text-white px-6 uppercase py-2 my-4 rounded-md"
                onClick={toggleShowBlock}
              >
                <LockOpen className="mr-2" />
                Complete
              </button>
            </div>
          </div>
        ) : (
          <button
            className="text-blue-500  hover:bg-gray-300 px-6 uppercase py-2 rounded-md w-full font-bold"
            onClick={toggleShowBlock}
          >
            <Gesture className="mr-2" />
            {label}
          </button>
        )}
      </div>
    </>
  );
};
