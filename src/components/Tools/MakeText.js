import { AccessTime, CreditCard, DirectionsWalk, Phone } from "@material-ui/icons";
import React, { useState } from "react";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { Input } from "../Inputs/Input";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const MakeText = () => {
  let query = useQuery();

  const [phone, setPhone] = useState(query.get("p") || query.get("phone") || "");
  const [customer, setCustomer] = useState(query.get("n") || query.get("name") || "");
  const [greeting, setGreeting] = useState(isNowAMPM() === "AM" ? "Good Morning" : "Good afternoon");
  const [crewLead, setCrewLead] = useState("Arnas");
  const [company, setCompany] = useState("Paramount Transportation Systems");
  const [moveType, setMoveType] = useState("delivering");
  const [scheduledETA, setScheduledETA] = useState("1 p.m. to 4 p.m.");
  const onChangePhone = (e) => setPhone(e.target.value);
  const onChangeCustomer = (e) => setCustomer(e.target.value);
  const onChangeGreeting = (e) => setGreeting(e.target.value);
  const onChangeCompany = (e) => setCompany(e.target.value);
  const onChangeScheduledETA = (e) => setScheduledETA(e.target.value);
  const onChangeMoveType = (e) => setMoveType(e.target.value);

  return (
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

      <div className="bg-white p-10 my-2 rounded-lg">{`${greeting} ${customer}, this is Arnas with ${company}. We'll be ${moveType} today. Our scheduled ETA is ${scheduledETA}. Please do not hesitate to text me or call me if you have any questions. `}</div>
      <button className="bg-green-500 text-white p-2 px-4 rounded-md" type="submit">
        Send text
      </button>
    </div>
  );
};

function isNowAMPM() {
  return new Date().getHours() >= 12 ? "PM" : "AM";
}
