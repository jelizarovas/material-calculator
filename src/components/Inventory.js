import React from "react";
import { Input } from "./Input";
import { FitnessCenter } from "@material-ui/icons/";

import { useClient, useClientDispatch } from "./Providers/ClientProvider";

export const Inventory = () => {
  const client = useClient();
  const dispatch = useClientDispatch();
  const { estimatedWeight } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  return (
    <div>
      Inventory, test
      <Input
        name="estimatedWeight"
        value={estimatedWeight}
        onChange={onChange}
        Icon={FitnessCenter}
        placeholder="Estimated Weight"
        type="number"
      />
    </div>
  );
};
