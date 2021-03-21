import React, { useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { Materials } from "./Materials";
import { Client } from "./Client";
import { MoveBottomBar } from "./MoveBottomBar";
import { Rates } from "./Rates";
import { Inventory } from "./Inventory";
import { Estimate } from "./Estimate";
import { Overview } from "./Overview";
import { MoveProvider, useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { MiscFees } from "./MiscFees";

export const MoveWProvider = () => {
  const [showSideMenu, setshowSideMenu] = useState(false);
  // let { moveId } = useParams();
  const client = useMove();
  const dispatch = useMoveDispatch();

  let { path, url } = useRouteMatch();

  return (
    <>
      <MoveBottomBar showSideMenu={showSideMenu} setshowSideMenu={setshowSideMenu} />
      <div className="flex flex-col items-stretch w-full sm:w-3/4 mx-auto lg:w-1/2 pb-10">
        <div className="flex-grow">
          <Switch>
            <Route exact path={`${path}`} render={() => <Redirect to={`${url}/client`} />} />

            <Route path={`${path}/materials`}>
              <Materials state={client} dispatch={dispatch} />
              <br></br>
              <MiscFees state={client} dispatch={dispatch} />
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
        </div>
      </div>
    </>
  );
};

export const Move = () => {
  return (
    <MoveProvider>
      <MoveWProvider />
    </MoveProvider>
  );
};
