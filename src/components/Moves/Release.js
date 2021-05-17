import React, { useState } from "react";
import { SectionTitle } from "../Layout/SectionTitle";
import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { SignButton } from "./SignButton";

export const Release = () => {
  const dispatch = useMoveDispatch();
  const client = useMove();

  const { agreeToMoveSignature } = client;

  const [completed, setCompleted] = useState(false);

  return (
    <>
      <SectionTitle title="Release" hidePlus={true} />
      <p className="px-6 text-sm my-4">
        I have read and understand <span className="underline text-blue-600">this contract</span>, and release my
        household goods to the carrier subject to the terms and conditions of this contract.
      </p>
      <SignButton
        type="Signature"
        completed={completed}
        setCompleted={setCompleted}
        dispatch={dispatch}
        name="agreeToMoveSignature"
        value={agreeToMoveSignature}
      />
    </>
  );
};
