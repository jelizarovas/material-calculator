import React from "react";
import { PaymentType } from "./PaymentType";
import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

import { Input } from "../Inputs/Input";

export const Payment = () => {
  const client = useMove();
  const { totalAmountPaid, paymentOption } = client;
  const dispatch = useMoveDispatch();

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  return (
    <div>
      <h2>Payment Type</h2>
      <PaymentType value={paymentOption} onChange={onChange} />

      <h2>Total Amount Paid</h2>
      <Input
        name="totalAmountPaid"
        value={totalAmountPaid}
        onChange={onChange}
        Icon={() => {
          return <span>$</span>;
        }}
        placeholder="Total Amount Paid"
      />
    </div>
  );
};
