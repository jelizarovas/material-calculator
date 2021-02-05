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

const reducer = ({ action, type }) => {};

export const Rates = () => {
  // const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <div className="md:container md:mx-auto">
      <div className="px-10 w-full sm:w-1/2 mx-auto lg:w-1/3 flex-row ">
        <h2>Job Type</h2>

        <select className="m-2 w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900">
          <option>⏰ Local (Hourly)</option>
          <option>🚚 Long Distance</option>
          <option>💳 Flat Rate</option>
        </select>

        <h2>Date</h2>
        <Input
          Icon={CalendarToday}
          placeholder="Date"
          type="text"
          defaultValue={() => {
            return getFormattedDate(new Date());
          }}
        />

        <h2>Rates</h2>

        <Input placeholder="Hourly" type="number" Icon={AttachMoney} step="5" />
        <Input placeholder="Travel Fee" type="number" Icon={LocalShipping} />

        <h2>Totals</h2>
        <Input
          placeholder="Total Hours"
          type="number"
          Icon={AccessTime}
          min="2"
        />
      </div>
    </div>
  );
};
