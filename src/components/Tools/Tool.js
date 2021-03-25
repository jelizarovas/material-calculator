import React from "react";
import { Route, Switch } from "react-router-dom";
import { MaterialsWProvider } from "../Moves/Materials";
import { BillOfLading } from "./BillOfLading";
import { MaterialsProvider, useMaterialsDispatch, useMaterials } from "../Providers/MaterialsProvider";

export const ToosWProviders = () => {
  const materials = useMaterials();
  const materialsDispatch = useMaterialsDispatch();

  return (
    <div className="flex flex-col items-stretch w-full sm:w-3/4 mx-auto lg:w-1/2 pb-10">
      <Switch>
        <Route path={`/t/materials`}>
          <MaterialsWProvider state={materials} dispatch={materialsDispatch} />
        </Route>
        <Route path={`/t/coordinates`}>
          <BillOfLading />
        </Route>
      </Switch>
    </div>
  );
};

export const Tool = () => {
  return (
    <MaterialsProvider>
      <ToosWProviders />
    </MaterialsProvider>
  );
};
