import React from "react";
import { useInventory } from "./Providers/InventoryProvider";

const ClearInventory = () => {
  const { dispatch } = useInventory();

  return (
    <button
      type="reset"
      onClick={() => dispatch({ type: "clearCount" })}
      className="btn btn-default p-2 btn-icon bg-red-500 hover:bg-red-600 text-white space-x-1"
    >
      <span>x </span>
    </button>
  );
};

export default ClearInventory;
