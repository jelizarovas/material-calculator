import React, { useState, useRef } from "react";

const initialState = {
  chips: [],
  KEY: {
    backspace: 8,
    tab: 9,
    enter: 13,
  },
  // only allow letters, numbers and spaces inbetween words
  INVALID_CHARS: /[^a-zA-Z0-9 ]/g,
};

export const ChipsInput = ({
  chips,
  placeholder = "Add a mover...",
  maxLength = 20,
  max,
}) => {
  const [state, setState] = useState(chips);
  const [value, setValue] = useState("");

  const addChip = () => {};
  const removeChip = () => {};
  const updateChip = () => {};
  const focusInput = () => {};

  const handleKeyDown = () => {};
  const handleChange = () => {};
  const handlePaste = () => {};

  const Chips = () => {
    return chips.map((chip, index) => {
      return (
        <span className="border-b-2 leading-none text-base" key={index}>
          <span className="bg-grey-800">{chip}</span>
          <button className="" onClick={() => removeChip(chip)}>
            x
          </button>
        </span>
      );
    });
  };

  let inputPlaceholder = !max || chips.length < max ? placeholder : "";
  let error = "";

  return (
    <div className="chips" onClick={focusInput}>
      <Chips />
      <input
        className={"input " + (error ? "has-error" : "")}
        value={value}
        placeholder={inputPlaceholder}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        onPaste={handlePaste}
      />
    </div>
  );
};
