import { Delete } from "@material-ui/icons";
import React from "react";
import { useMoveDispatch } from "../Providers/MoveProvider";

export const ClearData = () => {
  const dispatch = useMoveDispatch();
  return (
    <div className="flex justify-center w-full">
      <button className="bg-red-500 p-2 px-4 rounded-md text-white" onClick={() => dispatch({ type: "clearData" })}>
        <span>
          <Delete />
        </span>
        <span>Clear Everything</span>
      </button>
    </div>
  );
};
