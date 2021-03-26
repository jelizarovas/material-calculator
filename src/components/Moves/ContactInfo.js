import { Input } from "../Inputs/Input";
import { EmojiPeople, Email, Phone } from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { SectionTitle } from "../Layout/SectionTitle";

export const ContactInfo = (props) => {
  const move = useMove();
  const dispatch = useMoveDispatch();
  const { fullName, phoneNumber, email } = move;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });
  return (
    <>
      <SectionTitle title="Contact Info" hidePlus={true} />
      <Input name="fullName" value={fullName} onChange={onChange} Icon={EmojiPeople} placeholder="Full Name" />
      <Input
        name="phoneNumber"
        value={phoneNumber}
        onChange={onChange}
        Icon={Phone}
        placeholder="Phone Number"
        inputMode="numeric"
        type="tel"
      />
      <Input name="email" value={email} onChange={onChange} Icon={Email} placeholder="Email" type="email" />
    </>
  );
};

// TODO name parse field
// TODO phone number field show
// TODO phone number mask
// TODO add 2nd contact
// TODO add autocomplete @ email
