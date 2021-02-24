import React from "react";

import { Materials } from "./components/Materials";
import { Client } from "./components/Client";
import { Overview } from "./components/Overview";
import { BillOfLading } from "./components/BillOfLading";
import { Inventory } from "./components/Inventory";
import { Estimate } from "./components/Estimate";
// import { Totals } from "./components/Totals";

import { InventoryProvider } from "./components/Providers/InventoryProvider";
import { ClientProvider } from "./components/Providers/ClientProvider";

import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Rates } from "./components/Rates";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <InventoryProvider>
        <Router basename="/">
          {/* <div className="flex-row justify-center w-screen bg-gray-800 "> */}
          {/* <div className="text-white p-4 bg-black flex  justify-around"> */}
          <Navbar />
          {/* </div> */}
          {/* </div> */}

          <ClientProvider>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/client" />} />
              <Route path="/materials">
                <Materials />
              </Route>
              <Route path="/rates">
                <Rates />
              </Route>
              <Route path="/client">
                <Client />
              </Route>
              <Route path="/bol">
                <BillOfLading />
              </Route>
              <Route path="/inventory">
                <Inventory />
              </Route>
              <Route path="/estimate">
                <Estimate />
              </Route>
              <Route path="/overview">
                <Overview />
              </Route>
            </Switch>
            {/* <Totals /> */}
          </ClientProvider>
        </Router>
      </InventoryProvider>
    </div>
  );
}
export default App;
