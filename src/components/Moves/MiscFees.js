import {
  ArrowDropDown,
  ArrowRight,
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
import { mergeDefaultWProvider } from "../../utils/mergeDefaultWProvider";
import { SectionTitle } from "../Layout/SectionTitle";

export const MiscFees = ({ state, dispatch }) => {
  const { totalMiscFees = 0, miscFees } = state;

  const [showOnlySelected, setShowOnlySelected] = React.useState(true);
  const [justAdded, setJustAdded] = React.useState(false);
  const feeRefs = React.useRef([]);

  const [fees, setFees] = React.useState(mergeDefaultWProvider(defaultMiscFees, miscFees));
  let remainder = 4 - fees.filter(({ selected, isCustom }) => selected || isCustom).length;
  const feesFilter = fees.filter((f, i) => {
    if (remainder > 0 && !f.selected && !f.isCustom) {
      remainder--;
      return true;
    }
    return f.selected || f.isCustom;
  });

  feeRefs.current = (showOnlySelected ? feesFilter : fees).map((f, i) => (feeRefs.current[i] = React.createRef()));

  React.useEffect(() => {
    if (justAdded) {
      feeRefs.current[
        feeRefs.current.length - 1
      ]?.current?.parentNode?.parentNode?.parentNode?.firstChild?.lastChild?.firstChild?.focus();
      setJustAdded(false);
    }
  }, [justAdded, setJustAdded]);

  const addCustomFee = () => {
    const newFee = { id: nanoid(6), name: "custom", selected: true, value: "0", isCustom: true };
    setFees([...fees, newFee]);
    dispatch({
      type: "miscFeeChange",
      payload: newFee,
    });
    setJustAdded(true);
  };

  const removeCustomFee = (id) => {
    dispatch({ type: "miscFeeCustomRemove", payload: { id } });
    setFees(fees.filter((f) => f.id !== id));
  };

  const clearMiscFees = () => {
    dispatch({ type: "clearMiscFees" });
    setFees(defaultMiscFees);
  };
  const handleChange = (payload = {}) => {
    const { id, field, value, field2 = null, value2 = null } = payload;
    if (!miscFees.find((f) => f.id === id)) {
      const { Icon, Guide, ...m } = { Icon: {}, Guide: {}, ...defaultMiscFees.find((f) => f.id === id) };
      payload = { ...m, [field]: value, [field2]: value2, value: m.defaultAmount };
    }
    dispatch({ type: "miscFeeChange", payload });
    setFees(fees.map((f) => (id === f.id ? { ...f, [field]: value, [field2]: value2 } : f)));
  };

  return (
    <div>
      <SectionTitle title="Misc Fees" onPlusClick={clearMiscFees} hidePlus={miscFees.length === 0} Icon={Clear} />
      <div className="mt-2">
        {(showOnlySelected ? feesFilter : fees).map((fee, i) => {
          return (
            <Fee
              key={i}
              isOdd={i % 2}
              handleChange={handleChange}
              inputref={feeRefs.current[i]}
              removeCustomFee={removeCustomFee}
              {...fee}
            />
          );
        })}
      </div>
      <div className="flex mt-1 uppercase text-xs">
        <NewFee onClick={addCustomFee} />
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
  const [showGuide, setShowGuide] = React.useState(false);

  const toggleShowGuide = () => setShowGuide(!showGuide);

  const {
    name,
    defaultAmount = 0,
    value = defaultAmount,
    handleChange,
    inputref,
    selected = false,
    Icon = undefined,
    Guide = undefined,
    pre,
    isCustom = false,
    id,
    removeCustomFee,
    isOdd = false,
    ...rest
  } = props;

  const setFromGuide = (value) => {
    handleChange({ id, field: "value", value, field2: "selected", value2: true });
  };

  const toggleSelected = (e = null) => {
    if (e?.target?.name !== "nameInput") handleChange({ id, field: "selected", value: !selected });
  };
  return (
    <>
      <div data-id={`fee-${id}`} className="flex flex-col text-gray-800 text-sm cursor-pointer" {...rest}>
        <div
          className={`flex  justify-between items-center  rounded-md border-b ${
            selected === true
              ? " bg-green-50 hover:bg-green-100"
              : ` ${isOdd ? "bg-white" : "bg-gray-50"} hover:bg-purple-100`
          }`}
        >
          <div className="flex flex-grow p-2 w-3/5" onClick={toggleSelected}>
            <span>{selected ? <CheckBoxTwoTone className="text-green-800" /> : <CheckBoxOutlineBlank />}</span>
            <span className="px-2">
              {Icon ? (
                <Icon />
              ) : (
                <span className="bg-gray-800 text-white px-2 py-1 text-xs uppercase rounded-md">
                  {(name && name[0]) || "C"}
                </span>
              )}
            </span>
            <span className=" px-2 truncate ">
              {isCustom ? (
                <input
                  name="nameInput"
                  value={name}
                  onFocus={(e) => e.target.select()}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") inputref.current.focus();
                  }}
                  onChange={(e) => handleChange({ id, field: "name", value: e.target.value })}
                  className="`w-full  p-1 bg-transparent  text-md border-b-2 focus:border-green-700 hover:border-green-700  cursor-pointer             "
                />
              ) : (
                `${name}`
              )}
            </span>
          </div>
          <div>
            <div className="pr-3 relative">
              {selected && <span className="absolute top-1 select-none text-gray-500">$</span>}
              <input
                name="amountInput"
                value={value}
                type="number"
                ref={inputref}
                min="0"
                onChange={(e) => handleChange({ id, field: "value", value: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === "Enter") e.target.blur();
                }}
                onFocus={(e) => e.target.select()}
                className={`w-20 text-right p-1 bg-transparent  text-md border-b-2 focus:border-green-700 hover:border-green-700  cursor-pointer ${
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
            {isCustom ? (
              <Clear className="p-1" onClick={() => removeCustomFee(id)} />
            ) : Guide ? (
              showGuide ? (
                <ArrowDropDown onClick={toggleShowGuide} />
              ) : (
                <ArrowRight onClick={toggleShowGuide} />
              )
            ) : (
              <div className="w-6"></div>
            )}
          </span>
        </div>
      </div>
      {showGuide && Guide && <Guide setValue={setFromGuide} />}
    </>
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
      <span className=" p-2  uppercase">Custom Fee</span>
    </div>
  );
};

//   onKeyPress={({ charCode, code, key, keyCode, which }) => setX({ charCode, code, key, keyCode, which })}
