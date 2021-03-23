import React, { useState } from "react";
import { Clear } from "@material-ui/icons";
import { useMoveDispatch } from "../Providers/MoveProvider";

export const ChipsInput = ({ name, chips, placeholder = "Add a mover...", maxLength = 20, max }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const dispatch = useMoveDispatch();

  const asyncSetState = (newState) => {
    const validatedState = [...new Set(newState)];
    dispatch({ field: name, value: validatedState });

    if (newState.length !== validatedState.length) setError("Duplicate Entry");
  };

  React.useEffect(() => {
    if (error !== "") {
      window.setTimeout(() => {
        setError("");
      }, 3000);
    }

    return () => window.clearTimeout();
  }, [error, setError]);

  const removeChip = (chip) => asyncSetState(chips.filter((i) => i !== chip));

  const ADD_KEYBAORD_EVENTS = ["Enter", "Tab", ","];

  const onKeyPress = (e) => {};

  const handleKeyDown = (ev) => {
    if (ev.key === "Backspace" && value === "" && chips.length > 0) {
      const tempState = chips;
      tempState.pop();
      asyncSetState([...tempState]);
    } else if (ADD_KEYBAORD_EVENTS.includes(ev.key)) {
      ev.preventDefault();
      const trimmedValue = value.trim();
      if (trimmedValue) {
        asyncSetState([...chips, value]);
        setValue("");
      }
    } else if (ev.key === "Backspace" && chips.length === 0) {
      setError("There is nothing to delete");
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData("Text");
    asyncSetState([...chips, value + pastedValue]);
    setValue("");
  };

  const Chips = ({ chips }) => {
    return chips.map((chip, index) => {
      return (
        <div
          className=" inline-block rounded-md bg-gray-200 leading-none text-base p-2 m-1 hover:bg-purple-200 cursor-pointer"
          key={index}
        >
          <span className="bg-grey-800">{chip}</span>
          <span className="ml-2 " onClick={() => removeChip(chip)}>
            <Clear fontSize="small" />
          </span>
        </div>
      );
    });
  };

  let inputPlaceholder = !max || chips.length < max ? placeholder : "";

  return (
    <div className={"relative bg-white p-0 m-2 rounded-md focus-within:bg-white pb-0"}>
      <Chips chips={chips} />
      <input
        onKeyPress={onKeyPress}
        className={"p-2 bg-transparent focus:outline-none "}
        value={value}
        placeholder={inputPlaceholder}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        onPaste={handlePaste}
      />
      {error && (
        <span
          className="w-full text-red-500 text-xs cursor-pointer absolute left-4 bottom-0"
          onClick={() => setError("")}
        >
          {error}
        </span>
      )}
    </div>
  );
};
