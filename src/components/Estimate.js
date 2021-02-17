import React, { useState } from "react";
import { Input } from "./Input";
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

import { useClient, useClientDispatch } from "./Providers/ClientProvider";

export const Estimate = () => {
  const client = useClient();
  const dispatch = useClientDispatch();
  const {
    estimateIsBinding,
    valuation,
    valuationCost,
    valuationCostWithDeductible,
    totalValuation,
    agreedToEstimate,
    shipmentValue,
    estimatedWeight,
    estimateAgreedDate,
    valuationRate,
    valuationRateWithDeductible,
  } = client;

  const onChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  return (
    <div className="md:container md:mx-auto">
      <div className="px-10 w-full sm:w-1/2 mx-auto lg:w-1/2 flex-row ">
        <form action="" method="post">
          {/* <h2>Estimate</h2> */}
          <Input
            name="estimatedWeight"
            value={estimatedWeight}
            onChange={onChange}
            Icon={FitnessCenter}
            placeholder="Estimated Weight"
            type="number"
          />
          Min Shimpent Value {Math.ceil((estimatedWeight * 5) / 100) * 100}
          {/* Shipment value is at least $5 per lbs., (val > weight * 5) */}
          {/* https://www.utc.wa.gov/regulatedIndustries/transportation/TransportationDocuments/Tariff%2015-C.PDF */}
          {/*   Valuation can be charged at $0.66 <= v <= $1.40 */}
          {/*   Valuation w300ded can be charged at $0.55 <= v <= $1.15 */}
          <Input
            name="shipmentValue"
            value={shipmentValue}
            onChange={onChange}
            Icon={AttachMoney}
            placeholder="Shipment Value"
            type="number"
            readOnly={true}
          />
          <EstimateIsBinding
            onChange={onChange}
            estimateIsBinding={estimateIsBinding}
          />
          <Valuation
            onChange={onChange}
            valuation={valuation}
            valuationCostWithDeductible={valuationCostWithDeductible}
            valuationCost={valuationCost}
            valuationRateWithDeductible={valuationRateWithDeductible}
            valuationRate={valuationRate}
          />
          <Input
            name="totalValuation"
            value={totalValuation}
            onChange={() => {}}
            Icon={() => {
              switch (valuation) {
                case "basic":
                  return <StarOutline />;
                case "replacement":
                  return <Star />;
                case "replacementWithDeductible":
                  return <StarHalf />;

                default:
                  break;
              }
              return;
            }}
            placeholder="Total Valuation"
            type="number"
            readOnly={true}
            clear={false}
          />
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
        </form>
        {/* <pre className="max-w-md overflow-hidden text-xs bg-white">{client && JSON.stringify(client, 0, 2)}</pre> */}
      </div>
    </div>
  );
};

const EstimateIsBinding = ({ estimateIsBinding, onChange }) => (
  <div className="mt-4 text-gray-700">
    <span className="text-gray-700">Estimate Type</span>
    <div className="mt-2">
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
  </div>
);
const Valuation = ({
  valuation,
  onChange,
  valuationCostWithDeductible,
  valuationCost,
  valuationRateWithDeductible,
  valuationRate,
}) => {
  const [showChangeRates, setShowChangeRates] = useState(false);

  return (
    <div className="mt-4 text-gray-700 flex-row">
      <div className="w-full    flex items-start justify-between p-2">
        <span className="text-gray-700">Valuation</span>
        <span
          className=" text-xs cursor-pointer select-none p-1"
          onClick={() => setShowChangeRates(!showChangeRates)}
        >
          {!showChangeRates ? (
            <span>
              <Edit fontSize="small" />
            </span>
          ) : (
            <span>
              <Clear />
            </span>
          )}
        </span>
      </div>
      {showChangeRates && (
        <div className="bg-white bg-opacity-50 p-5 rounded-md">
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

      <div className="mt-2">
        <label className="block">
          <input
            type="radio"
            onChange={onChange}
            className="form-radio"
            name="valuation"
            checked={valuation === "basic"}
            value="basic"
          />
          <span className="ml-2">Basic (Free)</span>
        </label>
        <label className="block ">
          <input
            type="radio"
            onChange={onChange}
            className="form-radio"
            name="valuation"
            checked={valuation === "replacementWithDeductible"}
            value="replacementWithDeductible"
          />
          <span className="ml-2">
            Replacement (w/$300 Ded) (${valuationCostWithDeductible})
          </span>
        </label>
        <label className="block">
          <input
            type="radio"
            onChange={onChange}
            className="form-radio"
            name="valuation"
            checked={valuation === "replacement"}
            value="replacement"
          />
          <span className="ml-2">Full Replacement (${valuationCost})</span>
        </label>
      </div>
    </div>
  );
};

/* Shipment value is at least $5 per lbs., (val > weight * 5) */
/* https://www.utc.wa.gov/regulatedIndustries/transportation/TransportationDocuments/Tariff%2015-C.PDF */
/*   Valuation can be charged at $0.66 <= v <= $1.40 */
/*   Valuation w300ded can be charged at $0.55 <= v <= $1.15 */

const ValuationRates = ({ name, rate, onChange, min, max, placeholder }) => {
  return (
    <div>
      {placeholder} - ${rate}/ 100 lbs.
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
