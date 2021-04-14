import { AccessTime, CreditCard, DirectionsWalk, Phone } from "@material-ui/icons";
import React, { useState } from "react";
import { ButtonSelect } from "../Inputs/ButtonSelect";
import { Input } from "../Inputs/Input";

export const MakeText = () => {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState("");
  const [greeting, setGreeting] = useState("Good morning");
  const [crewLead, setCrewLead] = useState("Arnas");
  const [company, setcompany] = useState("Paramount Transportation Systems");
  const onChangePhone = (e) => setPhone(e.target.value);
  const onChangeCustomer = (e) => setCustomer(e.target.value);
  const onChangeGreeting = (e) => setGreeting(e.target.value);

  return (
    <div>
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
          ]}
        />
      </div>
      <div className="eta-window"></div>

      <div className="bg-white p-10 my-2 rounded-lg">{`${greeting} ${customer}, this is Arnas with ${company}`}</div>
    </div>
  );
};
