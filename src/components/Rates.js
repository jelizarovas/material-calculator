import React, { useReducer } from "react";
import { Input } from "./Input";
import {
  AttachMoney,
  Email,
  Phone,
  Home,
  LocalShipping,
  CalendarToday,
  AccessTime,
  Clear,
} from "@material-ui/icons/";

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  };
};

const initialState = {
  date: getFormattedDate(new Date()),
  hourlyRate: 0,
  travelFee: 0,
  totalHours: 0,
};

export const Rates = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  const { date, hourlyRate, travelFee, totalHours } = state;

  return (
    <div className="md:container md:mx-auto">
      <div className="px-10 w-full sm:w-1/2 mx-auto lg:w-1/3 flex-row ">
        <form method="post">
          <h2>Job Type</h2>

          <select className="m-2 w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900">
            <option>⏰ Local (Hourly)</option>
            <option>🚚 Long Distance</option>
            <option>💳 Flat Rate</option>
          </select>

          <h2>Date</h2>
          <Input
            name="date"
            value={date}
            onChange={onChange}
            Icon={CalendarToday}
            placeholder="Date"
            type="text"
          />

          <h2>Rates</h2>

          <Input
            name="hourlyRate"
            value={hourlyRate}
            onChange={onChange}
            placeholder="Hourly"
            type="number"
            Icon={AttachMoney}
            step="5"
          />
          <Input
            name="travelFee"
            value={travelFee}
            onChange={onChange}
            placeholder="Travel Fee"
            type="number"
            Icon={LocalShipping}
          />

          <h2>Totals</h2>
          <Input
            name="totalHours"
            value={totalHours}
            onChange={onChange}
            placeholder="Total Hours"
            type="number"
            Icon={AccessTime}
            min="2"
          />

          <h2 className="text-4xl mt-10">
            Total sum is ${" "}
            {Number(totalHours) * Number(hourlyRate) + Number(travelFee)}
          </h2>
        </form>
        <pre>{JSON.stringify(state, 0, 2)}</pre>
      </div>
    </div>
  );
};
