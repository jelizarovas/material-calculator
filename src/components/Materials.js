import React from "react";
import { useClient } from "./Providers/ClientProvider";
import { Material } from "./Material";
import ClearInventory from "./ClearInventory";
import { defaultMaterials } from "../utils/defaultMaterials";

export const Materials = () => {
  const client = useClient();
  const { totalMaterials } = client;

  return (
    <div className="flex justify-center align-center  ">
      <table className="w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
        <thead className="">
          <tr className="bg-purple-700 text-white rounded-t-lg">
            <th className="w-1/2">Material</th>
            <th className="w-1/4">Count {totalMaterials > 0 ? <ClearInventory /> : null} </th>
            <th className="w-1/4">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {defaultMaterials.map((m) => (
            <Material m={m} key={m.name + m.volume} />
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
