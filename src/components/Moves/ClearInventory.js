import React from "react";
import { vibrate } from "../../utils/vibrate";

const ClearInventory = ({ dispatch }) => {
  return (
    <button
      type="reset"
      className="px-2 py-1 hover:bg-red-700 rounded-sm text-white text-xs "
      onClick={() => {
        dispatch({ type: "clearCount" });
        vibrate(500);
      }}
    >
      <span alt="Clear">× clear</span>
    </button>
  );
};

export default ClearInventory;
