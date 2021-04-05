import React from "react";
import AddWare from "./AddWare";
import WareList from "./WareList";
import VisibilityFilters from "./VisibilityFilters";
// import "./styles.css";

export default function Warehouse() {
  return (
    <div className="ware-app flex flex-col  items-center py-10">
      <h1>Ware List</h1>
      <AddWare />
      <VisibilityFilters />
      <WareList />
    </div>
  );
}
