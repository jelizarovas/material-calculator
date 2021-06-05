import React, { useEffect, useState } from "react";
import { Input } from "../Inputs/Input";

import {
  Timelapse,
  HourglassEmpty,
  Restore,
  Update,
  Timer,
  AlarmOn,
  LocalOffer,
  Clear,
  LinkOff,
} from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

import { NoInput } from "../Inputs/NoInput";
import Select from "../Inputs/Select";
import { money_round } from "../../utils/helperFunctions";
import { nanoid } from "nanoid";
import { TimeInput } from "../Inputs/TimeInput";

// import { TimeInput } from "../Inputs/TimeInput";

export const Local = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();
  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const addBreak = (e) => {
    e.preventDefault();
    dispatch({ field: "breakTime", value: [...(breakTime || []), { id: nanoid(4) }] });
  };
  const removeBreak = (id) => {
    return (e) => {
      e.preventDefault();
      dispatch({
        field: "breakTime",
        value: breakTime.filter((b) => {
          return b.id !== id;
        }),
      });
    };
  };

  const { isTravelFeeFixed, hourlyRate, totalHours, startTime, endTime, arriveTime, departTime, breakTime } = client;

  return (
    <React.Fragment>
      <div className="flex max-w-md mx-auto space-x-2">
        <Input
          name="hourlyRate"
          value={hourlyRate}
          onChange={onChange}
          placeholder="Hourly Rate"
          Icon={LocalOffer}
          label="Hourly Rate"
          type="number"
          units="$/hr"
          align="right"
          min="0"
        />
        <TravelTime />
      </div>

      {!isTravelFeeFixed && (
        <div className="flex space-x-2 max-w-md w-full mx-auto">
          <Input
            name="startTime"
            value={startTime}
            onChange={onChange}
            Icon={Timer}
            placeholder="Start"
            label="Start"
            type="time"
            align="left"
          />
          <Input
            name="endTime"
            value={endTime}
            onChange={onChange}
            Icon={AlarmOn}
            placeholder="End"
            label="End"
            type="time"
            align="left"
          />
        </div>
      )}
      <div className="flex max-w-md m-2 space-x-2 bg-white py-2 px-4 rounded-md border-b-2 mx-auto">
        <div className="w-full">
          <TimeInput
            name="arriveTime"
            value={arriveTime}
            field="arriveTime"
            onChange={onChange}
            label="Arrive"
            Icon={Restore}
          />
        </div>
        <div className="w-full">
          <TimeInput
            name="departTime"
            value={departTime}
            field="departTime"
            onChange={onChange}
            label="Depart"
            Icon={Update}
          />
        </div>
      </div>
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
      {/* <div className="flex space-x-2 max-w-md w-full mx-auto">
        <Input
          name="arriveTime"
          value={arriveTime}
          onChange={onChange}
          Icon={Restore}
          placeholder="Arrive"
          label="Arrive"
          type="time"
          align="left"
        />
        <Input
          name="departTime"
          value={departTime}
          onChange={onChange}
          Icon={Update}
          placeholder="Depart"
          label="Depart"
          type="time"
          align="left"
        />
      </div> */}
      {!!breakTime && breakTime.map((b, idx) => <BreakTime removeBreak={removeBreak} breakId={b?.id} idx={idx} />)}
      <div className="text-xs my-2 flex  ">
        <button className="mx-auto   rounded-md flex items-center text-gray-700" onClick={addBreak}>
          <HourglassEmpty className="p-1" />
          <span className="pr-2">Add a Break</span>
        </button>
      </div>

      <NoInput value={totalHours?.toString()} Icon={Timelapse} type="time" unit="Hrs" label="Total Time" />
    </React.Fragment>
  );
};

const TravelTime = (props) => {
  const client = useMove();
  const dispatch = useMoveDispatch();

  const { isTravelFeeFixed, hourlyRate, travelTime } = client;
  console.log("travel time render", travelTime);

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
    { label: "More... ", isCustom: true },
  ];

  if (hourlyRate)
    times.map((t) => {
      if (!t?.isCustom) t.label += ` ($${money_round(Number(hourlyRate) * t.value)})`;
      return t;
    });
  useEffect(() => {
    if (!!isTravelFeeFixed && !!hourlyRate)
      dispatch({
        field: "travelTime",
        value: {
          ...travelTime,
          label: travelTime.label.split(" ")[0] + ` ($${money_round(Number(hourlyRate) * travelTime.value)})`,
        },
      });
  }, [hourlyRate]);

  return <Select name="travelTime" value={travelTime} dispatch={dispatch} options={times} defaultValueIndex="5" />;
};

const BreakTime = ({ removeBreak, breakId, idx }) => {
  const [timeType, setTimeType] = useState("duration");

  const onChange = (e) => setTimeType(e.target.value);
  //TODO break cannot be before or after start times
  return (
    <div className="flex flex-col justify-start  w-full text-sm text-gray-500 focus-within:text-purple-600 max-w-md mx-auto ">
      <label htmlFor={breakId} className="text-xs mt-1 text-justify pl-2">
        {`Break #${idx + 1}`}
      </label>
      <div className="flex justify-between space-x-1 py-1  w-full max-w-md mx-auto bg-white rounded-md mt-1 border-b-2  text-gray-600 text-xs items-center px-4 ">
        <select name="" id="" className="border px-1 py-1  rounded-md" onChange={onChange} value={timeType}>
          <option value="duration">Total</option>
          <option value="interval">Start/End</option>
        </select>
        {timeType === "duration" && (
          <select className="border text-center px-1 py-1  rounded-md">
            <option>15 min</option>
            <option>30 min</option>
            <option>45 min</option>
            <option>1 hr</option>
            <option>1 hr 15 min</option>
            <option>1 hr 30 min</option>
          </select>
        )}
        {timeType === "interval" && (
          <div className="flex items-center">
            <span>from</span> <input className="border rounded-md py-1 px-1 w-16 mx-1 text-center" />
            <span>to</span> <input className="border rounded-md py-1 px-1 w-16 mx-1 text-center" />
            <span>is</span>{" "}
            <div className="border cursor-pointer border-yellow-400 bg-yellow-50 rounded-md py-1 px-1 w-16 mx-1 text-center">
              1:00
            </div>
          </div>
        )}

        <button className="p-1 " onClick={removeBreak(breakId)}>
          <Clear className="p-1" />
        </button>
      </div>
    </div>
  );
};
