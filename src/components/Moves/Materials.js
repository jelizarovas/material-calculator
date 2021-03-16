import React from "react";
// import { useMove } from "./Providers/MoveProvider";
import { Material } from "./Material";
import ClearInventory from "./ClearInventory";
import { defaultMaterials } from "../../utils/defaultMaterials";

export const Materials = ({ state, dispatch }) => {
  const { totalMaterials } = state;

  return (
    <div className="flex justify-center align-center mt-2  ">
      <table className="w-full xl:w-2/3 ">
        <thead className="">
          <tr className="bg-purple-700 text-white rounded-t-lg">
            <th className="w-1/2">Material</th>
            <th className="w-1/4">Count {totalMaterials > 0 ? <ClearInventory dispatch={dispatch} /> : null} </th>
            <th className="w-1/4">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {defaultMaterials.map((m) => (
            <Material m={m} key={m.name + m.volume} state={state} dispatch={dispatch} />
          ))}
        </tbody>
        <tfoot className="  text-sm rounded-t-lg">
          <tr>
            <td className="p-2">
              <span className="cursor-pointer">+</span>
            </td>
            <td className="text-right ">Total: </td>
            <td className="text-right p-2" style={{ minWidth: 120 }}>
              {" $" + totalMaterials}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
