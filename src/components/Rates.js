import React, { useState } from "react";
import { Input } from "./Input";
import { Dates } from "./Dates";
import { AccessTime, Money } from "@material-ui/icons/";

import { useClient, useClientDispatch } from "./Providers/ClientProvider";

import { ChipsInput } from "./ChipsInput";

const TravelTime = ({ onChange, travelTime, hourlyRate }) => {
  const times = [
    { label: "0:00 ", value: 0 },
    { label: "0:15", value: 0.25 },
    { label: "0:30 ", value: 0.5 },
    { label: "0:45 ", value: 0.75 },
    { label: "1:00 ", value: 1 },
    { label: "1:15 ", value: 1.25 },
    { label: "1:30 ", value: 1.5 },
    { label: "1:45 ", value: 1.75 },
    { label: "2:00 ", value: 2 },
  ];
  if (hourlyRate)
    times.map((t) => {
      t.label += ` ($${hourlyRate * t.value})`;
      return t;
    });

  return (
    <select
      name="travelTime"
      value={travelTime}
      onChange={onChange}
      className="m-2 w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900"
    >
      {times.map((t) => (
        <option key={t.label} value={t.value}>
          ⏰ {t.label.toString()}
        </option>
      ))}
      <option onSelect={() => console.log("more")}>More...</option>
    </select>
  );
};

export const Rates = () => {
  const client = useClient();
  const dispatch = useClientDispatch();

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const {
    isTravelFeeFixed,
    hourlyRate,
    personnel,
    travelTime,
    totalHours,
    startTime,
    endTime,
    arriveTime,
    departTime,
    breakTime,
    jobType,
    flatAmount,
    distance,
    grossWeight,
    tareWeight,
    netWeight,
    mileageRate,
  } = client;

  return (
    <div className="md:container md:mx-auto">
      <div className="px-10 w-full sm:w-1/2 mx-auto lg:w-1/2 flex-row ">
        <form method="post">
          <Dates />
          <ChipsInput name="personnel" chips={personnel} />

          <h2>Job Type</h2>
          <select
            name="jobType"
            onChange={onChange}
            value={jobType}
            className="m-2 w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900"
          >
            <option value="local">⏰ Local (Hourly)</option>
            <option value="longDistance">🚚 Long Distance</option>
            <option value="flatRate">💳 Flat Rate</option>
          </select>

          {/* <DropDown /> */}

          {jobType === "flatRate" && <FlatRate onChange={onChange} flatAmount={flatAmount} />}
          {jobType === "longDistance" && (
            <LongDistance
              onChange={onChange}
              distance={distance}
              grossWeight={grossWeight}
              tareWeight={tareWeight}
              netWeight={netWeight}
              mileageRate={mileageRate}
            />
          )}
          {jobType === "local" && (
            <React.Fragment>
              <h2>Rates</h2>
              <Input
                name="hourlyRate"
                value={hourlyRate}
                onChange={onChange}
                placeholder="Hourly"
                type="number"
                Icon={() => <span className="select-none text-bold">$/hr</span>}
                step="5"
              />
              <div className="flex items-center">
                <input
                  name="isTravelFeeFixed"
                  className="mr-5 ml-3"
                  checked={isTravelFeeFixed}
                  onChange={() => {
                    dispatch({ field: "isTravelFeeFixed", value: !isTravelFeeFixed });
                  }}
                  placeholder="Total Valuation Cost"
                  type="checkbox"
                />
                <label htmlFor="isTravelFeeFixed">Fixed?</label>
              </div>
              {isTravelFeeFixed ? (
                <div className="flex-col">
                  <div className="flex justify-between">
                    <label htmlFor="travelTime" className=" px-2 w-full">
                      Travel Time
                    </label>
                  </div>
                  {/* <div className="flex-row">
                    <label htmlFor="startTime" className=" px-2">
                    Fee
                    </label>
                    <Input
                    name="travelFee"
                    value={travelFee}
                    onChange={onChange}
                    placeholder="Travel Fee"
                    type="number"
                    Icon={LocalShipping}
                    />
                  </div> */}
                  {/* <div className="flex-row"> */}

                  <TravelTime name="travelTime" onChange={onChange} travelTime={travelTime} hourlyRate={hourlyRate} />
                  {/* </div> */}
                </div>
              ) : (
                <div className="flex">
                  <div className="flex-row">
                    <label htmlFor="startTime" className=" px-2">
                      Start
                    </label>
                    <Input
                      name="startTime"
                      value={startTime}
                      onChange={onChange}
                      placeholder="Start"
                      Icon={AccessTime}
                    />
                  </div>
                  <div className="flex-row">
                    <label htmlFor="endTime" className=" px-2">
                      End
                    </label>
                    <Input name="endTime" value={endTime} onChange={onChange} placeholder="End" Icon={AccessTime} />
                  </div>
                </div>
              )}
              {/* <h2>Time</h2> */}
              <div className="flex">
                <div className="flex-row">
                  <label htmlFor="arriveTime" className=" px-2">
                    Arrive
                  </label>
                  <Input
                    name="arriveTime"
                    value={arriveTime}
                    onChange={onChange}
                    placeholder="Arrive"
                    Icon={AccessTime}
                  />
                </div>
                <div className="flex-row">
                  <label htmlFor="departTime" className=" px-2">
                    Depart
                  </label>
                  <Input
                    name="departTime"
                    value={departTime}
                    onChange={onChange}
                    placeholder="Depart"
                    Icon={AccessTime}
                  />
                </div>
              </div>
              <div className="flex-row">
                <label htmlFor="breakTime" className=" px-2">
                  Breaks
                </label>
                <Input name="breakTime" value={breakTime} onChange={onChange} placeholder="Breaks" Icon={AccessTime} />
              </div>
              <h2>Totals</h2>
              <Input
                name="totalHours"
                value={totalHours}
                onChange={onChange}
                placeholder="Total Hours"
                Icon={AccessTime}
              />
              {/* <h2>Total hours</h2> */}
              {/* {arriveTime} to {departTime} ={" "} */}
              {/* {timeToDecimal(departTime) - timeToDecimal(arriveTime) - timeToDecimal(breakTime)} */}
              {/* <h2 className="text-4xl mt-10">
                Total sum is $ {Number(totalHours) * Number(hourlyRate) + Number(travelFee)}
              </h2> */}
            </React.Fragment>
          )}
        </form>
      </div>
    </div>
  );
};

