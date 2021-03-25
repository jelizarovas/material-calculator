import React, { useState } from "react";
import { Input } from "../Inputs/Input";
import { Dates } from "./Dates";
import {
  AccessTime,
  SettingsEthernet,
  LocalShippingOutlined,
  LocalShippingTwoTone,
  FitnessCenter,
  LocalOffer,
  LocalShipping,
  CreditCard,
  EventAvailable,
  DateRange,
  LocalOfferTwoTone,
  SettingsOverscan,
  Receipt,
  Timelapse,
  HourglassEmpty,
  Restore,
  Update,
  Timer,
  AlarmOn,
} from "@material-ui/icons/";
import { SectionTitle } from "../Layout/SectionTitle";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

// import { ChipsInput } from "../Inputs/ChipsInput";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { NoInput } from "../Inputs/NoInput";
import { TimeInput } from "../Inputs/TimeInput";

const TravelTime = ({ onChange, travelTime, hourlyRate }) => {
  const times = [
    { label: "0:00 ", value: 0 },
    { label: "0:15", value: 0.25 },
    { label: "0:30 ", value: 0.5 },
    { label: "0:45 ", value: 0.75 },
    { label: "1:00 ", value: 1 },
    { label: "1:15 ", value: 1.25 },
    { label: "1:30 ", value: 1.5 },
    { label: "1:45 ", value: 1.75 },
    { label: "2:00 ", value: 2 },
  ];
  if (hourlyRate)
    times.map((t) => {
      t.label += ` ($${hourlyRate * t.value})`;
      return t;
    });

  return (
    <select
      name="travelTime"
      value={travelTime}
      onChange={onChange}
      className="m-2 w-full  py-2 pr-6 text-sm text-black bg-white rounded-md pl-2 focus:outline-none focus:bg-white focus:text-gray-900"
    >
      {times.map((t) => (
        <option key={t.label} value={t.value}>
          ⏰ {t.label.toString()}
        </option>
      ))}
      <option onSelect={() => console.log("more")}>More...</option>
    </select>
  );
};

