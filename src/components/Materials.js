import React from "react";
import { useInventory } from "./Providers/InventoryProvider";
import { Material } from "./Material";

export const Materials = () => {
  // const [materials, setMaterials] = useState(initialMaterials);
  const { inventory } = useInventory();

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
    <table>
      <thead>
        <tr className="bg-green-700 text-white">
          <th>Material</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((m) => (
          <Material m={m} key={m.name + m.volume} />
        ))}
      </tbody>
    </table>
  );
};
