import React, { useState } from "react";
import { Clear } from "@material-ui/icons";

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

export const ChipsInput = ({ chips, placeholder = "Add a mover...", maxLength = 20, max }) => {
  const [state, setState] = useState(chips);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const asyncSetState = (newState) => {
    setState([...new Set(newState)]);
  };

  const removeChip = (chip) => asyncSetState([...state.remove(chip)]);
  const focusInput = () => {};

  const ADD_KEYBAORD_EVENTS = ["Enter", "Tab", ","];

  const handleKeyDown = (ev) => {
    if (ev.key === "Backspace" && value === "" && state.length > 0) {
      const tempState = state;
      tempState.pop();
      asyncSetState([...tempState]);
    } else if (ADD_KEYBAORD_EVENTS.includes(ev.key)) {
      ev.preventDefault();
      // console.log(ev.target.defaultValue);
      const trimmedValue = value.trim();
      if (trimmedValue) {
        asyncSetState([...state, value]);
        setValue("");
      }
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData("Text");
    asyncSetState([...state, value + pastedValue]);
    setValue("");
    // console.log(e.clipboardData.getData('Text'));
    // console.log(e.clipboardData.getData('text/plain'));
    // console.log(e.clipboardData.getData('text/html'));
    // console.log(e.clipboardData.getData('text/rtf'));

    // console.log(e.clipboardData.getData('Url'));
    // console.log(e.clipboardData.getData('text/uri-list'));
    // console.log(e.clipboardData.getData('text/x-moz-url'));
  };

  const Chips = ({ chips }) => {
    return chips.map((chip, index) => {
      return (
        <span className="border-b-2 rounded-md bg-gray-200 leading-none text-base p-2 mx-2" key={index}>
          <span className="bg-grey-800">{chip}</span>
          <button className="ml-2 " onClick={() => removeChip(chip)}>
            <Clear fontSize="small" />
          </button>
        </span>
      );
    });
  };

  let inputPlaceholder = !max || chips.length < max ? placeholder : "";

  return (
    <div className="bg-white p-2 m-2 rounded-md focus-within:bg-white" onClick={focusInput}>
      <Chips chips={state} />
      <input
        className={"p-2 bg-transparent focus:outline-none " + (error ? "has-error" : "")}
        value={value}
        placeholder={inputPlaceholder}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        onPaste={handlePaste}
      />
    </div>
  );
};
