import React from "react";

import { Materials } from "./components/Materials";
import { Client } from "./components/Client";
import { Overview } from "./components/Overview";
import { BillOfLading } from "./components/BillOfLading";
import { Inventory } from "./components/Inventory";
import { Estimate } from "./components/Estimate";
import { ClientProvider } from "./components/Providers/ClientProvider";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Rates } from "./components/Rates";
import { Navbar } from "./components/Navbar";
import { Steps } from "./components/Steps";
// import { Contents } from "./components/Contents";

function App() {
  return (
    <Router basename="/">
      <ClientProvider>
        {/* <Contents /> */}
        <Navbar />
        <div className="container mx-auto bg-gray-100  pb-10 rounded-b-lg shadow-2xl">
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

          <Steps />
          {/* <Totals /> */}
        </div>
      </ClientProvider>
    </Router>
  );
}
export default App;
