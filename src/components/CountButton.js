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
    <div>
      <div>
        <button {...longPressEvent}>
          <span>−</span>
        </button>
        <input
          min="0"
          type="number"
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
        <button onClick={increment}>
          <span>+</span>
        </button>
      </div>
    </div>
  );
};

export default CountButton;
