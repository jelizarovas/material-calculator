import React, { useEffect, useContext, createContext, useReducer } from "react";
import { initialMaterials } from "../../utils/initialMaterials";
import { useKeyPress } from "../../utils/useKeyPress";

const inventoryContext = createContext();

const useInventory = () => useContext(inventoryContext);

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case "changeCount":
      return state.map((d) => {
        if (d.id === action.payload.id) d.count = action.payload.newCount;
        return d;
      });
    default:
      return state;
  }
};

const initialState = initialMaterials;

const InventoryProvider = (props) => {
  const [inventory, dispatch] = useReducer(inventoryReducer, initialState);
  const small = useKeyPress("q");
  // const medium = useKeyPress("w");
  // const large = useKeyPress("e");
  // const mattressbag = useKeyPress("r");
  // const wardrobeRent = useKeyPress("t");
  // const wardrobeBuy = useKeyPress("y");
  // const num1 = useKeyPress("1");
  // const num2 = useKeyPress("2");
  // const num3 = useKeyPress("3");
  // const num4 = useKeyPress("4");
  // const num5 = useKeyPress("5");

  useEffect(() => {
    return () => {};
  }, []);

  const value = React.useMemo(() => {
    return { small, inventory, dispatch };
  }, [small, inventory, dispatch]);
  return <inventoryContext.Provider value={value} {...props} />;
};

export { InventoryProvider, useInventory };
