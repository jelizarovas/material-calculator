import React /*, { useState, useRef } */ from "react";
// import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { Materials } from "./Materials";
// import { Client } from "./Client";
// import { MoveBottomBar } from "./MoveBottomBar";
import { Rates } from "./Rates";
// import { Inventory } from "./Inventory";
import { Estimate } from "./Estimate";
// import { Overview } from "./Overview";
import { MoveProvider } from "../Providers/MoveProvider";
import { MiscFees } from "./MiscFees";
import { Payment } from "./Payment";
import { Signatures } from "./Signatures";
import { Totals } from "./Totals";
import { PreviewPDF } from "./PreviewPDF";
import { ContactInfo } from "./ContactInfo";
import { Locations } from "./Locations";
import { Dates } from "./Dates";
import { Valuation } from "./Valuation";
import { Release } from "./Release";
// import { Modal } from "../Layout/Modal";
import { ClearData } from "./ClearData";

const colClass = "flex flex-col    w-full md:w-1/2  lg:w-1/3 2xl:w-1/4 3xl:w-1/3  p-2 ";

export const MoveInOne = () => {
  // const modal = useRef(null);

  return (
    <MoveProvider>
      <div className="flex flex-col md:flex-row px-0 md:px-0  w-full h-full flex-grow ">
        <div className={colClass}>
          <div className="bg-gray-100 p-2 rounded-md">
            <ContactInfo />
            <Locations />
            <Dates />
            <Estimate />
            <Valuation />
            <Release />
          </div>
        </div>
        <div className={colClass}>
          <div className="bg-white  p-2 rounded-md">
            <Rates />
          </div>
        </div>

        <div className={colClass}>
          <div className="bg-white  p-2 rounded-md">
            <Materials showMoreDefault={false} />
            <MiscFees showMoreDefault={false} />
          </div>
        </div>
        <div className={colClass}>
          <div className="bg-white p-2 rounded-md">
            <Totals />
            <Payment />
            <Signatures />
            <ClearData />
          </div>
        </div>
        <div className="bg-white p-2 rounded-md">
          <PreviewPDF />
        </div>
      </div>
      <div className="flex flex-col flex-grow       p-2"></div>
      {/* <Overview /> */}
    </MoveProvider>
  );
};
