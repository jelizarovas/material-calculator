import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Moves } from "./components/Moves/Moves";
import { Move } from "./components/Moves/Move";

import { Estimates } from "./components/Estimates/Estimates";
import { Estimate } from "./components/Estimates/Estimate";

import { Paramounts } from "./components/Paramount/Paramounts";
import { Paramount } from "./components/Paramount/Paramount";

import { Dispatch } from "./components/Dispatch/Dispatch";
import { Job } from "./components/Dispatch/Job";

import { Warehouse } from "./components/Warehouse/Warehouse";
import { Ware } from "./components/Warehouse/Ware";

import { Tools } from "./components/Tools/Tools";
import { Tool } from "./components/Tools/Tool";

import { Appbar } from "./components/Layout/Appbar";

function App() {
  return (
    <Router basename="/">
      <Appbar />
      <div className="container relative mx-auto bg-gray-100 rounded-b-lg shadow-2xl   md:p-2">
        <Switch>
          <Redirect exact from="/" to="/m/R2tpMl/client" />
          <Redirect exact from="/materials" to="/t/materials" />
          <Redirect exact from="/bol" to="/t/coordinates" />
          <Redirect exact from="/bingo" to="/t/loadchart" />

          <Route path="/moves" component={Moves} />
          <Route path="/m/:moveId" component={Move} />

          <Route path="/estimates" component={Estimates} />
          <Route path="/e/:estimateId" component={Estimate} />

          <Route path="/paramount" component={Paramounts} />
          <Route path="/p/:pId" component={Paramount} />

          <Route path="/dispatch" component={Dispatch} />
          <Route path="/d/:jobId" component={Job} />

          <Route path="/warehouse" component={Warehouse} />
          <Route path="/w/:wId" component={Ware} />

          <Route path="/tools" component={Tools} />
          <Route path="/t/:toolId" component={Tool} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
