import React from "react";
import ClearInventory from "./components/ClearInventory";

import { Materials } from "./components/Materials";

import { InventoryProvider } from "./components/Providers/InventoryProvider";

function App() {
  return (
    <InventoryProvider>
      <div className="flex-row justify-center w-screen  ">
        <div className="text-white p-4 bg-black flex  justify-around">
          <div className="flex cursor-pointer">
            <img
              className="bg-white w-6 h-6 p-1"
              src={process.env.PUBLIC_URL + "/" + "favicon.ico"}
              alt=""
            />
            <span className="px-2">
              <strong>Material</strong>Calculator
            </span>
          </div>
          <ClearInventory />
        </div>

        <Materials />
      </div>
    </InventoryProvider>
  );
}
export default App;
