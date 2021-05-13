import React from "react";
import { Link } from "react-router-dom";

const tools = [
  { title: "Materials Calculator", img: `${process.env.PUBLIC_URL}/img/tools-materials.gif`, url: "/t/materials" },
  { title: "Coordinates View", url: "/t/coordinates" },
  { title: "Text Customer", url: "/t/sms" },
  { title: "ABHS", url: "/t/abhs" },
  { title: "Tip Split", url: "/t/tips" },
];

export const Tools = () => {
  return (
    <div className="grid grid-cols-4 gap-4 container mx-auto mt-10">
      {tools.map((tool) => {
        return (
          <div className="w-full border-2 rounded-md relative min-h-[200px] hover:bg-red-700 hover:font-bold bg-red-500">
            <Link to={tool.url}>
              {!!tool.img ? (
                <img alt="demo" src={tool.img} className="w-full " />
              ) : (
                <div className="w-full h-full  "></div>
              )}
              <span className="absolute bottom-0 bg-white w-full px-4 py-2 text-center ">{tool.title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
