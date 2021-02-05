import React, { useReducer } from "react";
import { Input } from "./Input";
import {
  EmojiPeople,
  Email,
  Phone,
  Home,
  LocalShipping,
  CalendarToday,
  AccessTime,
  Clear,
} from "@material-ui/icons/";

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  };
};

const initialState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  originAddress: "",
  destinationAddress: "",
};

export const Client = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  const {
    fullName,
    phoneNumber,
    email,
    originAddress,
    destinationAddress,
  } = state;

  return (
    <div className="md:container md:mx-auto">
      <div className="px-10 w-full sm:w-1/2 mx-auto lg:w-1/3 flex-row ">
        <form action="" method="post">
          <h2>Personal Info</h2>
          <Input
            name="fullName"
            value={fullName}
            onChange={onChange}
            Icon={EmojiPeople}
            placeholder="Full Name"
          />
          <Input
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            Icon={Phone}
            placeholder="Phone Number"
            type="number"
          />
          <Input
            name="email"
            value={email}
            onChange={onChange}
            Icon={Email}
            placeholder="Email"
            type="email"
          />
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
        </form>
        <pre>{JSON.stringify(state, 0, 2)}</pre>
      </div>
    </div>
  );
};
