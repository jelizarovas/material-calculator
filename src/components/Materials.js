import React, { useEffect, useState } from "react";
import { useInventory } from "./Providers/InventoryProvider";
import { Material } from "./Material";
import ClearInventory from "./ClearInventory";

export const Materials = () => {
  // const [materials, setMaterials] = useState(initialMaterials);
  const { inventory } = useInventory();
  const [totalMaterial, setTotalMaterial] = useState(0);

  useEffect(() => {
    setTotalMaterial(inventory.reduce((sum, { count, price }) => sum + count * price, 0));
  }, [inventory]);

  // console.log(inventory)
  // <div style={{minHeight: 200, background: "pink"}}>

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
      <table className="w-full">
        <thead className="">
          <tr className="bg-purple-700 text-white rounded-t-lg">
            <th className="w-1/2">Material</th>
            <th className="w-1/4">Count</th>
            <th className="w-1/4">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {inventory.map((m) => (
            <Material m={m} key={m.name + m.volume} />
          ))}
        </tbody>
        <tfoot className="  text-white rounded-t-lg">
          <tr>
            <td className="p-2">{totalMaterial > 0 ? <ClearInventory /> : null}</td>
            <td className="text-right ">Total: </td>
            <td className="text-right p-2" style={{ minWidth: 120 }}>
              {" $" + totalMaterial}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
