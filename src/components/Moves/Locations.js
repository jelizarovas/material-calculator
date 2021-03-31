import React from "react";
import { Input } from "../Inputs/Input";
import { Home, LocalShipping, AddLocation, Remove, Add } from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { SectionTitle } from "../Layout/SectionTitle";

export const Locations = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();
  const { originAddress, destinationAddress, additionalStops, anyAdditionalStops } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  // TODO when address autocomplete is done, if address not found
  // (most likely case of newly built house) allow entry of coordinates

  // TODO autocomplete address

  // TODO calculate distance as the crow flies

  return (
    <>
      <SectionTitle
        title="Locations"
        onClick={() =>
          dispatch({
            field: "anyAdditionalStops",
            value: !anyAdditionalStops,
          })
        }
        Icon={anyAdditionalStops ? Remove : Add}
      />
      <Input
        name="originAddress"
        value={originAddress}
        onChange={onChange}
        Icon={Home}
        placeholder="Starting Point (Origin)"
      />
      {anyAdditionalStops && (
        <Input
          name="additionalStops"
          value={additionalStops}
          onChange={onChange}
          Icon={AddLocation}
          placeholder="Other Stops"
        />
      )}
      <Input
        name="destinationAddress"
        value={destinationAddress}
        onChange={onChange}
        Icon={LocalShipping}
        placeholder="End Point (Destination)"
      />
    </>
  );
};
