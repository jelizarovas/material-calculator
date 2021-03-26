import { useState } from "react";
import { Material } from "./Material";
import { defaultMaterials } from "../../utils/defaultMaterials";
import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

import { SectionTitle } from "../Layout/SectionTitle";
import { TableFooter } from "../Layout/TableFooter";
import { Delete } from "@material-ui/icons";
import { useGroup } from "../../utils/useGroup";
import { filterGroup } from "../../utils/helperFunctions";

export const MaterialsWProvider = ({ groupName = "materials", showMoreDefault = true, state, dispatch, ...rest }) => {
  const { totalMaterials, materials: materialsState } = state;
  const [materials, , update, add, remove, clear] = useGroup(groupName, defaultMaterials, materialsState, dispatch, [
    "units",
    "rate",
    "total",
  ]);
  const [showMore, setShowMore] = useState(showMoreDefault);
  return (
    <>
      <SectionTitle title="Materials Used" Icon={Delete} onClick={clear} />
      <div className="flex flex-col mt-2 w-full  mx-auto shadow-sm bg-white rounded-md">
        {(showMore ? materials : filterGroup(materials, 8, "units", (v) => v > 0)).map((m, i) => {
          return <Material key={m.id} handleRemove={remove} handleChange={update} {...m} />;
        })}
      </div>
      <TableFooter showMore={showMore} setShowMore={setShowMore} total={totalMaterials} handleAdd={add} />
    </>
  );
};

export const Materials = (props) => {
  const dispatch = useMoveDispatch();
  const move = useMove();
  return <MaterialsWProvider state={move} dispatch={dispatch} {...props} />;
};
