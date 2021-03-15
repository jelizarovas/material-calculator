import React, { useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { Materials } from "./Materials";
import { Client } from "./Client";
import { MoveMenu } from "./MoveMenu";
import { MoveBottomBar } from "./MoveBottomBar";
import { Rates } from "./Rates";
import { Inventory } from "./Inventory";
import { Estimate } from "./Estimate";
import { Overview } from "./Overview";
import { MoveProvider, useMove, useMoveDispatch } from "../Providers/MoveProvider";

export const MoveWProvider = () => {
  const [showSideMenu, setshowSideMenu] = useState(false);
  // let { moveId } = useParams();
  const client = useMove();
  const dispatch = useMoveDispatch();

  let { path, url } = useRouteMatch();

  return (
    <React.Fragment>
      <MoveMenu showSideMenu={showSideMenu} />

      <Switch>
        <Route exact path={`${path}`} render={() => <Redirect to={`${url}/client`} />} />

        <Route path={`${path}/materials`}>
          <Materials state={client} dispatch={dispatch} />
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
      <MoveBottomBar showSideMenu={showSideMenu} setshowSideMenu={setshowSideMenu} />
    </React.Fragment>
  );
};

export const Move = () => {
  return (
    <MoveProvider>
      <MoveWProvider />
    </MoveProvider>
  );
};
