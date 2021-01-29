import React from "react";
import useLongPress from "../utils/useLongPress";
import clsx from "clsx";

const CountButton = ({ count, changeCount }) => {
  const increment = () => {
    changeCount(count + 1);
  };
  const decrement = () => {
    changeCount(count > 0 ? count - 1 : count);
  };
  const onChange = (e) => {
    var val = parseInt(e.target.value) || 0;
    return changeCount(val);
  };

  const onLongPress = () => {
    changeCount(0);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 1000,
  };

  const longPressEvent = useLongPress(onLongPress, decrement, defaultOptions);

  return (
    <div className={`custom-number-input w-32 bg-gray-100 rounded-lg`}>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          {...longPressEvent}
          className="disable-select  text-gray-600 hover:text-red-700 hover:bg-red-200 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          min="0"
          type="number"
          className={clsx(
            "outline-none bg-gray-100 focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none",
            count > 0 && "bg-yellow-300"
          )}
          name="custom-input-number"
          onChange={onChange}
          onKeyPress={(e) => {
            if (
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight" ||
              e.key === "ArrowUp" ||
              e.key === "ArrowDown" ||
              e.key === "Delete" ||
              e.key === "Backspace"
            ) {
              return;
            } else if (e.key.search(/\d/) === -1) {
              e.preventDefault();
            }
          }}
          onKeyDown={(e) => (e.key === "Enter" ? e.target.blur() : null)}
          value={count}
        ></input>
        <button
          onClick={increment}
          className=" text-gray-600 hover:text-green-700 hover:bg-green-200 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};

export default CountButton;
