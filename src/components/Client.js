import React from "react";
import { Input } from "./Input";
import { EmojiPeople, Email, Phone, Home, LocalShipping, AddLocation, SpeakerNotes } from "@material-ui/icons/";

import { useClient, useClientDispatch } from "./Providers/ClientProvider";

export const Client = () => {
  const client = useClient();
  const dispatch = useClientDispatch();
  const { fullName, phoneNumber, email, originAddress, destinationAddress, additionalStops, notes } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  return (
    <div className="md:container md:mx-auto">
      <div className="px-10 w-full sm:w-1/2 mx-auto lg:w-1/2 flex-row ">
        <form action="" method="post">
          <h2>Personal Info</h2>
          <Input name="fullName" value={fullName} onChange={onChange} Icon={EmojiPeople} placeholder="Full Name" />
          <Input
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            Icon={Phone}
            placeholder="Phone Number"
            type="number"
          />
          <Input name="email" value={email} onChange={onChange} Icon={Email} placeholder="Email" type="email" />
          <h2>Locations</h2>
          <Input
            name="originAddress"
            value={originAddress}
            onChange={onChange}
            Icon={Home}
            placeholder="Starting Point (Origin)"
          />
          <Input
            name="destinationAddress"
            value={destinationAddress}
            onChange={onChange}
            Icon={LocalShipping}
            placeholder="End Point (Destination)"
          />
          <Input
            name="additionalStops"
            value={additionalStops}
            onChange={onChange}
            Icon={AddLocation}
            placeholder="Other Stops"
          />
          <Input name="notes" value={notes} onChange={onChange} Icon={SpeakerNotes} placeholder="Notes" />
        </form>
        {/* <pre>{client && JSON.stringify(client, 0, 2)}</pre> */}
      </div>
    </div>
  );
};
