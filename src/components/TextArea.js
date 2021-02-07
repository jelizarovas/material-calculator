import React from "react";
import { Clear } from "@material-ui/icons/";

export const TextArea = ({ name, placeholder, Icon, value, onChange }) => {
  return (
    <div className="relative pt-10 bg-white text-gray-600 focus-within:text-red-400 w-100 m-2 rounded-md">
      <span className="w-full max-h-9 bg-white bg-opacity-80  absolute inset-y-0 left-0 flex items-start justify-between p-2">
        <span>
          <Icon />
          <label htmlFor={name} className="pl-4 text-gray-400">
            {placeholder}
          </label>
        </span>
        {value.length > 0 ? (
          <span className="inset-y-0 right-0 flex items-center px-0 cursor-pointer opacity-20 focus:opacity-100 hover:opacity-100">
            <Clear onClick={() => onChange({ target: { name, value: "" } })} />
          </span>
        ) : (
          <span></span>
        )}
      </span>
      <textarea
        id={name}
        name={name}
        rows="4"
        cols="50"
        value={value}
        onChange={onChange}
        minHeight={400}
        className=" w-full h-30 px-2 text-sm text-black bg-white rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
      />
    </div>
  );
};
