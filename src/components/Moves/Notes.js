import React from "react";
import { TextArea } from "../Inputs/TextArea";
import { SpeakerNotes } from "@material-ui/icons/";
import { useMove, useMoveDispatch } from "../Providers/MoveProvider";

export const Notes = () => {
  const client = useMove();
  const { notes } = client;
  const dispatch = useMoveDispatch();

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  return (
    <div>
      <TextArea name="notes" value={notes} onChange={onChange} Icon={SpeakerNotes} placeholder="Notes" />
    </div>
  );
};
