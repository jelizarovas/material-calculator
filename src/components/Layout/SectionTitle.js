import React from "react";

export const SectionTitle = ({ title, onPlusClick, plus = true, hidePlus = false, Icon = undefined }) => {
  //   const isFunction = function (obj) {
  //     return !!(obj && obj.constructor && obj.call && obj.apply);
  //   };
  return (
    <div className="flex justify-between  text-purple-500 border-b-2 mx-3  border-purple-500">
      <h2 className="text-md  px-4 pt-2  font-medium "> {title}</h2>
      {/* {isFunction(onPlusClick).toString()} */}
      {!hidePlus && (
        <span
          onClick={onPlusClick}
          className="text-lg text-gray-600 cursor-pointer select-none font-thin hover:text-purple-500  px-3 py-1 rounded-lg  "
        >
          {Icon ? <Icon className="p-1 color" /> : plus ? "+" : "×"}
        </span>
      )}
    </div>
  );
};
