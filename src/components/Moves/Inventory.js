import React from "react";
import { Input } from "../Inputs/Input";
import { FitnessCenter } from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

export const Inventory = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();
  const { estimatedWeight } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  return (
    <div>
      Inventory
      <Input
        name="estimatedWeight"
        value={estimatedWeight}
        onChange={onChange}
        Icon={FitnessCenter}
        placeholder="Estimated Weight"
        type="number"
      />
      <div className="bg-red-500"></div>
    </div>
  );
};
