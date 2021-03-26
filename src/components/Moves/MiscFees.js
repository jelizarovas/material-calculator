import { ArrowDropDown, ArrowRight, CheckBoxOutlineBlank, CheckBoxTwoTone, Delete } from "@material-ui/icons";
import React from "react";
import { defaultMiscFees } from "../../utils/defaultMiscFees";
import { SectionTitle } from "../Layout/SectionTitle";
import { TableFooter } from "../Layout/TableFooter";
import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { useGroup } from "../../utils/useGroup";
import { filterGroup } from "../../utils/helperFunctions";

export const MiscFees = ({ groupName = "miscFees", showMoreDefault = true }) => {
  const move = useMove();
  const dispatch = useMoveDispatch();

  const { totalMiscFees = 0, miscFees } = move;
  const [fees, , update, add, remove, clear] = useGroup(groupName, defaultMiscFees, miscFees, dispatch);

  const [showMore, setShowOnlySelected] = React.useState(showMoreDefault);
  const [justAdded, setJustAdded] = React.useState(false);
  const feeRefs = React.useRef([]);

  const feesFilter = filterGroup(fees, 4, "selected", (v) => v);

  feeRefs.current = (showMore ? fees : feesFilter).map((f, i) => (feeRefs.current[i] = React.createRef()));

  React.useEffect(() => {
    if (justAdded) {
      feeRefs.current[
        feeRefs.current.length - 1
      ]?.current?.parentNode?.parentNode?.parentNode?.firstChild?.lastChild?.firstChild?.focus();
      setJustAdded(false);
    }
  }, [justAdded, setJustAdded]);

  return (
    <>
      <SectionTitle title="Misc Fees" onClick={clear} hidePlus={miscFees.length === 0} Icon={Delete} />
      <div className="mt-2 bg-white rounded-t-md w-full mx-auto">
        {(showMore ? fees : feesFilter).map((fee, i) => {
          return <Fee key={i} update={update} inputref={feeRefs.current[i]} remove={remove} {...fee} />;
        })}
      </div>
      <TableFooter
        showMore={showMore}
        setShowMore={setShowOnlySelected}
        total={totalMiscFees}
        handleAdd={() => {
          add({ selected: true });
          setJustAdded(true);
        }}
      />
    </>
  );
};

const Fee = ({
  name = "",
  defaultAmount = 0,
  value = "",
  update,
  inputref = null,
  selected = false,
  Icon = undefined,
  Guide = undefined,
  pre = "",
  isCustom = false,
  id,
  remove,
  ...rest
}) => {
  const [showGuide, setShowGuide] = React.useState(false);

  const toggleShowGuide = () => setShowGuide((s) => !s);

  const setFromGuide = (value) => {
    update(id, { value, selected: true });
  };

  const toggleSelected = (e = null) => {
    if (e?.target?.name !== "nameInput") update(id, { selected: !selected, value: value ? value : defaultAmount });
  };
  return (
    <>
      <div
        data-id={`fee-${id}`}
        className="flex flex-col text-gray-800 text-sm cursor-pointer bg-white odd:bg-gray-50"
        {...rest}
      >
        <div
          className={`flex  justify-between items-center    border-b ${
            selected === true ? " bg-green-50 hover:bg-green-100" : `  hover:bg-purple-100`
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
                  onChange={(e) => update(id, { name: e.target.value })}
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
                onChange={(e) => update(id, { value: e.target.value })}
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
            {isCustom ? (
              <Delete className="p-1" onClick={() => remove(id)} />
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
