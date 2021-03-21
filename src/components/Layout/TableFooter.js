import React from "react";
import { AddCircle, ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

export const TableFooter = (props) => {
  const { showMore, setShowMore, total, handleAdd } = props;
  return (
    <div className="text-gray-500  text-xs flex justify-between   rounded-b-lg">
      <div
        onClick={() => handleAdd()}
        className="select-none truncate w-1/3 md:w-1/4 flex justify-center items-center shadow-sm bg-white p-2 py-2 rounded-b-md cursor-pointer hover:text-green-800   mr-1"
      >
        <AddCircle className="p-1 mx-2 " /> Add Custom
      </div>
      <div
        className="truncate shadow-sm w-1/3 md:w-1/4 text-xs flex justify-evenly hover:text-gray-800   bg-white  p-2 py-2 rounded-b-md cursor-pointer "
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? (
          <span className="truncate">
            Show Less <ArrowDropUp />
          </span>
        ) : (
          <span>
            Show More <ArrowDropDown />
          </span>
        )}
      </div>
      <div className="truncate w-1/3 md:w-1/4 shadow-sm flex justify-center bg-white p-2 py-2 rounded-b-md ml-1">
        Total: <span className="px-2">${total}</span>
      </div>
    </div>
  );
};