export const Rates = () => {
  const client = useMove();
  const dispatch = useMoveDispatch();

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const {
    isTravelFeeFixed,
    hourlyRate,
    totalTransportation,
    // personnel,
    travelTime,
    totalHours,
    startTime,
    endTime,
    arriveTime,
    departTime,
    breakTime,
    jobType,
    flatAmount,
    distance,
    grossWeight,
    tareWeight,
    netWeight,
    mileageRate,
    dates,
    dateType,
    weightType,
  } = client;

  const addDate = () => {
    dispatch({ field: "dates", value: [...dates, ""] });
  };
  return (
    <form method="post">
      <SectionTitle title="Dates" onPlusClick={addDate} hidePlus={dateType !== "other"} />

      <DateType onClick={onChange} value={dateType} />
      {dateType === "other" && <Dates />}

      <SectionTitle title="Job Type" hidePlus={true} />
      <JobType onClick={onChange} value={jobType} />

      {/* <SectionTitle title="Crew" hidePlus={true} /> */}
      {/* <ChipsInput name="personnel" chips={personnel} /> */}
      {/* <DropDown /> */}

      {jobType === "flatRate" && <FlatRate onChange={onChange} flatAmount={flatAmount} />}
      {jobType === "longDistance" && (
        <LongDistance
          onChange={onChange}
          distance={distance}
          grossWeight={grossWeight}
          tareWeight={tareWeight}
          netWeight={netWeight}
          mileageRate={mileageRate}
          weightType={weightType}
        />
      )}
      {jobType === "local" && (
        <React.Fragment>
          <h2>Rates</h2>
          <Input
            name="hourlyRate"
            value={hourlyRate}
            onChange={onChange}
            placeholder="Hourly"
            type="number"
            Icon={() => <span className="select-none text-bold">$/hr</span>}
            step="5"
          />
          <div className="flex items-center">
            <input
              name="isTravelFeeFixed"
              className="mr-5 ml-3"
              checked={isTravelFeeFixed}
              onChange={() => {
                dispatch({ field: "isTravelFeeFixed", value: !isTravelFeeFixed });
              }}
              placeholder="Total Valuation Cost"
              type="checkbox"
            />
            <label htmlFor="isTravelFeeFixed">Fixed?</label>
          </div>
          {isTravelFeeFixed ? (
            <div className="flex-col">
              <div className="flex justify-between">
                <label htmlFor="travelTime" className=" px-2 w-full">
                  Travel Time
                </label>
              </div>
              {/* <div className="flex-row">
                    <label htmlFor="startTime" className=" px-2">
                    Fee
                    </label>
                    <Input
                    name="travelFee"
                    value={travelFee}
                    onChange={onChange}
                    placeholder="Travel Fee"
                    type="number"
                    Icon={LocalShipping}
                    />
                  </div> */}
              {/* <div className="flex-row"> */}

              <TravelTime name="travelTime" onChange={onChange} travelTime={travelTime} hourlyRate={hourlyRate} />
              {/* </div> */}
            </div>
          ) : (
            <div className="flex">
              <div className="flex-row">
                <label htmlFor="startTime" className=" px-2">
                  Start
                </label>
                <Input name="startTime" value={startTime} onChange={onChange} placeholder="Start" Icon={Timer} />
              </div>
              <div className="flex-row">
                <label htmlFor="endTime" className=" px-2">
                  End
                </label>
                <Input name="endTime" value={endTime} onChange={onChange} placeholder="End" Icon={AlarmOn} />
              </div>
            </div>
          )}
          {/* <h2>Time</h2> */}
          <div className="flex">
            <div className="flex-row">
              <label htmlFor="arriveTime" className=" px-2">
                Arrive
              </label>
              <TimeInput
                name="arriveTime"
                value={arriveTime}
                field="arriveTime"
                onChange={onChange}
                placeholder="Arrive"
                Icon={Restore}
              />
            </div>
            <div className="flex-row">
              <label htmlFor="departTime" className=" px-2">
                Depart
              </label>
              <TimeInput name="departTime" value={departTime} onChange={onChange} placeholder="Depart" Icon={Update} />
            </div>
          </div>
          <div className="flex">
            <div className="flex-row">
              <label htmlFor="arriveTime" className=" px-2">
                Arrive
              </label>
              <Input name="arriveTime" value={arriveTime} onChange={onChange} placeholder="Arrive" Icon={Restore} />
            </div>
            <div className="flex-row">
              <label htmlFor="departTime" className=" px-2">
                Depart
              </label>
              <Input name="departTime" value={departTime} onChange={onChange} placeholder="Depart" Icon={Update} />
            </div>
          </div>
          <div className="flex-row">
            <label htmlFor="breakTime" className=" px-2">
              Breaks
            </label>
            <Input name="breakTime" value={breakTime} onChange={onChange} placeholder="Breaks" Icon={HourglassEmpty} />
          </div>
          <h2>Totals</h2>
          <NoInput value={totalHours.toString()} Icon={Timelapse} type="time" unit="Hrs" label="Total Time" />
          {/* <Input name="totalHours" value={totalHours} onChange={onChange} placeholder="Total Hours" Icon={AccessTime} /> */}
          {/* <h2>Total hours</h2> */}
          {/* {arriveTime} to {departTime} ={" "} */}
          {/* {timeToDecimal(departTime) - timeToDecimal(arriveTime) - timeToDecimal(breakTime)} */}
          {/* <h2 className="text-4xl mt-10">
                Total sum is $ {Number(totalHours) * Number(hourlyRate) + Number(travelFee)}
              </h2> */}
        </React.Fragment>
      )}
      <NoInput value={totalTransportation} Icon={LocalOfferTwoTone} unit="$" label="Total Transportation" />
    </form>
  );
};

// function timeToDecimal(t) {
//   var arr = t.split(":");
//   var dec = parseInt((arr[1] / 6) * 10, 10);

//   return parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec);
// }

