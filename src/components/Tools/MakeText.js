import { AccessTime, CreditCard, DirectionsWalk, Message, Phone, Save } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
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

export const MakeText = () => {
  let query = useQuery();
  const firestore = useFirestore();
  const [phone, setPhone] = useState(query.get("p") || query.get("phone") || "");
  const [customer, setCustomer] = useState(query.get("n") || query.get("name") || "");
  const [greeting, setGreeting] = useState(isNowAMPM() === "AM" ? "Good Morning" : "Good afternoon");
  const [crewLead, setCrewLead] = useState("Arnas");
  const [company, setCompany] = useState("Paramount Transportation Systems");
  const [moveType, setMoveType] = useState("delivering");
  const [scheduledETA, setScheduledETA] = useState("1 p.m. to 4 p.m.");
  const [sms, setSms] = useState("");
  const [editId, setEditId] = useState("");

  const onChangePhone = (e) => setPhone(e.target.value);
  const onChangeCustomer = (e) => setCustomer(e.target.value);
  const onChangeGreeting = (e) => setGreeting(e.target.value);
  const onChangeCompany = (e) => setCompany(e.target.value);
  const onChangeScheduledETA = (e) => setScheduledETA(e.target.value);
  const onChangeMoveType = (e) => setMoveType(e.target.value);

  const handleEdit = (id, payload) => {
    return function (e) {
      console.log(id, payload);
      setEditId(id);
      if (!!payload) return null;
      if (payload.phone) setPhone(payload.phone);
      if (payload.customer) setCustomer(payload.customer);
      if (payload.greeting) setGreeting(payload.greeting);
      if (payload.crewLead) setCrewLead(payload.crewLead);
      if (payload.company) setCompany(payload.company);
      if (payload.moveType) setMoveType(payload.moveType);
      if (payload.scheduledETA) setScheduledETA(payload.scheduledETA);
      if (payload.sms) setSms(payload.sms);
    };
  };

  function addSMS() {
    const payload = { phone, customer, greeting, crewLead, company, moveType, scheduledETA, sms };
    if (!!editId) {
      const tempId = editId;
      setEditId("");
      return firestore.collection("sms").doc(tempId).update(payload);
    }
    return firestore.collection("sms").add(payload);
  }

  useEffect(() => {
    setSms(
      `${greeting}${
        !!customer ? " " + customer : ""
      }, this is Arnas with ${company}. We'll be ${moveType} today. Our scheduled ETA is ${scheduledETA}. If you have any questions please text me or call me. `
    );
    return () => {};
  }, [phone, customer, greeting, crewLead, company, moveType, scheduledETA]);

  return (
    <>
      <div className="bg-gray-100 p-2 rounded-b-lg">
        <Input name="phone" Icon={Phone} value={phone} onChange={onChangePhone} placeholder="Text phone number" />

        <Input
          name="phone"
          Icon={DirectionsWalk}
          value={customer}
          onChange={onChangeCustomer}
          placeholder="Customer name"
        />
        <div className="bg-white mx-2 py-1 rounded-md">
          <ButtonSelect
            name="greeting"
            value={greeting}
            onClick={onChangeGreeting}
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
            onClick={onChangeMoveType}
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
            onClick={onChangeCompany}
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
    <div className="sidebar flex flex-col w-full">
      {sms.map(({ id, ...rest }, ind) => (
        <SMSLink key={`${id}-${ind}`} id={id} handleEdit={handleEdit} {...rest} />
      ))}
    </div>
  );
};

const SMSLink = (props) => {
  const { id, handleEdit, ...rest } = props;
  return (
    <div onClick={handleEdit(props.id, rest)}>
      {JSON.stringify(rest)}
      {props?.id}
    </div>
  );
};
