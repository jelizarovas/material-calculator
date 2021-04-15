import React from "react";
import { Link } from "react-router-dom";

const url = `${process.env.PUBLIC_URL}/img/tools-materials.gif`;

export const Tools = () => {
  return (
    <div className=" flex">
      <div className="m-5 p-2 border-2 rounded-md">
        <img alt="demo" src={url} />
        <Link to="/t/materials">Materials Calculator</Link>
      </div>
      <div className="m-5 p-2 border-2 rounded-md relative flex justify-center flex-col">
        <div className="bg-gray-500" style={{ minWidth: "265px", minHeight: "265px" }}></div>
        <Link to="/t/coordinates">Coordinates View</Link>
      </div>
      <div className="m-5 p-2 border-2 rounded-md relative flex justify-center flex-col">
        <div className="bg-gray-500" style={{ minWidth: "265px", minHeight: "265px" }}></div>
        <Link to="/t/coordinates">ABHS</Link>
      </div>
      <div className="m-5 p-2 border-2 rounded-md relative flex justify-center flex-col">
        <div className="bg-gray-500" style={{ minWidth: "265px", minHeight: "265px" }}></div>
        <Link to="/t/sms">Text Customer</Link>
      </div>
    </div>
  );
};
