import React, { useRef } from "react";

// import { Clear, Restore } from "@material-ui/icons/";
// import useLongPress from "../../utils/useLongPress";

export const Input = (props) => {
  const {
    name,
    placeholder,
    Icon = undefined,
    type = "text",
    inputMode,
    step,
    value,
    onChange,
    readOnly = false,
    // clear = true,
    units = "",
    align = "left",
    label = "",
    min = 0,
  } = props;

  // const [deletedValue, setDeletedValue] = useState("");
  // const [showLabel, setShowLabel] = useState(false);

  const inputRef = useRef();

  // const onClick = () => {
  //   setDeletedValue("");
  //   onChange({ target: { name, value: deletedValue } });
  // };

  // const onLongPress = () => setDeletedValue("");

  // const defaultOptions = {
  //   shouldPreventDefault: true,
  //   delay: 1000,
  // };

  // const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <div className="flex flex-col justify-start  w-full text-sm text-gray-500 focus-within:text-purple-600 max-w-md mx-auto">
      {!!label && (
        <label htmlFor={name} className="text-xs my-1 text-justify pl-2">
          {label}
        </label>
      )}
      <div className="w-full flex justify-between items-center  bg-white rounded-md  border-b-2 focus-within:border-purple-500 ">
        {!!Icon && <Icon className="mx-2 " />}
        <input
          ref={inputRef}
          type={type}
          name={name}
          className={` w-full px-4 py-3 flex-grow focus:text-gray-900 text-${align} bg-transparent`}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={onChange}
          onFocus={(e) => e.target.select()}
          step={step}
          readOnly={readOnly}
          inputMode={inputMode}
          min={min}
        />
        <span className="  flex items-center pr-2  cursor-pointer opacity-20 focus:opacity-100 hover:opacity-100">
          {units}
        </span>
      </div>

      {/* {clear && (value?.length > 0 || (type === "number" && value > 0)) ? (
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
        ) : null} */}
    </div>
  );
};
