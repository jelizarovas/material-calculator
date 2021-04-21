import React from "react";
import { Link } from "react-router-dom";

const url = `${process.env.PUBLIC_URL}/img/tools-materials.gif`;

export const Tools = () => {
  return (
    <div className="flex flex-wrap -mx-2 overflow-hidden sm:-mx-2 md:-mx-1 lg:-mx-2 xl:-mx-1">
      <div className="my-2 px-2 w-1/4 overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-1 md:px-1 md:w-1/3 lg:my-2 lg:px-2 lg:w-1/5 xl:my-1 xl:px-1 xl:w-1/6">
        <div className="m-5 p-2 border-2 rounded-md">
          <img alt="demo" src={url} />
          <Link to="/t/materials">Materials Calculator</Link>
        </div>
      </div>

      <div className="my-2 px-2 w-1/4 overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-1 md:px-1 md:w-1/3 lg:my-2 lg:px-2 lg:w-1/5 xl:my-1 xl:px-1 xl:w-1/6">
        <Link to="/t/coordinates">Coordinates View</Link>
      </div>

      <div className="my-2 px-2 w-1/4 overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-1 md:px-1 md:w-1/3 lg:my-2 lg:px-2 lg:w-1/5 xl:my-1 xl:px-1 xl:w-1/6"></div>
      <Link to="/t/sms">Text Customer</Link>
      <div className="my-2 px-2 w-1/4 overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-1 md:px-1 md:w-1/3 lg:my-2 lg:px-2 lg:w-1/5 xl:my-1 xl:px-1 xl:w-1/6"></div>

      <div className="my-2 px-2 w-1/4 overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-1 md:px-1 md:w-1/3 lg:my-2 lg:px-2 lg:w-1/5 xl:my-1 xl:px-1 xl:w-1/6"></div>
      <Link to="/t/coordinates">ABHS</Link>
    </div>
    // <div className="container mx-auto grid grid-cols-3 grid-flow-col gap-2">
    //   <div className="m-5 p-2 border-2 rounded-md">
    //     <img alt="demo" src={url} />
    //     <Link to="/t/materials">Materials Calculator</Link>
    //   </div>
    //   <div className="m-5 p-2 border-2 rounded-md relative flex justify-center flex-col">
    //     <div className="bg-gray-500" style={{ minWidth: "265px", minHeight: "265px" }}></div>
    //     <Link to="/t/coordinates">Coordinates View</Link>
    //   </div>
    //   <div className="m-5 p-2 border-2 rounded-md relative flex justify-center flex-col">

    //   </div>
    //   <div className="m-5 p-2 border-2 rounded-md relative flex justify-center flex-col">

    //   </div>
    // </div>
  );
};
