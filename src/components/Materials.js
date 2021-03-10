import React from "react";
import { useClient } from "./Providers/ClientProvider";
import { Material } from "./Material";
import ClearInventory from "./ClearInventory";
import { defaultMaterials } from "../utils/defaultMaterials";

export const Materials = () => {
  const client = useClient();
  const { totalMaterials } = client;

  // {shift && 'shift '}
  // {small && 'small '}
  // {medium && 'medium '}
  // {large && 'large '}
  // {mattressbag && 'mattressbag '}
  // {wardrobeRent && 'wardrobeRent '}
  // {wardrobeBuy && 'wardrobeBuy '}
  // {num1 && '1 '}
  // {num2 && '2 '}
  // {num3 && '3 '}
  // {num4 && '4 '}
  // {num5 && '5 '}
  // </div>

  // const shift = useKeyPress('shift');
  // const small = useKeyPress('q');
  // const medium = useKeyPress('w');
  // const large = useKeyPress('e');
  // const mattressbag = useKeyPress('r');
  // const wardrobeRent = useKeyPress('t');
  // const wardrobeBuy = useKeyPress('y');
  // const num1 = useKeyPress('1');
  // const num2 = useKeyPress('2');
  // const num3 = useKeyPress('3');
  // const num4 = useKeyPress('4');
  // const num5 = useKeyPress('5');

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
          {/* {materials.map((m) => (
            <Material m={m} key={m.name + m.volume} />
          ))} */}
          {defaultMaterials.map((m) => (
            <Material m={m} key={m.name + m.volume} />
          ))}
        </tbody>
        <tfoot className="  text-white rounded-t-lg">
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
