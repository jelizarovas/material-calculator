import React, { useState, useEffect } from "react";
import { Input } from "../Inputs/Input";
import {
  AccessTime,
  SettingsEthernet,
  LocalShippingOutlined,
  LocalShippingTwoTone,
  FitnessCenter,
  LocalOffer,
  LocalShipping,
  CreditCard,
  LocalOfferTwoTone,
  SettingsOverscan,
  Receipt,
} from "@material-ui/icons/";
import { SectionTitle } from "../Layout/SectionTitle";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

// import { ChipsInput } from "../Inputs/ChipsInput";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { NoInput } from "../Inputs/NoInput";
import { Local } from "./Local";
import { LongDistance } from "./LongDistance";
// import { TimeInput } from "../Inputs/TimeInput";

export const FlatRate = () => {
  const [showHelp, setshowHelp] = useState(false);
  const client = useMove();
  const dispatch = useMoveDispatch();

  const { flatIsMaterialsIncluded } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const {
    totalTransportation,
    jobType,
    flatAmount,
    distance,
    grossWeight,
    tareWeight,
    netWeight,
    mileageRate,

    weightType,
  } = client;

  const explanation =
    "Is this flat amount just for the transportation/labor, or are all the materials included in price?";

  return (
    <div>
      <Input
        name="flatAmount"
        value={flatAmount}
        onChange={onChange}
        placeholder="Flat Amount"
        Icon={() => <span>$</span>}
      />
      <input
        name="flatIsMaterialsIncluded"
        className="mr-5 ml-3"
        checked={flatIsMaterialsIncluded}
        onChange={() => {
          dispatch({
            field: "flatIsMaterialsIncluded",
            value: !flatIsMaterialsIncluded,
          });
        }}
        placeholder="Total Valuation Cost"
        type="checkbox"
      />
      <label htmlFor="flatIsMaterialsIncluded">
        Materials included?
        <span className="text-xs  cursor-pointer select-none pl-4" onClick={() => setshowHelp(!showHelp)}>
          {!showHelp ? "> " : "x "} Help
        </span>
      </label>
      {showHelp && <span className="block">{explanation}</span>}
    </div>
  );
};
