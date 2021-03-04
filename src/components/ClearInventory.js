import React from "react";
import { useClientDispatch } from "./Providers/ClientProvider";

const ClearInventory = () => {
  const dispatch = useClientDispatch();

  return (
    <button
      type="reset"
      className="px-2 py-1 hover:bg-red-700 rounded-sm text-white text-xs "
      onClick={() => {
        window.navigator.vibrate(500);
        dispatch({ type: "clearCount" });
      }}
    >
      <span> × Clear</span>
    </button>
  );
};

export default ClearInventory;
