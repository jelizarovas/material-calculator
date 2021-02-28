import React, { useRef } from "react";

import { Clear } from "@material-ui/icons/";

export const Input = (props) => {
  const {
    name,
    placeholder,
    Icon,
    type = "text",
    inputmode,
    step,
    value,
    onChange,
    readOnly = false,
    clear = true,
  } = props;

  // const [isFocused, setIsFocused] = useState(false);

  // const onBlur = () => setIsFocused(false);
  // const onFocus = () => setIsFocused(true);

  const inputRef = useRef();

  return (
    <div className="relative text-gray-600 focus-within:text-red-400 w-100 m-2">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <Icon />
      </span>
      <input
        ref={inputRef}
        type={type}
        name={name}
        className=" w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-12 focus:outline-none focus:bg-white focus:text-gray-900"
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
        step={step}
        readOnly={readOnly}
        inputmode={inputmode}
        // onFocus={onFocus}
        // onBlur={onBlur}
      />
      {clear && (value.length > 0 || (type === "number" && value > 0)) ? (
        <span
          className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer opacity-20 focus:opacity-100 hover:opacity-100"
          onClick={() => {
            onChange({ target: { name, value: "" } });
            inputRef.current.focus();
          }}
        >
          <Clear />
        </span>
      ) : null}
    </div>
  );
};
