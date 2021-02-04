import React from "react";
import { useInventory } from "./Providers/InventoryProvider";

const ClearInventory = () => {
  const { dispatch } = useInventory();

  return (
    <button type="reset" onClick={() => dispatch({ type: "clearCount" })}>
      <span className="bg-gray-800 px-4 py-2 rounded-sm text-white text-xs hover:bg-red-700">
        Clear
      </span>
    </button>
  );
};

export default ClearInventory;
