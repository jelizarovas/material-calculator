import React from "react";
import useLongPress from "../utils/useLongPress";
import clsx from "clsx";
import { vibrate } from "../utils/vibrate";

const CountButton = ({ count, changeCount }) => {
  const increment = () => {
    changeCount(count + 1);
    vibrate([50]);
  };
  const decrement = () => {
    if (count > 0) {
      changeCount(count - 1);
      vibrate([50, 50, 50]);
    }
  };
  const onChange = (e) => {
    var val = parseInt(e.target.value) || 0;
    return changeCount(val);
  };

  const onLongPress = () => {
    changeCount(0);
    vibrate([100, 50, 100]);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 1000,
  };

  const longPressEvent = useLongPress(onLongPress, decrement, defaultOptions);

  return (
    <div className="flex flex-row w-28 h-8 mx-auto  rounded-md relative bg-gray-100 bg-opacity-50 my-1 ">
      <button
        {...longPressEvent}
        className="disable-select leading-4 p-2 text-gray-600 hover:text-red-700 hover:bg-red-200   w-10 rounded-l cursor-pointer outline-none"
      >
        <span className="m-auto text-2xl leading-4  font-thin  ">−</span>
      </button>
      <input
        min="0"
        type="number"
        name="custom-input-number"
        className={clsx(
          "outline-none bg-gray-100 bg-opacity-50 focus:outline-none text-center w-12  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700",
          count > 0 && "bg-yellow-300"
        )}
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
        // onBlur={(e) => changeCount(parseInt(e.target.value, 10))}
        onKeyDown={(e) => (e.key === "Enter" ? e.target.blur() : null)}
        value={count.toString()}
      ></input>
      <button
        onClick={increment}
        className="leading-4 p-2 text-gray-600 hover:text-green-700 hover:bg-green-200 h-full w-20 rounded-r cursor-pointer"
      >
        <span className="m-auto text-2xl  leading-4 font-thin">+</span>
      </button>
    </div>
  );
};

export default CountButton;
