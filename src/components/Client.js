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

export const Client = () => {
  return (
    <div className="md:container md:mx-auto">
      <div className="px-10 w-full sm:w-1/2 mx-auto lg:w-1/3 flex-row ">
        <h2>Personal Info</h2>
        <Input Icon={EmojiPeople} placeholder="Full Name" />
        <Input Icon={Phone} placeholder="Phone Number" type="number" />
        <Input Icon={Email} placeholder="Email" type="email" />
        <h2>Locations</h2>
        <Input Icon={Home} placeholder="Starting Point (Origin)" />
        <Input Icon={LocalShipping} placeholder="End Point (Destination)" />
      </div>
    </div>
  );
};
