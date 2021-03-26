import { Gesture } from "@material-ui/icons";
import React, { useRef } from "react";

export const SignButton = ({ label = "Sign" }) => {
  return (
    <>
      <div className="flex justify-center w-full mb-6">
        <button className="bg-blue-500 hover:bg-blue-800 text-white px-6 uppercase py-2 rounded-md">
          <Gesture className="mr-2" />
          {label}
        </button>
      </div>
    </>
  );
};