// function timeToDecimal(t) {
//   var arr = t.split(":");
//   var dec = parseInt((arr[1] / 6) * 10, 10);

//   return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
// }

const FlatRate = ({ flatAmount, onChange }) => {
  const [showHelp, setshowHelp] = useState(false);

  const client = useClient();
  const dispatch = useClientDispatch();

  const { flatIsMaterialsIncluded } = client;

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

const LongDistance = ({ onChange, distance, grossWeight, tareWeight, netWeight, mileageRate }) => {
  return (
    <div>
      <h2>Long Distance</h2>
      <label htmlFor="distance">Distance (Miles)</label>
      <Input name="distance" value={distance} onChange={onChange} placeholder="distance" Icon={Money} />
      <label htmlFor="grossWeight">Gross Weight (lbs.)</label>
      <Input name="grossWeight" value={grossWeight} onChange={onChange} placeholder="grossWeight" Icon={Money} />
      <label htmlFor="tareWeight">Tare Weight (lbs.)</label>
      <Input name="tareWeight" value={tareWeight} onChange={onChange} placeholder="tareWeight" Icon={Money} />
      <label htmlFor="netWeight">Net Weight (lbs.)</label>
      <Input name="netWeight" value={netWeight} onChange={onChange} placeholder="netWeight" Icon={Money} />
      <label htmlFor="mileageRate">Mileage Rate ($/mile)</label>
      <Input name="mileageRate" value={mileageRate} onChange={onChange} placeholder="mileageRate" Icon={Money} />
    </div>
  );
};
