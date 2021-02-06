import React from "react";
import ClearInventory from "./components/ClearInventory";

import { Materials } from "./components/Materials";
import { Client } from "./components/Client";
import { Overview } from "./components/Overview";

import { InventoryProvider } from "./components/Providers/InventoryProvider";
import { ClientProvider } from "./components/Providers/ClientProvider";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Rates } from "./components/Rates";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-200">
      <InventoryProvider>
        <Router>
          <div className="flex-row justify-center w-screen bg-gray-800 ">
            <div className="text-white p-4 bg-black flex  justify-around">
              <div className="flex cursor-pointer">
                <img
                  className="bg-white w-6 h-6 p-1"
                  src={process.env.PUBLIC_URL + "/" + "favicon.ico"}
                  alt=""
                />
                <span className="px-2">
                  What'sThe<strong>Damage</strong>
                </span>
              </div>
              <nav className="px-5 ">
                <ul className="flex justify-around">
                  <li className="px-2">
                    <Link to="/client">Client</Link>
                  </li>
                  <li className="px-2">
                    <Link to="/rates">Rates</Link>
                  </li>
                  <li className="px-2">
                    <Link to="/inventory">Inventory</Link>
                  </li>
                  <li className="px-2">
                    <Link to="/materials">Materials</Link>
                  </li>
                  <li className="px-2">
                    <Link to="/overview">Overview</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <ClientProvider>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/client" />} />
              <Route path="/materials">
                <ClearInventory />
                <Materials />
              </Route>
              <Route path="/rates">
                <Rates />
              </Route>
              <Route path="/client">
                <Client />
              </Route>
              <Route path="/inventory">
                <Inventory />
              </Route>
              <Route path="/overview">
                <Overview />
              </Route>
            </Switch>
          </ClientProvider>
          {/* </div> */}
        </Router>
      </InventoryProvider>
    </div>
  );
}
export default App;

function Inventory() {
  return <h2>Inventory</h2>;
}
