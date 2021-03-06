import { Clear, UnfoldMore } from "@material-ui/icons";
import React, { useState, useRef, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useLayer, Arrow } from "react-laag";
import { AnimatePresence } from "framer-motion";

let hrs = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
];
let mins = ["00", 15, 30, 45];

const scrollTo = (ref, parent, instant = false) => {
  if (ref?.current && parent?.current)
    parent.current.scrollTo({
      top: ref.current.offsetTop - ref.current.clientHeight,
      behavior: instant ? "auto" : "smooth",
    });
};

export const TimeInput = (props) => {
  console.log("Time Input Render");
  const { name, label = "", Icon } = props;

  const refs = hrs.reduce((acc, value) => {
    console.log("ref created");
    acc[value] = React.createRef();
    return acc;
  }, {});

  // console.log({ selectedHourRef });

  const handleClick = (id) => {
    if (refs[id]) scrollTo(refs[id], hoursContainerRef);
  };

  const [time, setTime] = useState({ hours: "", minutes: "" });
  const [isOpen, setOpen] = useState(false);
  const [wasHoursSelected, setHoursSelected] = useState(false);

  const minuteRef = useRef(null);
  const hoursContainerRef = useRef(null);
  // const executeScroll = () => scrollTo(selectedHourRef, hoursContainerRef);

  const KEYBAORD_EVENTS = ["Enter", "Tab", ",", ".", ":", " ", "-"];
  //TODO fix on mobile
  const handleKeyDownHours = (ev) => {
    if (KEYBAORD_EVENTS.includes(ev.key)) {
      ev.preventDefault();
      minuteRef && minuteRef.current.focus();
    }
  };

  const onChange = (v) => {
    setTime((t) => ({ ...t, ...v }));
    const key = Object.keys(v)[0];
    handleClick(v[key]);
    if (key === "hours") setHoursSelected(true);
    if (wasHoursSelected && key !== "hours") close();
  };

  const onInputHoursChange = (e) => {
    setTime((t) => ({ ...t, hours: e.target.value }));
  };
  const onInputMinutesChange = (e) => {
    setTime((t) => ({ ...t, minutes: e.target.value }));
  };

  const setCurrentTime = (e) => {
    e.preventDefault();
    const now = new Date();
    setTime({ hours: now.getHours(), minutes: now.getMinutes() });
    // close();
  };

  function toggleOpen() {
    isOpen ? close() : open();
  }

  function close() {
    setOpen(false);
    setHoursSelected(false);
  }

  function open() {
    setOpen(true);
    scrollTo(refs[time?.hours ? time.hours : 8], hoursContainerRef, true);
    // executeScroll();
  }

  function toggleHourType() {
    //toggle between am and pm for the account
  }

  function toggleMinuteIncrement() {
    //toggle between am and pm for the account
  }

  useEffect(() => {
    if (isOpen === true)
      scrollTo(refs[time?.hours ? time.hours : 8], hoursContainerRef);
  }, [isOpen, time, refs]);

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "bottom-end", // we prefer to place the menu "top-end"
    triggerOffset: 0, // keep some distance to the trigger
    containerOffset: 0, // give the menu some room to breath relative to the container
    arrowOffset: 0, // let the arrow have some room to breath also
  });

  return (
    <div className="flex  justify-between   text-sm text-gray-500 focus-within:text-purple-600">
      {/* {isOpen.toString()} */}
      {!!label && (
        <label
          htmlFor={name}
          className="text-xs mt-1 "
          onClick={() => (isOpen ? open() : close())}
        >
          {!!Icon && <Icon className=" mr-2" />}
          {label}
        </label>
      )}

      <Listbox value={time} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="relative flex  items-center  focus-within:border-purple-500  text-right text-sm text-bold w-max">
              <input
                name="hoursInput"
                type="number"
                className="p-1 w-8 text-right border-b bg-transparent"
                onFocus={(e) => e.target.select()}
                min="0"
                max="24"
                step="1"
                placeholder="hh"
                onKeyDown={handleKeyDownHours}
                onChange={onInputHoursChange}
                value={time.hours || ""}
              />
              <span className="px-1 ">:</span>
              <input
                name="minutesInput"
                type="number"
                ref={minuteRef}
                className="p-1 w-8 text-left border-b  bg-transparent"
                onFocus={(e) => e.target.select()}
                min="0"
                max="59"
                step="1"
                placeholder="mm"
                onChange={onInputMinutesChange}
                value={time.minutes || ""}
              />
              <div
                className="ml-2  focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 "
                {...triggerProps}
                onClick={toggleOpen}
              >
                <UnfoldMore
                  className="p-1 cursor-pointer hover:text-purple-700 hover:bg-gray-100 rounded-md"
                  aria-hidden="true"
                />
              </div>
              {renderLayer(
                <AnimatePresence>
                  {isOpen && (
                    <Listbox.Options
                      {...layerProps}
                      static={true}
                      className="w-40 py-1  h-64 overflow-hidden  flex text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20"
                    >
                      <div
                        name="other"
                        className="absolute bottom-10 right-2 text-xs"
                      >
                        <button
                          className="bg-blue-400 py-1 px-2 rounded-md text-white"
                          onClick={setCurrentTime}
                        >
                          Now
                        </button>
                      </div>

                      <div
                        name="other"
                        className="absolute bottom-2 right-2 text-xs"
                      >
                        <button
                          className="bg-red-400 py-1 px-2 rounded-md text-white"
                          onClick={close}
                        >
                          Close
                        </button>
                      </div>

                      <div
                        onClick={toggleHourType}
                        className="absolute left-2 text-xs text-gray-500 mx-auto text-center hover:font-bold cursor-pointer "
                      >
                        Hours{" "}
                        <UnfoldMore className="absolute p-1 -top-1 text-gray-300" />
                      </div>
                      <div
                        ref={hoursContainerRef}
                        name="hours"
                        className="w-full mt-4 overflow-y-scroll overflow-x-hidden "
                      >
                        {hrs.map((h, hid) => (
                          <Listbox.Option
                            key={hid}
                            className={({ active }) =>
                              `${
                                active
                                  ? "text-amber-900 bg-amber-100"
                                  : "text-gray-900"
                              }
                      cursor-default select-none pb-1 px-4`
                            }
                            value={{ hours: h }}
                          >
                            {({ active }) => {
                              const selected = time?.hours === h;
                              return (
                                <div
                                  className={`w-full cursor-pointer hover:bg-pink-50 pr-2  ${
                                    selected
                                      ? "font-medium bg-pink-300"
                                      : "font-normal "
                                  }`}
                                  ref={refs[h]}
                                >
                                  {h}
                                </div>
                              );
                            }}
                          </Listbox.Option>
                        ))}
                      </div>
                      <div name="minutes" className="w-full px-2">
                        <div className="text-xs text-gray-500 mx-auto text-center pb-2 hover:font-bold cursor-pointer">
                          Minutes{" "}
                          <UnfoldMore className="absolute p-1 -top-1 text-gray-300" />
                        </div>
                        {mins.map((m, mid) => (
                          <Listbox.Option
                            key={mid}
                            className={({ active }) =>
                              `${
                                active
                                  ? "text-amber-900 bg-amber-100"
                                  : "text-gray-900"
                              }
                          cursor-default select-none relative  `
                            }
                            value={{ minutes: m }}
                          >
                            {({ active }) => {
                              const selected = time?.minutes === m;
                              return (
                                <div
                                  className={`w-full cursor-pointer hover:bg-pink-50 pr-2  ${
                                    selected
                                      ? "font-medium bg-pink-300"
                                      : "font-normal"
                                  }`}
                                >
                                  {m}
                                </div>
                              );
                            }}
                          </Listbox.Option>
                        ))}
                      </div>
                      <Arrow {...arrowProps} />
                    </Listbox.Options>
                  )}
                </AnimatePresence>
              )}
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