const FlatRate = ({ flatAmount, onChange }) => {
  const [showHelp, setshowHelp] = useState(false);

  const client = useMove();
  const dispatch = useMoveDispatch();

  const { flatIsMaterialsIncluded } = client;

  const explanation =
    "Is this flat amount just for the transportation/labor, or are all the materials included in price?";

  return (
    <div>
      <Input
        name="flatAmount"
        value={flatAmount}
        onChange={onChange}
        placeholder="Flat Amount"
        Icon={() => <span>$</span>}
      />
      <input
        name="flatIsMaterialsIncluded"
        className="mr-5 ml-3"
        checked={flatIsMaterialsIncluded}
        onChange={() => {
          dispatch({
            field: "flatIsMaterialsIncluded",
            value: !flatIsMaterialsIncluded,
          });
        }}
        placeholder="Total Valuation Cost"
        type="checkbox"
      />
      <label htmlFor="flatIsMaterialsIncluded">
        Materials included?
        <span className="text-xs  cursor-pointer select-none pl-4" onClick={() => setshowHelp(!showHelp)}>
          {!showHelp ? "> " : "x "} Help
        </span>
      </label>
      {showHelp && <span className="block">{explanation}</span>}
    </div>
  );
};

const LongDistance = ({
  onChange,
  distance,
  grossWeight,
  tareWeight,
  netWeight,
  mileageRate,
  weightType = "weightTicket",
}) => {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col justify-center   w-1/2">
          <label htmlFor="distance" className="text-xs text-center">
            Distance
          </label>

          <Input
            units="miles"
            name="distance"
            value={distance}
            onChange={onChange}
            placeholder="Distance"
            Icon={SettingsEthernet}
          />
        </div>
        <div className="flex flex-col justify-center   w-1/2">
          <label htmlFor="mileageRate" className="text-xs text-center">
            Mileage Rate
          </label>
          <Input
            name="mileageRate"
            value={mileageRate}
            onChange={onChange}
            placeholder="Mileage Rate"
            Icon={LocalOffer}
            units="$/lbs."
          />
        </div>
      </div>
      <WeightType onClick={onChange} value={weightType} />
      {weightType === "weightTicket" && (
        <React.Fragment>
          <div className="flex">
            <div className="flex flex-col justify-center  w-1/2">
              {/* <label htmlFor="grossWeight" className="text-xs text-center">
                Gross Weight (lbs.)
              </label> */}
              <Input
                name="grossWeight"
                value={grossWeight}
                onChange={onChange}
                placeholder="Gross Weight"
                Icon={LocalShippingTwoTone}
                units="lbs."
              />
            </div>
            <div className="flex flex-col justify-center   w-1/2">
              {/* <label htmlFor="tareWeight" className="text-xs text-center">
                Tare Weight (lbs.)
              </label> */}
              <Input
                name="tareWeight"
                value={tareWeight}
                onChange={onChange}
                placeholder="Tare Weight"
                Icon={LocalShippingOutlined}
                units="lbs."
              />
            </div>
          </div>
          <NoInput
            value={(Number(grossWeight) - Number(tareWeight)).toString()}
            Icon={FitnessCenter}
            unit="lbs."
            label="Net Weight"
          />
        </React.Fragment>
      )}
      {weightType === "cubicWeight" && (
        // <label htmlFor="netWeight" className="text-xs text-center">
        //   Net Weight (lbs.)
        // </label>
        <Input name="netWeight" value={netWeight} onChange={onChange} placeholder="netWeight" Icon={FitnessCenter} />
      )}
    </div>
  );
};

const JobType = (props) => {
  const jobTypes = [
    { value: "local", placeholder: "Local (Hourly)", Icon: AccessTime },
    { value: "flatRate", placeholder: "Flat Rate", Icon: CreditCard },
    { value: "longDistance", placeholder: "Long Distance", Icon: LocalShipping },
  ];

  return <ButtonSelect name="jobType" buttons={jobTypes} {...props} />;
};

const DateType = (props) => {
  const dateTypes = [
    { value: "today", placeholder: "Today", Icon: EventAvailable },
    { value: "other", placeholder: "Multi-Day/Other", Icon: DateRange, isDisabled: true },
    // { value: "other", placeholder: "Other", Icon: EventNote },
  ];
  return <ButtonSelect name="dateType" buttons={dateTypes} {...props} />;
};

const WeightType = (props) => {
  const dateTypes = [
    { value: "cubicWeight", placeholder: "Cubic Weight", Icon: SettingsOverscan },
    { value: "weightTicket", placeholder: "Weight Ticket", Icon: Receipt },
  ];
  return <ButtonSelect name="weightType" buttons={dateTypes} {...props} />;
};
