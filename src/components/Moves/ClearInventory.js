import React from "react";

export const ClearInventory = ({ handleClear }) => {
  return (
    <button type="reset" className="px-2 py-1 hover:bg-red-700 rounded-sm text-white text-xs " onClick={handleClear}>
      <span alt="Clear">× clear</span>
    </button>
  );
};
