import { ArrowDropDown } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";

export const TimeInput = (props) => {
  const { value, Icon, onChange, field } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [hour, setHour] = useState(value.split(":")[0] || "00");
  const [minutes, setMinutes] = useState(value.split(":")[1] || "00");

  useEffect(() => {
    setHour(value.split(":")[0] || "00");
    setMinutes(value.split(":")[1] || "00");
  }, [value, setHour, setMinutes]);

  //   useEffect(() => {
  //     if (`${hour}:${minutes}` !== value)
  //       onChange({
  //         target: {
  //           field,
  //           value: `${hour}:${minutes}`,
  //         },
  //       });
  //   }, [minutes, hour, onChange, field, value]);
  // useEffect(() => {
  //   if (`${hour}:${minutes}` !== value)
  //     onChange({
  //       target: {
  //         field,
  //         value: `${hour}:${minutes}`,
  //       },
  //     });
  // }, [minutes, hour, onChange, field, value]);

  return (
    <div className="flex justify-center w-full relative " onClick={() => setShowDropdown(!showDropdown)}>
      <DropDown showDropdown={showDropdown} hour={hour} setHour={setHour} minutes={minutes} setMinutes={setMinutes} />
      <div className="relative text-gray-600 focus-within:text-red-400 w-full   m-2">
        <span className="absolute  inset-y-0 left-0 flex items-center pl-2 cursor-pointer">
          <Icon />
        </span>
        <div className="flex justify-evenly items-center w-full   py-3 pr-10 text-sm text-black bg-yellow-50 rounded-md border-b-2 pl-10 focus:outline-none focus:bg-white focus:text-gray-900 text-center font-bold cursor-pointer">
          <span className="w-3/5">{hour.toString() + ":" + minutes.toString()}</span>
        </div>

        <span className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer opacity-20 focus:opacity-100 hover:opacity-100">
          <ArrowDropDown />
        </span>
      </div>
    </div>
  );
};

const DropDown = ({ showDropdown, setHour, setMinutes, hour, minutes }) => {
  let hrs = [];
  for (let i = 1; i < 24; i++) {
    hrs[i] = i;
  }

  return (
    showDropdown && (
      <div className="absolute bg-white rounded-md z-10 top-14 w-full m-2 flex shadow-xl">
        <Scrollbars style={{ height: "100%", minHeight: "30vh", width: "66%" }} className="w-1/2">
          <ul className="mr-3">
            {hrs.map((hr, i) => (
              <li onClick={() => setHour(hr)} className="text-right pb-1 pr-2 hover:bg-yellow-300 cursor-pointer">
                {hr}
              </li>
            ))}
          </ul>
        </Scrollbars>
        <ul className="w-3/7">
          {["00", "15", "30", "45"].map((min, i) => (
            <li onClick={() => setMinutes(min)} className="p-4 hover:bg-yellow-300 cursor-pointer">
              {min}
            </li>
          ))}

          <li
            onClick={() => setMinutes("current minutes")}
            className="m-2 p-2 rounded-md  bg-blue-600 hover:bg-blue-800 cursor-pointer text-white"
          >
            Now
          </li>
        </ul>
      </div>
    )
  );
};
