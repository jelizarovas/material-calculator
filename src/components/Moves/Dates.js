import React, { useEffect } from "react";
import { Input } from "../Inputs/Input";
import { CalendarToday, EventBusy, Today, Add, Remove, EventAvailable, DateRange } from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { decrementDate, getFormattedDate, incrementDate } from "../../utils/helperFunctions";
import { SectionTitle } from "../Layout/SectionTitle";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { Radio } from "../Inputs/Radio";

export const Dates = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const { /*dates,*/ dateType } = client;

  // const addDate = () => {
  //   dispatch({ field: "dates", value: [...dates, ""] });
  // };

  //if value in provider doesn't exist - provide default
  useEffect(() => {
    if (!dateType)
      dispatch({
        field: "dateType",
        value: "today",
      });
    return () => {};
  }, [dateType, dispatch]);

  return (
    <>
      <SectionTitle title="Dates" hidePlus={true} />
      <DateType onClick={onChange} value={dateType} />
      {dateType === "other" && <DatesList />}
    </>
  );
};

const DateType = (props) => {
  const dateTypes = [
    { value: "today", name: "Today", Icon: EventAvailable },
    { value: "other", name: "Multi-Day/Other", Icon: DateRange, disabled: true },
    // { value: "other", placeholder: "Other", Icon: EventNote },
  ];
  return <Radio name="dateType" options={dateTypes} {...props} row="true" />;
};

const DatesList = () => {
  const dispatch = useMoveDispatch();
  const client = useMove();

  const { dates } = client;

  const handleChange = (e, index) => {
    const newArray = dates;
    newArray[index] = e.target.value;
    dispatch({ field: "dates", value: [...newArray] });
  };

  const handleDelete = (index) => {
    if (dates.length > 1) {
      const newArray = dates;
      newArray.splice(index, 1);
      dispatch({ field: "dates", value: [...newArray] });
    }
  };

  return (
    <>
      {dates &&
        dates.map((d, i) => {
          return (
            <Day
              key={i}
              index={i}
              value={d}
              handleChange={handleChange}
              handleDelete={handleDelete}
              canDelete={dates.length > 1}
            />
          );
        })}
    </>
  );
};

const Day = ({ index = 1, value, handleChange, handleDelete, canDelete }) => {
  return (
    <div className="flex items-center justify-between rounded-md  m-1">
      <Input
        name={"date-" + (index + 1)}
        value={value}
        onChange={(e) => handleChange(e, index)}
        Icon={CalendarToday}
        placeholder={"Day " + (index + 1)}
        type="text"
        className="flex-grow w-full"
      />
      <div className="flex">
        <span className=" flex-shrink hover:text-red-500 cursor-pointer m-2">
          <Remove onClick={() => handleChange({ target: { value: decrementDate(value) } }, index)} />
        </span>
        <span className=" flex-shrink hover:text-blue-500 cursor-pointer m-2">
          <Today onClick={() => handleChange({ target: { value: getFormattedDate(new Date()) } }, index)} />
        </span>
        <span className=" flex-shrink hover:text-green-500 cursor-pointer m-2">
          <Add onClick={() => handleChange({ target: { value: incrementDate(value) } }, index)} />
        </span>
      </div>
      {canDelete && (
        <span className=" flex-shrink hover:text-red-500 cursor-pointer m-2">
          <EventBusy onClick={() => handleDelete(index)} />
        </span>
      )}
    </div>
  );
};
