import React from "react";
import {
  Link,
  Route,
  useParams,
  Switch,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { Materials } from "./Materials";
import { Client } from "./Client";
import { MoveMenu } from "./MoveMenu";
import { MoveBottomBar } from "./MoveBottomBar";
import { Rates } from "./Rates";
import { Inventory } from "./Inventory";
import { Estimate } from "./Estimate";
import { Overview } from "./Overview";
// import { Contents } from "./components/Contents";
import { ClientProvider } from "./Providers/ClientProvider";

export const Move = () => {
  let { moveId } = useParams();
  let { path, url } = useRouteMatch();
  return (
    <React.Fragment>
      <ClientProvider>
        {/* <Contents /> */}

        <MoveMenu />

        <Switch>
          <Route
            exact
            path={`${path}`}
            render={() => <Redirect to={`${url}/client`} />}
          />

          <Route path={`${path}/materials`}>
            <Materials />
          </Route>
          <Route path={`${path}/client`}>
            <Client />
          </Route>

          <Route path={`${path}/rates`}>
            <Rates />
          </Route>

          <Route path={`${path}/inventory`}>
            <Inventory />
          </Route>
          <Route path={`${path}/estimate`}>
            <Estimate />
          </Route>
          <Route path={`${path}/overview`}>
            <Overview />
          </Route>
        </Switch>
        <MoveBottomBar />
      </ClientProvider>
    </React.Fragment>
  );
};
