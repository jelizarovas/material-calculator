import React from "react";
import useLongPress from "../../utils/useLongPress";
import clsx from "clsx";
import { vibrate } from "../../utils/vibrate";

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
        className=" text-2xl font-thin  text-gray-600 hover:text-red-700 hover:bg-red-200 w-20 rounded-l cursor-pointer"
      >
        −
      </button>
      <input
        min="0"
        type="number"
        name="custom-input-number"
        className={clsx(
          " bg-gray-100 bg-opacity-50  text-center w-12  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700",
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
        onFocus={(e) => e.target.select()}
        onKeyDown={(e) => (e.key === "Enter" ? e.target.blur() : null)}
        value={count.toString()}
      ></input>
      <button
        onClick={increment}
        className=" text-2xl font-thin  text-gray-600 hover:text-green-700 hover:bg-green-200 w-20 rounded-r cursor-pointer"
      >
        +
      </button>
    </div>
  );
};

export default CountButton;
