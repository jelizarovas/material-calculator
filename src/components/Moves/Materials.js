import React from "react";
import { Material } from "./Material";
import { ClearInventory } from "./ClearInventory";
import { defaultMaterials } from "../../utils/defaultMaterials";
import { mergeDefaultWProvider } from "../../utils/mergeDefaultWProvider";
import { vibrate } from "../../utils/vibrate";
import { nanoid } from "nanoid";

export const Materials = ({ state, dispatch }) => {
  const { totalMaterials, materials: materialsState } = state;
  const [materials, setMaterials] = React.useState(mergeDefaultWProvider(defaultMaterials, materialsState));

  const handleChange = (id, data = {}) => {
    if (!materialsState.find((m) => m.id === id)) data = { ...defaultMaterials.find((m) => m.id === id), ...data };
    dispatch({ type: "changeMaterial", id, payload: data });
    setMaterials(materials.map((m) => (id === m.id ? { ...m, ...data } : m)));
  };
  const handleAdd = () => {
    const id = nanoid(6);
    const data = { name: `Custom - ${id}`, units: 0, rate: 0, total: 0, isCustom: true };
    dispatch({ type: "changeMaterial", id, payload: data });
    setMaterials([...materials, { id, ...data }]);
  };
  const handleRemove = (id) => {
    dispatch({ type: "removeMaterial", id });
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const handleClear = () => {
    dispatch({ type: "clearMaterials" });
    setMaterials(defaultMaterials);
    vibrate(500);
  };

  return (
    <div className="flex justify-center align-center mt-2  ">
      <table className="w-full xl:w-2/3 ">
        <thead className="">
          <tr className="bg-purple-700 text-white rounded-t-lg">
            <th className="w-1/2">Material</th>
            <th className="w-1/4">Count {totalMaterials > 0 ? <ClearInventory handleClear={handleClear} /> : null} </th>
            <th className="w-1/4">Price</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {materials.map((m, i) => {
            return <Material key={m.id} handleRemove={handleRemove} handleChange={handleChange} {...m} />;
          })}
        </tbody>
        <tfoot className="  text-sm rounded-t-lg">
          <tr>
            <td className="p-2">
              <span className="cursor-pointer" onClick={handleAdd}>
                +
              </span>
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
