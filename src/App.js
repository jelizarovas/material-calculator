import React from "react";

import { Materials } from "./components/Materials";

import { InventoryProvider } from "./components/Providers/InventoryProvider";

function App() {
  return (
    <InventoryProvider>
      <div className="max-w-lg rounded overflow-hidden shadow-lg mx-auto mt-2">
        <div className="px-6 py-4 ">
          <div className="font-bold text-orange-500 text-xl mb-0 text-center">
            Material Calculator
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Materials />
              </div>
            </div>
          </div>
        </div>
      </div>
    </InventoryProvider>
  );
}
export default App;
