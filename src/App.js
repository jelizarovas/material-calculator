import React from "react";
import ClearInventory from "./components/ClearInventory";

import { Materials } from "./components/Materials";

import { InventoryProvider } from "./components/Providers/InventoryProvider";

function App() {
  return (
    <InventoryProvider>
      <div>
        <div>
          <div>
            Material Calculator <ClearInventory />
          </div>
        </div>

        <div>
          <div>
            <div>
              <div>
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
