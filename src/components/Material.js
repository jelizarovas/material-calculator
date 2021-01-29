import React, { useState } from "react";
import CountButton from "./CountButton";
import { useInventory } from "./Providers/InventoryProvider";

export const Material = ({ m }) => {
  const { id, name, volume, count, img, w, d, h, description, subtext } = m;
  const { dispatch } = useInventory();

  const [tooltip, setTooltip] = useState(false);

  const onClick = () => {
    setTooltip((t) => !t);
  };

  const changeCount = (newCount) => {
    dispatch({ type: "changeCount", payload: { id, newCount } });
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap ">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 " src={img} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium text-gray-900">
              {name}{" "}
              <div className={tooltip ? "mx-2 z-50 absolute " : "hidden"}>
                <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full   ">
                  {w && d && h ? `W: ${w}", D: ${d}", H: ${h}" ` : description}
                </div>{" "}
              </div>
              <svg
                className="fill-current w-4 h-4 inline text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={onClick}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-sm leading-5 text-gray-500">
              <span>{volume ? `${volume} c.u. ft.` : subtext} </span>
            </div>
          </div>
        </div>
      </td>

      <td className="px-0 py-0 whitespace-no-wrap text-sm leading-5 text-gray-500">
        <CountButton count={count} changeCount={changeCount} />
      </td>
    </tr>
  );
};
