import React, { useReducer, useEffect } from "react";
import { SectionTitle } from "../Layout/SectionTitle";
import { convertToHHMM, getFormattedDate, timeToDecimal } from "../../utils/helperFunctions";
import { Input } from "../Inputs/Input";
import {
  AccessTime,
  AlarmOn,
  AttachMoney,
  DirectionsRun,
  EmojiPeople,
  Home,
  HourglassEmpty,
  LocalOffer,
  LocalShipping,
  Today,
  Update,
  Weekend,
} from "@material-ui/icons";
import { SignatureBlock } from "../Inputs/SignatureBlock";
import { abhsFill } from "../../utils/abhsFill";
import download from "downloadjs";
import { Button } from "../Inputs/Button";

const reducer = (state, { payload }) => {
  if (!payload) return state;
  return { ...state, ...payload };
};

const initialState = {
  reference: "Margeaux Everett",
  address: "2405 Maple Street, Everett, WA 98201",
  type: "Move in & Stage",
  crew: "Arnas, Kevan",
  breaks: "0",
  rate: 125,
  travelFee: 62.5,
  date: getFormattedDate(new Date()),
};

export const ABHS = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    reference = "",
    address = "",
    type = "",
    date = "",
    crew = "",
    start = "",
    breaks = "",
    end = "",
    totalTime = "",
    rate = "",
    travelFee = "",
    total = "",
    // crewSignature = "",
    // clientSignature = "",
  } = state;

  const sigDispatch = ({ field, value }) => {
    dispatch({ payload: { [field]: value } });
  };

  const onChange = (e) => {
    dispatch({ payload: { [e.target.name]: e.target.value } });
  };

  const getPDF = async (e) => {
    download(await abhsFill(state), `ABHS ${getFormattedDate(new Date())}.pdf`, "application/pdf");
  };

  useEffect(() => {
    const begin = timeToDecimal(start);
    let finish = timeToDecimal(end);
    const offTime = timeToDecimal(breaks) || 0;

    if (begin > finish) finish += 12;
    const th = finish - begin - offTime;

    dispatch({
      payload: {
        totalTime: convertToHHMM(th >= 0 ? th : 0),
      },
    });
  }, [start, end, breaks, dispatch]);

  useEffect(() => {
    let value = 0;

    value = Number(timeToDecimal(totalTime)) * Number(rate);

    if (!!travelFee) value += travelFee;

    dispatch({ payload: { total: value } });
  }, [totalTime, rate, travelFee, dispatch]);

  const jobs = [];

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div>{/* <pre>< {JSON/pre> */}</div>
      {/* <div className="sidebar bg-gray-300 mx-2 rounded-b-md p-4">
        <button className>New</button>
        <SectionTitle title="Jobs" hidePlus={true} />
        <div id="jobList">{!!jobs ? jobs.map((job, index) => <div>JOB</div>) : <div>No jobs</div>}</div> */}
      {/* </div> */}
      <div className="container bg-gray-50 p-2 rounded-b-md max-w-md">
        <SectionTitle title="ABHS" hidePlus={true} />

        <Input name="reference" value={reference} onChange={onChange} Icon={EmojiPeople} label="Reference" />
        <Input name="address" value={address} onChange={onChange} Icon={Home} label="address" />
        <Input name="type" value={type} onChange={onChange} Icon={Weekend} label="type" />
        <Input name="date" value={date} onChange={onChange} Icon={Today} label="date" />
        <Input name="crew" value={crew} onChange={onChange} Icon={DirectionsRun} label="crew" />
        <div className="flex">
          <Input name="start" className="w-1/2" value={start} onChange={onChange} Icon={Update} label="start" />
          <Input name="end" className="w-1/2" value={end} onChange={onChange} Icon={AlarmOn} label="end" />
        </div>
        <Input name="breaks" value={breaks} onChange={onChange} Icon={HourglassEmpty} label="breaks" />
        <Input name="totalTime" value={totalTime} onChange={onChange} Icon={AccessTime} label="total Time" />
        <Input name="rate" value={rate} onChange={onChange} Icon={LocalOffer} label="rate" />
        <Input name="travelFee" value={travelFee} onChange={onChange} Icon={LocalShipping} label="travel Fee" />
        <Input name="total" value={total} onChange={onChange} Icon={AttachMoney} label="total" />
        <span> Crew Signature </span>
        <SignatureBlock dispatch={sigDispatch} type="signature" name="crewSignature" />
        <span> ABHS Signature </span>
        <SignatureBlock dispatch={sigDispatch} type="signature" name="clientSignature" />

        <div className="flex justify-center my-4 bg-green-400 rounded-sm shadow-md">
          <Button onClick={getPDF} text="Download" />
        </div>
      </div>
    </div>
  );
};
