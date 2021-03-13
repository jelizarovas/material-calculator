import React from "react";

import { Moves } from "./components/Moves";
import { Move } from "./components/Move";

import { Estimates } from "./components/Estimates";
import { Estimate } from "./components/Estimate";

import { Paramounts } from "./components/Paramounts";
import { Paramount } from "./components/Paramount";

import { Dispatch } from "./components/Dispatch";
import { Job } from "./components/Job";

import { Warehouse } from "./components/Warehouse";
import { Ware } from "./components/Ware";

import { Tools } from "./components/Tools";
import { Tool } from "./components/Tool";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router basename="/">
      <Navbar />
      <div className="container relative mx-auto bg-gray-100  pb-10 rounded-b-lg shadow-2xl">
        <Switch>
          <Redirect exact from="/" to="/dash" />
          <Redirect exact from="/materials" to="/t/materials" />
          <Redirect exact from="/bol" to="/t/coordinates" />
          <Redirect exact from="/bingo" to="/t/loadchart" />

          <Route path="/moves" component={Moves} />
          <Route path="/m/:moveId" component={Move} />

          <Route path="/estimates" component={Estimates} />
          <Route path="/t/:estimateId" component={Estimate} />

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
