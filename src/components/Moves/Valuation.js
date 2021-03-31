import React, { useState, useEffect } from "react";
import { Input } from "../Inputs/Input";
import { FitnessCenter, AttachMoney, Star, StarHalf, StarOutline, Edit, Clear } from "@material-ui/icons/";
import { SectionTitle } from "../Layout/SectionTitle";
import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { SignButton } from "./SignButton";

export const Valuation = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();
  const {
    valuation,
    valuationCost,
    valuationCostWithDeductible,
    shipmentValue,
    estimatedWeight,
    valuationRate,
    valuationRateWithDeductible,
  } = client;

  const [showChangeRates, setShowChangeRates] = useState(false);

  const toggleShowChangeRate = () => setShowChangeRates((show) => !show);

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const buttons = [
    { value: "basic", placeholder: "Basic (Free)", Icon: StarOutline },
    {
      value: "replacementWithDeductible",
      placeholder: `Replacement (w/$300 Ded) ($${valuationCostWithDeductible})`,
      Icon: StarHalf,
    },
    { value: "replacement", placeholder: `Full Replacement ($${valuationCost})`, Icon: Star },
  ];

  /*########## DEFAULT VALUES ##########*/
  /*########## DEFAULT VALUES ##########*/
  /*########## DEFAULT VALUES ##########*/
  useEffect(() => {
    const payload = {};
    if (valuationRate === undefined) payload.valuationRate = 1.4;
    if (valuationRateWithDeductible === undefined) payload.valuationRateWithDeductible = 1.15;
    if (valuation === undefined) payload.valuation = "basic";
    if (valuationCost === undefined) payload.valuationCost = 0;
    if (valuationCostWithDeductible === undefined) payload.valuationCostWithDeductible = 0;
    if (shipmentValue === undefined) payload.shipmentValue = 0;
    if (estimatedWeight === undefined) payload.estimatedWeight = 0;
    dispatch({ type: "fieldsUpdate", payload });
  }, [
    valuation,
    valuationCost,
    valuationCostWithDeductible,
    shipmentValue,
    estimatedWeight,
    valuationRate,
    valuationRateWithDeductible,
    dispatch,
  ]);

  return (
    <>
      <SectionTitle title="Valuation" onClick={toggleShowChangeRate} Icon={showChangeRates ? Clear : Edit} />
      <div className="flex">
        <div className="w-1/2 text-center">
          <Input
            name="estimatedWeight"
            value={estimatedWeight}
            onChange={onChange}
            Icon={FitnessCenter}
            placeholder="Estimated Weight"
            type="number"
            units="lbs."
            align="center"
          />
        </div>
        <div className="w-1/2 relative">
          <Input
            name="shipmentValue"
            value={shipmentValue}
            onChange={onChange}
            Icon={AttachMoney}
            placeholder="Shipment Value"
            type="number"
            align="center"
          />
          {/* https://www.utc.wa.gov/regulatedIndustries/transportation/TransportationDocuments/Tariff%2015-C.PDF */}
          {/* Shipment value is at least $5 per lbs., (val > weight * 5) */}
          {estimatedWeight && Number(estimatedWeight) * 5 > Number(shipmentValue) && (
            <span className="text-xs text-red-500 flex justify-center absolute top-12 right-12">
              Min Shimpent Value ${Math.ceil((estimatedWeight * 5) / 100) * 100}
            </span>
          )}
        </div>
      </div>
      {/*   Valuation can be charged at $0.66 <= v <= $1.40 */}
      {/*   Valuation w300ded can be charged at $0.55 <= v <= $1.15 */}

      {showChangeRates && (
        <div className="flex justify-around bg-white bg-opacity-50 p-5 rounded-md">
          <ValuationRates
            name="valuationRateWithDeductible"
            rate={valuationRateWithDeductible}
            placeholder="Replacement w/ deductible"
            onChange={onChange}
            min="0.55"
            max="1.15"
          />
          <ValuationRates
            name="valuationRate"
            rate={valuationRate}
            onChange={onChange}
            min="0.66"
            max="1.40"
            placeholder="Full Replacement"
          />
        </div>
      )}

      <ButtonSelect onClick={onChange} name="valuation" value={valuation} buttons={buttons} vertical={true} />
      <SignButton label="initial" />
    </>
  );
};

/* Shipment value is at least $5 per lbs., (val > weight * 5) */
/* https://www.utc.wa.gov/regulatedIndustries/transportation/TransportationDocuments/Tariff%2015-C.PDF */
/*   Valuation can be charged at $0.66 <= v <= $1.40 */
/*   Valuation w300ded can be charged at $0.55 <= v <= $1.15 */

const ValuationRates = ({ name, rate, onChange, min, max, placeholder }) => {
  return (
    <div className="text-xs flex flex-col justify-center text-center">
      <span>{placeholder}</span> <span className="text-sm py-2">${rate}/ 100 lbs.</span>
      <div class="slidecontainer">
        <input
          className="w-full lg:w-1/2"
          name={name}
          type="range"
          min={min}
          max={max}
          step={1 / 100}
          value={rate}
          class="slider"
          id="myRange"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
