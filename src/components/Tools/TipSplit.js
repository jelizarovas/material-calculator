import React, { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ArrowRight } from "@material-ui/icons";

//## Add worker
//## Accordeon

export const TipSplit = () => {
  // const [crew, setCrew] = useState([]);
  // const [mover, setMover] = useState({});
  // const [jobDays, setJobDays] = useState();
  const [tip, setTip] = useState(0);

  const changeTip = (e) => setTip(e.target.value);
  return (
    <div className="bg-white p-2 flex flex-col justify-start items-baseline">
      <h2>Split the tip</h2>
      <label htmlFor="tip">TIP, $</label>
      <input
        name="tip"
        type="text"
        placeholder="enter total tip amount"
        className="p-2 border rounded-sm"
        onChange={changeTip}
      />
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              Crew #1
              <ArrowRight className={`${open ? "transform rotate-90" : ""}`} />
            </Disclosure.Button>

            {/*
            Use the Transition + open render prop argument to add transitions.
          */}
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {/*
              Don't forget to add `static` to your Disclosure.Panel!
            */}
              <Disclosure.Panel static>
                <li>Arnas {tip} </li>
                <li>Kevan</li>
                <li>Connor</li>
                <li>Marc</li>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <button>Add Crew</button>
      <button>Add Day</button>
    </div>
  );
};
