import React from "react";
import { NavigateNext, NavigateBefore, NoteAdd } from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";

export const Steps = () => {
  let { pathname } = useLocation();
  let history = useHistory();

  const steps = ["client", "rates", "inventory", "estimate", "materials", "overview"];
  const currentIndex = steps.indexOf(pathname.substring(1));

  const nextStep = () => {
    if (steps.length - 1 > currentIndex) history.push("/" + steps[currentIndex + 1]);
  };

  const previousStep = () => {
    if (0 < currentIndex) history.push("/" + steps[currentIndex - 1]);
  };

  return (
    <div className="flex justify-center w-full mt-10">
      {/* <span className="mx-auto bg-gray-700 rounded-lg p-2 px-4 cursor-pointer text-white">Steps</span> */}
      <button
        className="text-yellow-400  cursor-pointer text-md leading-none px-3 py-1 border border-solid border-yellow-400 rounded block outline-none focus:outline-none mx-5"
        type="button"
        onClick={previousStep}
      >
        <NoteAdd fontSize="small" /> Note
      </button>
      {currentIndex !== 0 && (
        <button
          className="text-gray-500   cursor-pointer text-md leading-none px-4 py-2 border border-solid border-gray-500 rounded block outline-none focus:outline-none mx-5"
          type="button"
          onClick={previousStep}
        >
          <NavigateBefore fontSize="small" /> Before
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
