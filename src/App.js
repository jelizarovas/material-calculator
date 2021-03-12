import React from "react";

import { BillOfLading } from "./components/BillOfLading";

import { Moves } from "./components/Moves";
import { Move } from "./components/Move";

import { ClientProvider } from "./components/Providers/ClientProvider";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
// import { Contents } from "./components/Contents";

function App() {
  return (
    <Router basename="/">
      <ClientProvider>
        {/* <Contents /> */}
        <Navbar />
        <div className="container relative mx-auto bg-gray-100  pb-10 rounded-b-lg shadow-2xl">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dash" />} />
            <Route path="/moves" component={Moves} />
            <Route path="/m/:moveId" component={Move} />

            <Route path="/bol" component={BillOfLading} />
          </Switch>
        </div>
      </ClientProvider>
    </Router>
  );
}
export default App;
