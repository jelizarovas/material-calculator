import {
  ArrowDropDown,
  CheckBoxOutlineBlank,
  CheckBoxTwoTone,
  Clear,
  ExpandLess,
  ExpandMore,
  LibraryAddTwoTone,
} from "@material-ui/icons";
import { nanoid } from "nanoid";
import React from "react";
import { defaultMiscFees } from "../../utils/defaultMiscFees";
import { SectionTitle } from "../Layout/SectionTitle";

export const MiscFees = ({ state, dispatch }) => {
  const [showOnlySelected, setShowOnlySelected] = React.useState(true);
  const { totalMiscFees = 0, miscFees } = state;

  const [fees, setFees] = React.useState(defaultMiscFees);

  const feeRefs = React.useRef([]);

  feeRefs.current = fees.map((f, i) => (feeRefs.current[i] = React.createRef()));

  const addFee = () => {
    setFees([...fees, { name: "", amount: "0", isCustom: true, id: nanoid(6) }]);
  };

  const removeCustomFee = (id) => setFees(fees.filter((f) => f.id !== id));

  const handleChange = ({ id, field, value }) => {
    // dispatch({ type: "miscFeeChange", payload: { name: e.target.name, amount: e.target.value } });
    setFees(
      fees.map((f, i) => {
        if (id === f.id) {
          f[field] = value;
        }
        return f;
      })
    );
  };

  const selectedCount = fees.filter(({ selected }) => selected).length;
  const customCount = fees.filter(({ isCustom }) => isCustom).length;

  const totalToShow = selectedCount + customCount;
  const wannaSee = 4;
  let needToShow = wannaSee - totalToShow;

  return (
    <div>
      <SectionTitle title="Misc Fees" hidePlus={true} />
      selected count: {totalToShow}
      <div className="mt-2">
        {fees
          .filter((f, i) => {
            if (showOnlySelected) {
              if (needToShow > 0 && !f.selected && !f.isCustom) {
                needToShow--;
                return true;
              }
              return f.selected || f.isCustom;
            }
            return true;
          })
          .map((fee, i) => {
            return (
              <Fee
                key={i}
                handleChange={handleChange}
                inputref={feeRefs.current[i]}
                removeCustomFee={removeCustomFee}
                {...fee}
              />
            );
          })}
      </div>
      <div className="flex mt-1 uppercase text-xs">
        <NewFee onClick={addFee} />
        <div
          className="flex w-1/2 items-center bg-white  rounded-md py-1 ml-10 px-2 justify-around cursor-pointer"
          onClick={() => setShowOnlySelected(!showOnlySelected)}
        >
          <span className="">{!showOnlySelected ? <ExpandLess /> : <ExpandMore />}</span>
          <span>Total: </span>
          <span>$ {totalMiscFees}</span>
        </div>
      </div>
    </div>
  );
};

const Fee = (props) => {
  const {
    name,
    defaultAmount = 0,
    value = defaultAmount,
    handleChange,
    inputref,
    selected = false,
    Icon = undefined,
    pre,
    isCustom = false,
    id,
    removeCustomFee,
  } = props;

  const toggleSelected = (e) => {
    if (e.target.name !== "nameInput") handleChange({ id, field: "selected", value: !selected });
  };
  return (
    <div data-id={`fee-${id}`} className="flex flex-col text-gray-800 text-sm cursor-pointer">
      <div
        className={`flex  justify-between items-center  rounded-md border-b ${
          selected === true ? " bg-green-50" : " bg-white"
        }`}
      >
        <div className="flex flex-grow p-2 w-3/5" onClick={toggleSelected}>
          <span>{selected ? <CheckBoxTwoTone className="text-green-800" /> : <CheckBoxOutlineBlank />}</span>
          <span className="px-2">
            {Icon ? (
              <Icon />
            ) : (
              <span className="bg-gray-800 text-white px-2 py-1 rounded-md">{(name && name[0]) || "C"}</span>
            )}
          </span>
          <span className=" px-2 truncate ">
            {isCustom ? (
              <input
                name="nameInput"
                value={name}
                onChange={(e) => handleChange({ id, field: "name", value: e.target.value })}
                autoFocus
                className="`w-full  p-1 bg-transparent  text-md border-b-2 focus:border-green-700 hover:border-green-700 hover:bg-white cursor-pointer             "
              />
            ) : (
              `${name}, (${id})`
            )}
          </span>
        </div>
        <div>
          <div className="pr-3 relative">
            {selected && <span className="absolute top-1 select-none text-gray-500">$</span>}
            <input
              name="amountInput"
              value={`${value}`}
              type="number"
              ref={inputref}
              min="0"
              onChange={(e) => handleChange({ id, field: "value", value: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.target.blur();
              }}
              onFocus={(e) => e.target.select()}
              className={`w-20 text-right p-1 bg-transparent  text-md border-b-2 focus:border-green-700 hover:border-green-700 hover:bg-white cursor-pointer ${
                selected || isCustom ? "" : "hidden"
              }`}
            />
            <span
              name="usualPrice"
              onClick={toggleSelected}
              className={`font-thin text-xs px-2 nowrap w-2/5 ${selected || isCustom ? "hidden" : ""}`}
            >{`${pre ? pre : "usually "} $${defaultAmount}`}</span>
          </div>
        </div>

        <span className="px-2  opacity-20 focus:opacity-100 hover:opacity-100">
          {/* {id} */}
          {isCustom ? <Clear className="p-1" onClick={() => removeCustomFee(id)} /> : <ArrowDropDown />}
        </span>
      </div>
    </div>
  );
};

const NewFee = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="shadow-sm select-none w-1/2 text-gray-600 flex items-center bg-white  rounded-md py-1 hover:text-green-700 cursor-pointer"
    >
      <span className="px-6">
        <LibraryAddTwoTone />
      </span>
      <span className=" p-2  uppercase">Add Fee</span>
    </div>
  );
};

//   onKeyPress={({ charCode, code, key, keyCode, which }) => setX({ charCode, code, key, keyCode, which })}
