import React, { useEffect } from "react";
import { Input } from "./Input";
import { EmojiPeople, Email, Phone, Home, LocalShipping, AddLocation, SpeakerNotes } from "@material-ui/icons/";

import { useClient, useClientDispatch } from "./Providers/ClientProvider";
import { TextArea } from "./TextArea";

export const Client = () => {
  const client = useClient();
  const dispatch = useClientDispatch();
  const { fullName, phoneNumber, email, originAddress, destinationAddress, additionalStops, notes } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  useEffect(() => {
    document.title = fullName ? `${fullName} - move` : "Bill of Lading";
  }, [fullName]);

  // TODO when address autocomplete is done, if address not found
  // (most likely case of newly built house) allow entry of coordinates

  // TODO autocomplete address

  // TODO name parse field

  // TODO phone number field show

  // TODO phone number mask

  // TODO add 2nd contact

  // TODO add autocomplete @ email

  // TODO calculate distance as the crow flies

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
          <TextArea name="notes" value={notes} onChange={onChange} Icon={SpeakerNotes} placeholder="Notes" />
        </form>
      </div>
    </div>
  );
};
