import React from "react";

export const SectionTitle = ({
  title,
  onPlusClick,
  plus = true,
  hidePlus = false,
  Icon = undefined,
  Icon2 = undefined,
  // Icon3 = undefined,
  onClick,
  onClick2,
  // onClick3,
}) => {
  //   const isFunction = function (obj) {
  //     return !!(obj && obj.constructor && obj.call && obj.apply);
  //   };
  return (
    <div className="flex justify-between  text-purple-500 border-b-2 mx-3 mt-2   border-purple-500">
      <h2 className="text-lg  px-4   font-medium "> {title}</h2>
      {/* {isFunction(onPlusClick).toString()} */}
      {!hidePlus && (
        <div className="text-gray-600 cursor-pointer select-none font-thin ">
          {/* <span
            onClick={onClick3}
            className="text-lg text-gray-600 cursor-pointer select-none font-thin hover:text-purple-500  px-3 rounded-lg  "
          >
            {Icon3 ? <Icon3 className="color" /> : plus ? "+" : "×"}
          </span> */}
          {onClick2 && Icon2 && (
            <span onClick={onClick2} className="hover:text-purple-500  px-3 rounded-lg  ">
              {Icon2 ? <Icon2 className="p-1" /> : plus ? "+" : "×"}
            </span>
          )}
          <span onClick={onClick} className="  hover:text-purple-500  px-3 rounded-lg  ">
            {Icon ? <Icon className="p-1" /> : plus ? "+" : "×"}
          </span>
        </div>
      )}
    </div>
  );
};
