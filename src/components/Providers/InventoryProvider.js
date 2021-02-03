import React, {
  /*useEffect,*/ useContext,
  createContext,
  useReducer,
} from "react";
import { initialMaterials } from "../../utils/initialMaterials";
// import { useKeyPress } from "../../utils/useKeyPress";

const inventoryContext = createContext();

const useInventory = () => useContext(inventoryContext);

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case "changeCount":
      return state.map((d) => {
        if (d.id === action.payload.id) d.count = action.payload.newCount;
        return d;
      });
    case "clearCount":
      return state.map((d) => {
        d.count = 0;
        return d;
      });
    case "keyAdd":
      return state.map((d) => {
        if (d.id === action.payload) {
          d.count = d.count + 1;
        }
        return d;
      });
    default:
      return state;
  }
};

const initialState = initialMaterials;

const InventoryProvider = (props) => {
  console.log("inventory provider rerender");
  const [inventory, dispatch] = useReducer(inventoryReducer, initialState);
  // const small = useKeyPress("q");
  // console.log(small);
  // const medium = useKeyPress("w");
  // const large = useKeyPress("e");
  // const mattressbag = useKeyPress("r");
  // const wardrobeRent = useKeyPress("t");
  // const wardrobeBuy = useKeyPress("y");
  // const num1 = useKeyPress("1");
  // const num2 = useKeyPress("2");q
  // const num3 = useKeyPress("3");
  // const num4 = useKeyPress("4");
  // const num5 = useKeyPress("5");

  // useEffect(() => {
  //   if (small) {
  //     dispatch({ type: "keyAdd", payload: "q3lYEM" });
  //   }
  //   return () => {};
  // }, [small]);

  const value = React.useMemo(() => {
    return { inventory, dispatch };
  }, [inventory, dispatch]);
  return <inventoryContext.Provider value={value} {...props} />;
};

export { InventoryProvider, useInventory };
