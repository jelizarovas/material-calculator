import React from "react";

//   const buttons = [
//     { value: "local", placeholder: "Local (Hourly)", Icon: AccessTime },
//     { value: "flatRate", placeholder: "Flat Rate", Icon: CreditCard },
//     { value: "longDistance", placeholder: "Long Distance", Icon: LocalShipping },
//   ];

export const ButtonSelect = ({ onClick, name, value, buttons, defaultValue }) => {
  const handleChange = (value) => onClick({ target: { name, value } });

  return (
    <div className="flex justify-around flex-wrap mx-2 mb-4 select-none border-b-2 border-purple-500">
      {buttons.map((button, index) => (
        <Button key={index} onClick={handleChange} selected={value} {...button} />
      ))}
    </div>
  );
};

const Button = ({ value, placeholder, onClick, selected, Icon, isDisabled = false }) => {
  const isSelected = selected === value;
  return (
    <div
      className={`rounded-t-lg focus:outline-none truncate w-1/3 sm:w-2/7 flex flex-col md:flex-row items-center justify-center flex-wrap  text-xs sm:text-sm px-0 border border-transparent    cursor-pointer  ${
        isSelected ? " shadow-md text-white bg-purple-500  " : ""
      } `}
      onClick={() => !isDisabled && onClick(value)}
    >
      <Icon fontSize="small" color={isDisabled ? "disabled" : "inherit"} className="md:m-1" />
      <span className={isDisabled ? "text-gray-400" : ""}> {placeholder}</span>
    </div>
  );
};
