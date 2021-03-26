import React, { useState, useRef } from "react";
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
import { Payment } from "./Payment";
import { Signatures } from "./Signatures";
import { Totals } from "./Totals";
import { PreviewPDF } from "./PreviewPDF";
import { ContactInfo } from "./ContactInfo";
import { Locations } from "./Locations";
import { Dates } from "./Dates";
import { Valuation } from "./Valuation";
import { Release } from "./Release";
import { Modal } from "../Layout/Modal";

const colClass = "flex flex-col    w-full md:w-1/2  lg:w-1/3 2xl:w-1/4 3xl:w-1/3  p-2 ";

export const MoveInOne = () => {
  const modal = useRef(null);

  return (
    <MoveProvider>
      <div className="flex flex-col bg-yellow-500 w-full h-full flex-grow ">
        {/* <Modal ref={modal}>TEST</Modal> */}
        <button onClick={() => modal.current.open()}>modal</button>
        <div className="flex bg-pink-500 w-full flex-grow ">
          <div className="flex  w-1/2 flex-wrap    pb-10">
            <div className={colClass}>
              <div className="bg-white p-2 rounded-md">
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
                <Materials showMoreDefault={false} />
                <MiscFees showMoreDefault={false} />
              </div>
            </div>
            <div className={colClass}>
              <div className="bg-white p-2 rounded-md">
                <Totals />
                <Payment />
                <Signatures />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-grow   w-1/2  bg-red-500   p-2">
            <div className="bg-white p-2 rounded-md     w-full">
              <PreviewPDF />
            </div>
          </div>
        </div>
      </div>
      {/* <Overview /> */}
    </MoveProvider>
  );
};
