import React from "react";

//   const buttons = [
//     { value: "local", placeholder: "Local (Hourly)", Icon: AccessTime },
//     { value: "flatRate", placeholder: "Flat Rate", Icon: CreditCard },
//     { value: "longDistance", placeholder: "Long Distance", Icon: LocalShipping },
//   ];

export const ButtonSelect = ({ onClick, name, value, buttons }) => {
  const handleChange = (value) => onClick({ target: { name, value } });

  return (
    <div className="flex justify-around flex-wrap m-1 mb-4 select-none">
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
      className={`focus:outline-none truncate w-1/3 sm:w-2/7 flex flex-col md:flex-row items-center justify-center flex-wrap  text-xs sm:text-sm px-0 border-2 border-transparent   rounded-lg cursor-pointer ${
        isSelected ? "border-purple-500 text-purple-900  " : ""
      } `}
      onClick={() => !isDisabled && onClick(value)}
    >
      <Icon fontSize="small" color={isDisabled ? "disabled" : "inherit"} className="md:m-1" />
      <span className={isDisabled ? "text-gray-400" : ""}> {placeholder}</span>
    </div>
  );
};
