import React from "react";
import { Input } from "./Input";
import { CalendarToday, EventBusy, Today, Add, Remove } from "@material-ui/icons/";

import { useClient, useClientDispatch } from "./Providers/ClientProvider";

export const Dates = () => {
  const dispatch = useClientDispatch();
  const client = useClient();

  const { dates } = client;

  const handleChange = (e, index) => {
    const newArray = dates;
    newArray[index] = e.target.value;
    dispatch({ field: "dates", value: [...newArray] });
  };

  const addDate = () => {
    dispatch({ field: "dates", value: [...dates, ""] });
  };

  const handleDelete = (index) => {
    if (dates.length > 1) {
      const newArray = dates;
      newArray.splice(index, 1);
      dispatch({ field: "dates", value: [...newArray] });
    }
  };

  return (
    <div>
      <div className="flex justify-between bg-gray-100 bg-opacity-50 mt-4">
        <h2 className="text-lg text-gray-800 px-4 py-2 font-thin">Date{dates.length > 1 ? "s" : ""}</h2>

        <span
          onClick={addDate}
          className="text-lg text-gray-800 cursor-pointer select-none font-thin  rounded-full py-1 px-4 m-1"
        >
          +
        </span>
      </div>
      {dates &&
        dates.map((d, i) => {
          return (
            <Day
              key={i}
              index={i}
              value={d}
              handleChange={handleChange}
              handleDelete={handleDelete}
              canDelete={dates.length > 1}
            />
          );
        })}
    </div>
  );
};

const Day = ({ index = 1, value, handleChange, handleDelete, canDelete }) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-200 m-1">
      <Input
        name={"date-" + (index + 1)}
        value={value}
        onChange={(e) => handleChange(e, index)}
        Icon={CalendarToday}
        placeholder={"Day " + (index + 1)}
        type="text"
        className="flex-grow w-full"
      />
      <div className="flex">
        <span className=" flex-shrink hover:text-red-500 cursor-pointer m-2">
          <Remove onClick={() => handleChange({ target: { value: decrementDate(value) } }, index)} />
        </span>
        <span className=" flex-shrink hover:text-blue-500 cursor-pointer m-2">
          <Today onClick={() => handleChange({ target: { value: getFormattedDate(new Date()) } }, index)} />
        </span>
        <span className=" flex-shrink hover:text-green-500 cursor-pointer m-2">
          <Add onClick={() => handleChange({ target: { value: incrementDate(value) } }, index)} />
        </span>
      </div>
      {canDelete && (
        <span className=" flex-shrink hover:text-red-500 cursor-pointer m-2">
          <EventBusy onClick={() => handleDelete(index)} />
        </span>
      )}
    </div>
  );
};

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}

function incrementDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  date.setDate(date.getDate() + 1);
  return getFormattedDate(date);
}
function decrementDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  date.setDate(date.getDate() - 1);
  return getFormattedDate(date);
}
