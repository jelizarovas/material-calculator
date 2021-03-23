import React, { useState } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { Materials } from "./Materials";
import { Client } from "./Client";
import { MoveBottomBar } from "./MoveBottomBar";
import { Rates } from "./Rates";
import { Inventory } from "./Inventory";
import { Estimate } from "./Estimate";
import { Overview } from "./Overview";
import { MoveProvider } from "../Providers/MoveProvider";
import { MiscFees } from "./MiscFees";

const urls = ({ path, url }) => ({
  current: path,
  redirect: `${url}/client`,

  ...Object.fromEntries(
    ["materials", "client", "rates", "estimates", "inventory", "overview"].map((u) => [u, `${path}/${u}`])
  ),
});

export const Move = () => {
  const [links] = useState(urls(useRouteMatch()));
  // let { moveId } = useParams();

  return (
    <>
      <MoveBottomBar />
      <div className="flex flex-col items-stretch w-full sm:w-3/4 mx-auto lg:w-1/2 pb-10">
        <div className="flex-grow">
          <MoveProvider>
            <Switch>
              <Route exact path={links.current} render={() => <Redirect to={links.redirect} />} />

              <Route path={links.materials}>
                <Materials />
                <br></br>
                <MiscFees />
              </Route>
              <Route path={links.client}>
                <Client />
              </Route>

              <Route path={links.rates}>
                <Rates />
              </Route>

              <Route path={links.inventory}>
                <Inventory />
              </Route>
              <Route path={links.estimate}>
                <Estimate />
              </Route>
              <Route path={links.overview}>
                <Overview />
              </Route>
            </Switch>
          </MoveProvider>
        </div>
      </div>
    </>
  );
};
