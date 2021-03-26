import React from "react";
import { SignatureBlock } from "../Inputs/SignatureBlock";
import { useMoveDispatch } from "../Providers/MoveProvider";

export const Signatures = () => {
  const dispatch = useMoveDispatch();

  return (
    <>
      <div className="flex w-full justify-center">
        <SignatureBlock dispatch={dispatch} type="signature" name="Customer Signature" width="300" />
      </div>
      {/* <div className="flex w-full">
        <SignatureBlock dispatch={dispatch} type="initials" name="Customer Initials" width="200" />
      </div> */}
      {/* <div className="flex">
        <SignatureBlock dispatch={dispatch} type="crewSignature" name="Signature of Carrier" width="300" />
      </div> */}
    </>
  );
};
