import React from "react";
import { Link } from "react-router-dom";

export const Tools = () => {
  return (
    <div className=" flex">
      <div className="m-5 p-2 border-2 rounded-md">
        <Link to="/t/materials">Materials Calculator</Link>
      </div>
      <div className="m-5 p-2 border-2 rounded-md">
        <Link to="/t/coordinates">Coordinates View</Link>
      </div>
    </div>
  );
};
