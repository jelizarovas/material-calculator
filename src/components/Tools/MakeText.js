import { AccessTime, CreditCard, Delete, DirectionsWalk, Edit, Message, Phone, Save } from "@material-ui/icons";
import React, { useState, useEffect, useReducer } from "react";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { Input } from "../Inputs/Input";
import { useHistory, useLocation } from "react-router-dom";
import { isIOS } from "react-device-detect";

import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from "react-redux-firebase";
import { timestamp } from "../..";
import { nanoid } from "nanoid";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const reducer = (state, action) => {
  console.log("reducer");

  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "clear":
      return {};

    default:
      break;
  }
  return { ...state };
};

export const MakeText = () => {
  let query = useQuery();
  const firestore = useFirestore();

  const initialState = {
    phone: query.get("p") || query.get("phone") || "",
    customer: query.get("n") || query.get("name") || "",
    greeting: isNowAMPM() === "AM" ? "Good Morning" : "Good afternoon",
    crewLead: "Arnas",
    company: "Paramount Transportation Systems",
    moveType: "delivering",
    scheduledETA: "1 p.m. to 4 p.m.",
    sms: "",
    editId: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { phone, customer, greeting, crewLead, company, moveType, scheduledETA, sms, editId } = state;

  const onChange = (e) => dispatch({ type: "update", payload: { [e.target.name]: e.target.value } });

  const handleEdit = (id, payload) => {
    return function (e) {
      console.log({ id, payload });
      // if (!!payload) return null;
      dispatch({ type: "update", payload: { editId: id, ...payload } });
    };
  };

  function addSMS() {
    const payload = { phone, customer, greeting, crewLead, company, moveType, scheduledETA, sms };
    if (!!editId) {
      const tempId = editId;
      dispatch({ type: "update", payload: { editId: "" } });

      return firestore.collection("sms").doc(tempId).update(payload);
    }
    return firestore.collection("sms").add(payload);
  }

  useEffect(() => {
    dispatch({
      type: "update",
      payload: {
        sms: `${greeting}${
          !!customer ? " " + customer : ""
        }, this is Arnas with ${company}. We'll be ${moveType} today. Our scheduled ETA is ${scheduledETA}. If you have any questions please text me or call me. `,
      },
    });

    return () => {};
  }, [phone, customer, greeting, crewLead, company, moveType, scheduledETA]);

  return (
    <>
      <div className="bg-gray-100 p-2 rounded-b-lg">
        {!!editId && (
          <>
            <span>Editing: {editId}</span>
            <button onClick={() => dispatch({ type: "clear" })}>x</button>
          </>
        )}
        <Input name="phone" Icon={Phone} value={phone} onChange={onChange} placeholder="Text phone number" />

        <Input name="customer" Icon={DirectionsWalk} value={customer} onChange={onChange} placeholder="Customer name" />
        <div className="bg-white mx-2 py-1 rounded-md">
          <ButtonSelect
            name="greeting"
            value={greeting}
            onClick={onChange}
            buttons={[
              { value: "Good morning", placeholder: "Morning", Icon: AccessTime },
              { value: "Good afternoon", placeholder: "Afternoon", Icon: CreditCard },
              { value: "Hello", placeholder: "Neutral", Icon: CreditCard },
            ]}
          />
        </div>
        <div className="bg-white mx-2 py-1 rounded-md">
          <ButtonSelect
            name="moveType"
            value={moveType}
            onClick={onChange}
            buttons={[
              { value: "delivering your goods ", placeholder: "Delivery", Icon: AccessTime },
              { value: "packing up your goods ", placeholder: "Origin", Icon: CreditCard },
              { value: "moving you", placeholder: "Local", Icon: CreditCard },
            ]}
          />
        </div>
        <div className="bg-white mx-2 py-1 rounded-md">
          <ButtonSelect
            name="company"
            value={company}
            onClick={onChange}
            buttons={[
              { value: "Paramount Transportation Systems", placeholder: "Paramount", Icon: AccessTime },
              { value: "SuperFriends Moving", placeholder: "SuperFriends", Icon: CreditCard },
            ]}
          />
        </div>
        <div className="eta-window"></div>

        <div className="bg-white p-10 my-2 rounded-lg">{sms}</div>
        <div className="flex justify-center">
          <a
            className="bg-green-500 text-white p-2 px-4 rounded-md"
            href={`sms:${phone}${isIOS ? "&" : "?"}body=${sms}`}
            target="_blank"
          >
            <Message className="mr-2" /> Send text
          </a>
          <button className="text-blue-500 px-4 py-2" onClick={addSMS}>
            <Save className="mr-2" />
            Save
          </button>
        </div>
      </div>
      <ListSMS handleEdit={handleEdit} />
    </>
  );
};

function isNowAMPM() {
  return new Date().getHours() >= 12 ? "PM" : "AM";
}

const smsQuery = {
  collection: "sms",
  limitTo: 10,
};

const ListSMS = ({ handleEdit }) => {
  let history = useHistory();
  const firestore = useFirestore();

  useFirestoreConnect(() => [smsQuery]);
  const sms = useSelector(({ firestore: { ordered } }) => ordered.sms);

  // Show a message while sms are loading
  if (!isLoaded(sms)) {
    return "Loading";
  }

  // Show a message if there are no sms
  if (isEmpty(sms)) {
    return "Todo list is empty";
  }

  return (
    <div className="sidebar flex flex-col w-full bg-gray-50 mt-4 p-4 rounded-md">
      {sms.map(({ id, ...rest }, ind) => (
        <SMSLink key={`${id}-${ind}`} id={id} handleEdit={handleEdit} {...rest} />
      ))}
    </div>
  );
};

const SMSLink = (props) => {
  const { id, handleEdit, ...rest } = props;
  return (
    <div className=" w-full p-2 grid grid-flow-col auto-cols-fr justify-items-center text-xs ">
      {/* <div>Date</div> */}
      <div>{rest?.customer}</div>
      <div>{rest?.phone}</div>
      <div>{rest?.moveType}</div>
      <div>{id}</div>
      <div className="flex">
        <div className="px-2 cursor-pointer" onClick={handleEdit(id, rest)}>
          <Edit />
        </div>
        <div className="px-2">
          <Delete />
        </div>
      </div>
      {/* {JSON.stringify(rest)} */}
    </div>
  );
};
