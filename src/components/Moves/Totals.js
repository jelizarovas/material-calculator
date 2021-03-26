import React from "react";
import { SectionTitle } from "../Layout/SectionTitle";
import { useMove } from "../Providers/MoveProvider";

const spanClass = "";

export const Totals = () => {
  const move = useMove();
  const { subtotal, totalValuation, totalTransportation, totalMaterials, totalMiscFees } = move;
  return (
    <>
      <SectionTitle title="Totals" hidePlus={true} />
      <div className="flex justify-between mx-auto w-1/2 p-1">
        <span className={spanClass}>Valuation</span>
        <span className={spanClass}>{totalValuation}</span>
      </div>
      <div className="flex justify-between mx-auto w-1/2 p-1">
        <span className={spanClass}>Transportation</span>
        <span className={spanClass}>{totalTransportation}</span>
      </div>
      <div className="flex justify-between mx-auto w-1/2 p-1">
        <span className={spanClass}>Materials</span>
        <span className={spanClass}>{totalMaterials}</span>
      </div>
      <div className="flex justify-between mx-auto w-1/2 p-1">
        <span className={spanClass}>Specialty Fees</span>
        <span className={spanClass}>{totalMiscFees}</span>
      </div>
      <div className="flex justify-between mx-auto w-1/2 p-1 border-t-2 border-double font-bold">
        <span className={spanClass}>Subtotal</span>
        <span className={spanClass}>{subtotal}</span>
      </div>
    </>
  );
};
