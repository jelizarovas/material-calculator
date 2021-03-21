import React from "react";
import { Material } from "./Material";
import { defaultMaterials } from "../../utils/defaultMaterials";
import { mergeDefaultWProvider } from "../../utils/mergeDefaultWProvider";
import { vibrate } from "../../utils/vibrate";
import { nanoid } from "nanoid";
import { SectionTitle } from "../Layout/SectionTitle";
import { TableFooter } from "../Layout/TableFooter";
import { Delete } from "@material-ui/icons";

export const Materials = ({ state, dispatch }) => {
  const { totalMaterials, materials: materialsState } = state;
  const [showMore, setShowMore] = React.useState(true);
  const [materials, setMaterials] = React.useState(mergeDefaultWProvider(defaultMaterials, materialsState));

  let remainder = 8 - materials.filter(({ units, isCustom }) => units > 0 || isCustom).length;
  const filteredMaterials = materials.filter((m, i) => {
    if (remainder > 0 && m.units === 0 && !m.isCustom) {
      remainder--;
      return true;
    }
    return m.units > 0 || m.isCustom;
  });

  const handleChange = (id, data = {}) => {
    if (!materialsState.find((m) => m.id === id)) data = { ...defaultMaterials.find((m) => m.id === id), ...data };
    dispatch({ type: "changeMaterial", id, payload: data });
    setMaterials(materials.map((m) => (id === m.id ? { ...m, ...data } : m)));
  };
  const handleAdd = (name, rate) => {
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
    <>
      <SectionTitle title="Materials Used" Icon={Delete} onClick={handleClear} />
      <div className="flex flex-col mt-2 w-full xl:w-2/3 mx-auto rounded-md shadow-sm  ">
        <div name="body" className="bg-white rounded-md">
          {(showMore ? materials : filteredMaterials).map((m, i) => {
            return <Material key={m.id} isOdd={i % 2} handleRemove={handleRemove} handleChange={handleChange} {...m} />;
          })}
        </div>
      </div>
      <TableFooter showMore={showMore} setShowMore={setShowMore} total={totalMaterials} handleAdd={handleAdd} />
    </>
  );
};
