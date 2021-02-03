import React from "react";
import { useInventory } from "./Providers/InventoryProvider";

const ClearInventory = () => {
  const { dispatch } = useInventory();

  return (
    <button type="reset" onClick={() => dispatch({ type: "clearCount" })}>
      <span>x </span>
    </button>
  );
};

export default ClearInventory;
