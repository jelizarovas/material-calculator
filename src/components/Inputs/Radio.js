import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Check, Warning } from "@material-ui/icons";

function isObjempty(obj) {
  for (var i in obj) return false;
  return true;
}

export function Radio(props) {
  const {
    showPrice = false,
    options = [],
    groupName = "",
    row = false,
    dense = false,
    //TODO SYNC SELECTED WITH DB
    // value = {},
    // setValue = () => {},
  } = props;
  const [selected, setSelected] = useState(options[0].value);

  if (isObjempty(options))
    return (
      <div className="bg-yellow-500 p-4 rounded-md text-yellow-800 text-center bg-opacity-70">
        <Warning className="p-1" /> No options provided
      </div>
    );

  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      className="w-full  mx-auto pt-2 text-xs text-gray-900 select-none"
    >
      {groupName && (
        <RadioGroup.Label className="text-black mx-auto w-full flex justify-center my-1">{groupName}</RadioGroup.Label>
      )}
      <div className={` flex ${row ? "flex-row justify-around space-x-2" : "flex-col space-y-2 max-w-md mx-auto"}`}>
        {options.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option.value}
            disabled={option.disabled}
            className={({ active, checked, disabled }) =>
              `w-full  border-b-2 rounded-lg   cursor-pointer focus:outline-none flex items-center justify-between hover:bg-purple-100 bg-opacity-75 overflow-hidden
                    ${active && "ring-2 ring-offset-2 ring-offset-purple-300 ring-white ring-opacity-60 "}
                    ${checked && "bg-purple-900 border-purple-700   text-white shadow-md hover:bg-purple-800"}
                    ${disabled && "text-gray-400 "}
                    ${dense ? "px-1 py-1 " : "px-4 py-3 "}`
            }
          >
            {({ active, checked, disabled }) => (
              <>
                {option.Icon && <option.Icon className={`${dense ? "mr-1 p-1" : "mr-2"}`} />}
                <RadioGroup.Label as="p" className="font-medium truncate flex-grow">
                  {option.name}
                </RadioGroup.Label>
                <div className="flex items-center flex-shrink-0 ml-1">
                  {showPrice ? (
                    <>
                      <RadioGroup.Description
                        as="span"
                        className={`whitespace-nowrap ${!!checked ? "text-purple-100" : "text-gray-500"}`}
                      >
                        {option && option.price && isNaN(option.price) ? option.price : `$ ${option?.price}`}
                      </RadioGroup.Description>
                      <div className="flex-shrink-0 flex items-center text-white w-4 h-4 mx-2">
                        {checked && <Check className="p-1" />}
                      </div>
                    </>
                  ) : (
                    checked && <Check className="p-1" />
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
