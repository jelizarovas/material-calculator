import React, { useState } from "react";
import { Input } from "../Inputs/Input";
import {
  FitnessCenter,
  AttachMoney,
  Star,
  StarHalf,
  StarOutline,
  EventAvailable,
  Edit,
  Clear,
  NetworkLocked,
  NetworkCell,
  Lock,
  LockOpen,
} from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { SectionTitle } from "../Layout/SectionTitle";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { SignButton } from "./SignButton";

export const Estimate = () => {
  const [hasSigned, setHasSigned] = useState(false);
  const client = useMove();
  const dispatch = useMoveDispatch();
  const { estimateIsBinding, agreedToEstimate, estimateAgreedDate, bindingEstimateExists = true } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const buttons = [
    {
      value: false,
      placeholder: "Non Binding",
      Icon: LockOpen,
    },
    { value: true, placeholder: "Binding", Icon: Lock, isDisabled: true },
  ];

  return (
    <>
      <SectionTitle title="Estimate" hidePlus={true} />
      <ButtonSelect
        onClick={onChange}
        name="estimateIsBinding"
        value={estimateIsBinding}
        buttons={buttons}
        vertical={true}
      />
      <SignButton label="initial" />
      {/* <div>
        <input
          name="agreedToEstimate"
          className="mr-5 ml-3"
          checked={agreedToEstimate}
          onChange={() => {
            dispatch({
              field: "agreedToEstimate",
              value: !agreedToEstimate,
            });
          }}
          placeholder="Total Valuation Cost"
          type="checkbox"
        />
        <label htmlFor="agreedToEstimate">Agreed to estimate?</label>
        {agreedToEstimate && (
          <Input
            name="estimateAgreedDate"
            value={estimateAgreedDate}
            onChange={onChange}
            Icon={EventAvailable}
            placeholder="Agreed Date"
          />
        )}
      </div> */}
    </>
  );
};
{
  /* <pre className="max-w-md overflow-hidden text-xs bg-white">{client && JSON.stringify(client, 0, 2)}</pre> */
}
