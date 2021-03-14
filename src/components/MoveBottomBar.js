import React from "react";
import {
  NavigateNext,
  NavigateBefore,
  NoteAdd,
  Menu,
} from "@material-ui/icons";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";

export const MoveBottomBar = () => {
  let { pathname } = useLocation();
  let { url } = useRouteMatch();

  const newp = pathname.split("/");

  let history = useHistory();

  const steps = [
    "client",
    "rates",
    "inventory",
    "estimate",
    "materials",
    "overview",
  ];
  const currentIndex = steps.indexOf(newp[newp.length - 1]);

  const nextStep = () => {
    if (steps.length - 1 > currentIndex)
      history.push(`${url}/${steps[currentIndex + 1]}`);
  };

  const previousStep = () => {
    if (0 < currentIndex) history.push(`${url}/${steps[currentIndex - 1]}`);
  };

  const note = () => {
    return;
  };

  const menuToggle = () => {
    return;
  };

  return (
    <div className="flex justify-center w-full mt-10">
      <button
        className="text-gray-900  cursor-pointer text-md leading-none px-3 py-1 border border-solid border-gray-700 rounded block outline-none focus:outline-none mx-5"
        type="button"
        onClick={menuToggle}
      >
        <Menu fontSize="small" /> Menu
      </button>

      {/* <span className="mx-auto bg-gray-700 rounded-lg p-2 px-4 cursor-pointer text-white">Steps</span> */}
      <button
        className="text-yellow-400  cursor-pointer text-md leading-none px-3 py-1 border border-solid border-yellow-400 rounded block outline-none focus:outline-none mx-5"
        type="button"
        onClick={note}
      >
        <NoteAdd fontSize="small" /> Note
      </button>
      {currentIndex !== 0 && (
        <button
          className="text-gray-500   cursor-pointer text-md leading-none px-4 py-2 border border-solid border-gray-500 rounded block outline-none focus:outline-none mx-5"
          type="button"
          onClick={previousStep}
        >
          <NavigateBefore fontSize="small" /> Previous
        </button>
      )}
      {currentIndex !== steps.length - 1 && (
        <button
          className="text-white bg-purple-400  cursor-pointer text-md leading-none px-4 py-2 border border-solid border-transparent rounded block outline-none focus:outline-none  mx-5"
          type="button"
          onClick={nextStep}
        >
          Next <NavigateNext fontSize="small" />
        </button>
      )}
    </div>
  );
};
