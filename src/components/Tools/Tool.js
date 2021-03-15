import React from "react";
import { Route, Switch } from "react-router-dom";
import { Materials } from "../Moves/Materials";
import { MaterialsProvider, useMaterialsDispatch, useMaterials } from "../Providers/MaterialsProvider";

export const ToosWProviders = () => {
  const materials = useMaterials();
  const materialsDispatch = useMaterialsDispatch();

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

export const Tool = () => {
  return (
    <MaterialsProvider>
      <ToosWProviders />
    </MaterialsProvider>
  );
};
