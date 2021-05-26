import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, UnfoldMore } from "@material-ui/icons";

export default function Select({ name, label = "Travel Fee", options = [], value, dispatch }) {
  const onChange = (v) => {
    if (v === value) return;
    if (value?.onDeselect) value.onDeselect();
    if (v?.onSelect) v.onSelect();
    dispatch({ field: name, value: v });
  };

  return (
    <div className="flex flex-col justify-start  w-full text-sm text-gray-500 focus-within:text-purple-600 max-w-md mx-auto ">
      {!!label && (
        <label htmlFor={name} className="text-xs my-1 text-justify pl-2">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="relative mt-1 ">
              <Listbox.Button className="border-b-2 focus-within:border-purple-500 px-4 py-3 relative w-full pr-10 text-left bg-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">{value?.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <UnfoldMore className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                  {options.map((option, optionIdx) => (
                    <Listbox.Option
                      key={optionIdx}
                      className={({ active }) =>
                        `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`${selected ? "font-medium" : "font-normal"} block truncate`}>
                            {option.label}
                          </span>
                          {selected ? (
                            <span
                              className={`${active ? "text-amber-600" : "text-amber-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <Check className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : (
                            option?.Icon && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <option.Icon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            )
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
