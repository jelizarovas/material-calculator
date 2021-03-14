import React from "react";
import {
  // Link,
  Route,
  // useParams,
  Switch,
  // useRouteMatch,
  // Redirect,
} from "react-router-dom";
import { Materials } from "./Materials";
import {
  MaterialsProvider,
  useMaterialsDispatch,
  useMaterials,
} from "./Providers/MaterialsProvider";

export const ToosWProviders = () => {
  // let { path } = useRouteMatch();

  const materials = useMaterials();
  const materialsDispatch = useMaterialsDispatch();

  // console.log(path);
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/t/materials`}>
          <Materials state={materials} dispatch={materialsDispatch} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export const Tool = ({ children }) => {
  return (
    <MaterialsProvider>
      <ToosWProviders />
    </MaterialsProvider>
  );
};
