import { Delete } from "@material-ui/icons";
import React, { memo, useCallback } from "react";

import CountButton from "../Inputs/CountButton";

export const Material = memo((props) => {
  const { handleChange, handleRemove, id, name, img, rate = 0, units = 0, total = 0, isCustom = false } = props;

  const changeCount = useCallback(
    (units) => {
      handleChange(id, { units, total: Number(units) * Number(rate) });
    },
    [id, handleChange, rate]
  );

  const changeRate = useCallback(
    (e) => {
      handleChange(id, { rate: e.target.value, total: Number(units) * Number(e.target.value) });
    },
    [id, handleChange, units]
  );
  const changeInput = useCallback(
    (e) => {
      handleChange(id, { [e.target.name]: e.target.value });
    },
    [id, handleChange]
  );

  return (
    <div
      className={`odd:bg-gray-50 flex relative justify-between items-center  border-b ${
        units > 0 ? "bg-green-50 hover:bg-green-100" : "hover:bg-purple-100"
      }`}
    >
      <div className="flex items-center w-1/3 sm:w-1/2   align-middle  pl-2">
        <div className="pr-3">
          {isCustom ? (
            <Delete onClick={() => handleRemove(id)} className="p-1 hover:text-red-400 cursor-pointer" />
          ) : (
            <img className="max-h-5 w-5" src={process.env.PUBLIC_URL + "/" + img} alt="" />
          )}
        </div>
        <div className="flex-col w-full flex-1   truncate">
          {!isCustom ? (
            <span className="select-none text-sm truncte">{name}</span>
          ) : (
            <input
              name="name"
              value={name}
              onChange={changeInput}
              onFocus={(e) => e.target.select()}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.target.blur();
              }}
              className="p-1 bg-transparent w-full  text-xs border-b-2 focus:border-green-700 hover:border-green-700  cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="w-1/4">
        <CountButton count={units} changeCount={changeCount} />
      </div>

      <div className="text-right text-xs px-3 flex items-center flex-nowrap flex-shrink-0 justify-center w-1/3 sm:w-1/4">
        <span className={units > 0 ? "text-gray-800" : "text-gray-400"}>{units > 0 ? "× " : "$"}</span>
        <input
          className={`p-1 w-9 bg-transparent  text-xs text-center  border-b focus:border-green-700 hover:border-green-700  cursor-pointer`}
          name="rate"
          value={rate}
          type="number"
          onChange={changeRate}
          onFocus={(e) => e.target.select()}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
        />
        <span className={`truncate ${units > 0 ? "text-gray-800" : "text-gray-400"} `}>
          {units > 0 ? ` = $ ${total}` : "/ unit"}
        </span>
      </div>
    </div>
  );
});
