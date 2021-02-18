import React from "react";
import { useClient } from "./Providers/ClientProvider";

export const Totals = () => {
  const client = useClient();

  const {
    subtotal,
    adjustment,
    totalMovingCharges,
    totalAmountPaid,
    remainingBalance,
  } = client;
  return (
    <div className="mb-10 flex-col justify-center bg-white rounded-lg w-1/2 mx-auto">
      <div className="p-2">
        <span>Subtotal: </span>
        <span>{subtotal}</span>
      </div>
      <div className="p-2">
        <span>Adjustment: </span>
        <span>{adjustment}</span>
      </div>{" "}
      <div className="p-2">
        <span>Total moving charges: </span>
        <span>{totalMovingCharges}</span>
      </div>{" "}
      <div className="p-2">
        <span>Total amount paid: </span>
        <span>{totalAmountPaid}</span>
      </div>{" "}
      <div className="p-2">
        <span>Tips / Balance Due: </span>
        <span>{remainingBalance}</span>
      </div>
    </div>
  );
};
