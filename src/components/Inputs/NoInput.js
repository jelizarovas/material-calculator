import { LinkOff } from "@material-ui/icons";
import React from "react";
import { money_round } from "../../utils/helperFunctions";

export const NoInput = ({ value, label, Icon, unit = "", type = "number" }) => {
  return (
    <div className="flex justify-center w-full  ">
      <div className="relative text-gray-600 focus-within:text-red-400 w-full   m-2">
        <span className="absolute text-yellow-800 inset-y-0 left-0 flex items-center pl-2 cursor-pointer">
          <Icon />
        </span>
        <div className="flex justify-evenly items-center w-full   py-3 pr-10 text-sm text-black bg-yellow-50 rounded-md border-b-2 pl-10 focus:outline-none focus:bg-white focus:text-gray-900 text-center font-bold cursor-pointer">
          <span className=" w-3/5 font-thin text-xs px-2 truncate">{label}</span>
          <span className="w-1/5">
            {unit === "$" && unit + " "}
            {type === "number"
              ? money_round(value)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : value?.toString()}
          </span>

          <span className="font-thin text-xs px-2 truncate w-1/5">{unit !== "$" && unit}</span>
        </div>

        <span className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer opacity-20 focus:opacity-100 hover:opacity-100">
          <LinkOff />
        </span>
      </div>
    </div>
  );
};
