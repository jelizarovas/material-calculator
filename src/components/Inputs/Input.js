import React, { useRef, useState } from "react";

import { Clear, Restore } from "@material-ui/icons/";
import useLongPress from "../../utils/useLongPress";

export const Input = (props) => {
  const {
    name,
    placeholder,
    Icon,
    type = "text",
    inputMode,
    step,
    value,
    onChange,
    readOnly = false,
    clear = true,
    units = "",
    align = "left",
  } = props;

  const [deletedValue, setDeletedValue] = useState("");
  const [showLabel, setShowLabel] = useState(false);

  const inputRef = useRef();

  const onClick = () => {
    setDeletedValue("");
    onChange({ target: { name, value: deletedValue } });
  };

  const onLongPress = () => setDeletedValue("");

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 1000,
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <div className="relative text-gray-600 focus-within:text-red-400 w-100 m-2 ">
      {(value.length > 0 || (type === "number" && value > 0)) && showLabel && (
        <span
          className="absolute right-10 top-1 z-20  text-white bg-gray-300 text-sm rounded-lg p-1 px-3"
          onClick={() => setShowLabel(false)}
        >
          {placeholder}
        </span>
      )}
      <span
        className="absolute inset-y-0 left-0 flex items-center pl-2 cursor-pointer"
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
      >
        <Icon />
      </span>
      <input
        ref={inputRef}
        type={type}
        name={name}
        className={` w-full  py-2 pr-10 text-sm text-black bg-white rounded-md border-b-2 pl-12 focus:outline-none focus:bg-white focus:text-gray-900 text-${align}`}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
        step={step}
        readOnly={readOnly}
        inputMode={inputMode}
      />
      <span className="absolute text-xs inset-y-0 right-10 flex items-center px-2 cursor-pointer opacity-20 focus:opacity-100 hover:opacity-100">
        {units}
      </span>

      {clear && (value.length > 0 || (type === "number" && value > 0)) ? (
        <span
          className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer opacity-20 focus:opacity-100 hover:opacity-100"
          onClick={() => {
            setDeletedValue(value);
            onChange({ target: { name, value: "" } });
            inputRef.current.focus();
          }}
        >
          <Clear />
        </span>
      ) : deletedValue ? (
        <span
          className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer opacity-20 focus:opacity-100 hover:opacity-100"
          {...longPressEvent}
        >
          <Restore />
        </span>
      ) : null}
    </div>
  );
};
