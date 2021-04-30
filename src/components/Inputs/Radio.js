import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Check, Warning } from "@material-ui/icons";

// const defaultOptions = [
//   { value: "local", name: "Local (Hourly)", Icon: AccessTime, price: "$24.00" },
//   { value: "flatRate", name: "Flat Rate", Icon: CreditCard, price: "$1,354.99" },
//   { value: "longDistance", name: "Long Distance", Icon: LocalShipping, price: "$10,000.03", disabled: true },
// ];

function isObjempty(obj) {
  for (var i in obj) return false;
  return true;
}

export function Radio(props) {
  const { showPrice = false, options = {}, groupName = "", row = false } = props;
  const [selected, setSelected] = useState(options[0].value);

  if (isObjempty(options))
    return (
      <div className="bg-yellow-500 p-4 rounded-md text-yellow-800 text-center bg-opacity-70">
        <Warning className="p-1" /> No options provided
      </div>
    );

  return (
    <div className="w-full py-0">
      <div className="w-full max-w-md mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="text-xs text-black mx-auto w-full flex justify-center my-1">
            {groupName}
          </RadioGroup.Label>
          <div className={`space-y-2 text-sm flex ${row ? "flex-row justify-around" : "flex-col"}`}>
            {options.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option.value}
                disabled={option.disabled}
                className={({ active, checked, disabled }) =>
                  `${active ? "ring-2 ring-offset-2 ring-offset-purple-300 ring-white ring-opacity-60" : ""}
                  ${
                    checked
                      ? "bg-purple-900 border-purple-700 bg-opacity-75 "
                      : disabled
                      ? "bg-transparent"
                      : "bg-white"
                  }
                  border-b-2 relative rounded-lg  px-4 py-3 cursor-pointer flex focus:outline-none ${
                    checked ? "text-white shadow-md" : disabled ? "text-gray-400 shadow-md" : "text-gray-900"
                  }`
                }
              >
                {({ active, checked, disabled }) => (
                  <>
                    <div className={`flex items-center justify-between w-full `}>
                      <div className="flex items-center  truncate mr-5 ">
                        {option.Icon && <option.Icon className="mr-2 " />}
                        <RadioGroup.Label as="p" className="font-medium ">
                          {option.name}
                        </RadioGroup.Label>
                      </div>
                      <div className="flex items-center">
                        {showPrice && (
                          <RadioGroup.Description
                            as="span"
                            className={`whitespace-nowrap ${checked ? "text-purple-100" : "text-gray-500"}`}
                          >
                            {option.price && isNaN(option.price) ? option.price : "$ " + option.price.toString()}
                          </RadioGroup.Description>
                        )}
                        <div className="flex-shrink-0 text-white w-6 h-6 ml-4">{checked && <Check className="" />}</div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
