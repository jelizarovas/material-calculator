import React from "react";

//   const buttons = [
//     { value: "local", placeholder: "Local (Hourly)", Icon: AccessTime },
//     { value: "flatRate", placeholder: "Flat Rate", Icon: CreditCard },
//     { value: "longDistance", placeholder: "Long Distance", Icon: LocalShipping },
//   ];

export const ButtonSelect = ({
  onClick,
  name,
  defaultValue,
  buttons,
  value = defaultValue || buttons[0].value,
  vertical = false,
} = {}) => {
  if (!buttons) return null;
  const handleChange = (value) => onClick({ target: { name, value } });

  return (
    <div
      className={`flex text-gray-600  ${
        vertical ? "flex-col" : "justify-around"
      } w-full flex-wrap px-2 my-4 select-none `}
    >
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
      className={`rounded-md focus:outline-none truncate flex-grow  flex flex-col md:flex-row items-center  flex-wrap  text-xs sm:text-sm px-2    cursor-pointer  ${
        isSelected ? "text-gray-800  border-2 border-gray-600  font-semibold  " : ""
      } `}
      onClick={() => !isDisabled && !isSelected && onClick(value)}
    >
      <Icon fontSize="small" color={isDisabled ? "disabled" : "inherit"} className="md:m-1" />
      <span className={isDisabled ? "text-gray-400" : ""}> {placeholder}</span>
    </div>
  );
};
