import React from "react";

export const Button = (props) => {
  const { Icon, text, onClick = {}, color, className, disabled, ...rest } = props;

  return (
    <button
      onClick={onClick}
      className={`rounded-md py-2 px-4 text-white ${className} ${!!color && `bg-${color}`}`}
      {...rest}
    >
      {Icon && (
        <span>
          <Icon />
        </span>
      )}
      {!!text && <span>{text}</span>}
    </button>
  );
};
