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
} from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { SectionTitle } from "../Layout/SectionTitle";

export const Estimate = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();
  const { estimateIsBinding, agreedToEstimate, estimateAgreedDate } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  return (
    <>
      <SectionTitle title="Estimate" hidePlus={true} />
      <div className="mt-4 text-gray-700">
        <label className="inline-flex items-center">
          <input
            type="radio"
            onChange={onChange}
            className="form-radio"
            name="estimateIsBinding"
            checked={estimateIsBinding === "false"}
            value={false}
          />
          <span className="ml-2">Non-Binding</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            onChange={onChange}
            className="form-radio"
            name="estimateIsBinding"
            checked={estimateIsBinding === "true"}
            value={true}
          />
          <span className="ml-2">Binding</span>
        </label>
      </div>
      <div>
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
      </div>
    </>
  );
};
{
  /* <pre className="max-w-md overflow-hidden text-xs bg-white">{client && JSON.stringify(client, 0, 2)}</pre> */
}
