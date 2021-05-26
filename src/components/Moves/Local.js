import React from "react";
import { Input } from "../Inputs/Input";
import { Timelapse, HourglassEmpty, Restore, Update, Timer, AlarmOn, LocalOffer, Clear } from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

import { NoInput } from "../Inputs/NoInput";
import Select from "../Inputs/Select";
// import { TimeInput } from "../Inputs/TimeInput";

export const Local = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();
  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const {
    isTravelFeeFixed,
    hourlyRate,
    travelTime,
    totalHours,
    startTime,
    endTime,
    arriveTime,
    departTime,
    breakTime,
  } = client;

  return (
    <React.Fragment>
      <div className="flex max-w-md mx-auto space-x-2">
        <Input
          name="hourlyRate"
          value={hourlyRate}
          onChange={onChange}
          placeholder="Hourly Rate"
          type="number"
          Icon={LocalOffer}
          step="5"
          label="Hourly Rate"
          type="number"
          units="$/hr"
          align="right"
          min="0"
        />
        <TravelTime name="travelTime" dispatch={dispatch} travelTime={travelTime} hourlyRate={hourlyRate} />
        {/* <Select values={travelTimes} name="travelTime" /> */}
      </div>
      {/* <div className="flex items-center">
        <input
          name="isTravelFeeFixed"
          className="mr-5 ml-3"
          checked={isTravelFeeFixed}
          onChange={(e) => dispatch({ field: e.target.name, value: !isTravelFeeFixed })}
          placeholder="Total Valuation Cost"
          type="checkbox"
        />
        <label htmlFor="isTravelFeeFixed">Fixed?</label>
      </div> */}

      {isTravelFeeFixed ? (
        <div className="flex-col">
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

          {/* </div> */}
        </div>
      ) : (
        <div className="flex space-x-2 ">
          <div className="flex-row ">
            <label htmlFor="startTime" className=" px-2">
              Start
            </label>
            <Input name="startTime" value={startTime} onChange={onChange} placeholder="Start" Icon={Timer} />
          </div>
          <div className="flex-row">
            <label htmlFor="endTime" className=" px-2">
              End
            </label>
            <Input name="endTime" value={endTime} onChange={onChange} placeholder="End" Icon={AlarmOn} />
          </div>
        </div>
      )}
      {/* <h2>Time</h2> */}
      {/* <div className="flex">
          <div className="flex-row">
            <label htmlFor="arriveTime" className=" px-2">
              Arrive
            </label>
            <TimeInput
              name="arriveTime"
              value={arriveTime}
              field="arriveTime"
              onChange={onChange}
              placeholder="Arrive"
              Icon={Restore}
            />
          </div>
          <div className="flex-row">
            <label htmlFor="departTime" className=" px-2">
              Depart
            </label>
            <TimeInput name="departTime" value={departTime} onChange={onChange} placeholder="Depart" Icon={Update} />
          </div>
        </div> */}
      <div className="flex space-x-2">
        <div className="flex-row">
          <label htmlFor="arriveTime" className=" px-2">
            Arrive
          </label>
          <Input name="arriveTime" value={arriveTime} onChange={onChange} placeholder="Arrive" Icon={Restore} />
        </div>
        <div className="flex-row">
          <label htmlFor="departTime" className=" px-2">
            Depart
          </label>
          <Input name="departTime" value={departTime} onChange={onChange} placeholder="Depart" Icon={Update} />
        </div>
      </div>
      <div className="flex-row">
        <label htmlFor="breakTime" className=" px-2">
          Breaks
        </label>
        <Input name="breakTime" value={breakTime} onChange={onChange} placeholder="Breaks" Icon={HourglassEmpty} />
      </div>
      <h2>Totals</h2>
      <NoInput value={totalHours?.toString()} Icon={Timelapse} type="time" unit="Hrs" label="Total Time" />
      {/* <Input name="totalHours" value={totalHours} onChange={onChange} placeholder="Total Hours" Icon={AccessTime} /> */}
      {/* <h2>Total hours</h2> */}
      {/* {arriveTime} to {departTime} ={" "} */}
      {/* {timeToDecimal(departTime) - timeToDecimal(arriveTime) - timeToDecimal(breakTime)} */}
      {/* <h2 className="text-4xl mt-10">
              Total sum is $ {Number(totalHours) * Number(hourlyRate) + Number(travelFee)}
            </h2> */}
    </React.Fragment>
  );
};

const TravelTime = ({ dispatch, travelTime, hourlyRate }) => {
  const times = [
    {
      label: "Not Fixed",
      isCustom: true,
      Icon: Clear,
      onSelect: () => {
        dispatch({ field: "isTravelFeeFixed", value: false });
      },
      onDeselect: () => {
        dispatch({ field: "isTravelFeeFixed", value: true });
      },
    },
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
      if (!t?.isCustom) t.label += ` ($${hourlyRate * t.value})`;
      return t;
    });

  return <Select name="travelTime" value={travelTime} dispatch={dispatch} options={times} />;
};
