import React, { useEffect } from "react";
import { Input } from "../Inputs/Input";
import {
  SettingsEthernet,
  LocalShippingOutlined,
  LocalShippingTwoTone,
  FitnessCenter,
  LocalOffer,
  SettingsOverscan,
  Receipt,
} from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

// import { ChipsInput } from "../Inputs/ChipsInput";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { NoInput } from "../Inputs/NoInput";
// import { TimeInput } from "../Inputs/TimeInput";

export const LongDistance = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const { distance, grossWeight, tareWeight, netWeight, mileageRate, cubicWeight, weightType } = client;

  useEffect(() => {
    if (!weightType)
      dispatch({
        field: "weightType",
        value: "cubicWeight",
      });
    return () => {};
  }, [weightType, dispatch]);

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col justify-center   w-1/2">
          <label htmlFor="distance" className="text-xs text-center">
            Distance
          </label>

          <Input
            units="miles"
            name="distance"
            value={distance}
            onChange={onChange}
            placeholder="Distance"
            Icon={SettingsEthernet}
          />
        </div>
        <div className="flex flex-col justify-center   w-1/2">
          <label htmlFor="mileageRate" className="text-xs text-center">
            Mileage Rate
          </label>
          <Input
            name="mileageRate"
            value={mileageRate}
            onChange={onChange}
            placeholder="Mileage Rate"
            Icon={LocalOffer}
            units="$/lbs."
          />
        </div>
      </div>
      <WeightType onClick={onChange} value={weightType} />
      {weightType === "weightTicket" && (
        <React.Fragment>
          <div className="flex">
            <div className="flex flex-col justify-center  w-1/2">
              {/* <label htmlFor="grossWeight" className="text-xs text-center">
                  Gross Weight (lbs.)
                </label> */}
              <Input
                name="grossWeight"
                value={grossWeight}
                onChange={onChange}
                placeholder="Gross Weight"
                Icon={LocalShippingTwoTone}
                units="lbs."
              />
            </div>
            <div className="flex flex-col justify-center   w-1/2">
              {/* <label htmlFor="tareWeight" className="text-xs text-center">
                  Tare Weight (lbs.)
                </label> */}
              <Input
                name="tareWeight"
                value={tareWeight}
                onChange={onChange}
                placeholder="Tare Weight"
                Icon={LocalShippingOutlined}
                units="lbs."
              />
            </div>
          </div>
          <NoInput value={netWeight} Icon={FitnessCenter} unit="lbs." label="Net Weight" />
        </React.Fragment>
      )}
      {weightType === "cubicWeight" && (
        // <label htmlFor="netWeight" className="text-xs text-center">
        //   Net Weight (lbs.)
        // </label>
        <Input
          name="cubicWeight"
          value={cubicWeight}
          onChange={onChange}
          placeholder="Cubic Weight"
          units="lbs."
          Icon={FitnessCenter}
        />
      )}
    </div>
  );
};

const WeightType = (props) => {
  const dateTypes = [
    { value: "cubicWeight", placeholder: "Cubic Weight", Icon: SettingsOverscan },
    { value: "weightTicket", placeholder: "Weight Ticket", Icon: Receipt },
  ];
  return <ButtonSelect name="weightType" buttons={dateTypes} {...props} />;
};
