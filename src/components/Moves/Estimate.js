import React, { useEffect } from "react";
import { Lock, LockOpen } from "@material-ui/icons/";

import { useMove, useMoveDispatch } from "../Providers/MoveProvider";
import { SectionTitle } from "../Layout/SectionTitle";
// import { ButtonSelect } from "../Inputs/ButtonSelect";
import { SignButton } from "./SignButton";
import { Radio } from "../Inputs/Radio";

export const Estimate = () => {
  // const [hasSigned, setHasSigned] = useState(false);
  const client = useMove();
  const dispatch = useMoveDispatch();
  const {
    estimateIsBinding,
    /*agreedToEstimate, estimateAgreedDate,*/ bindingEstimateExists = true,
    estimateInitial,
  } = client;

  const onChange = (e) => dispatch({ field: e.target.name, value: e.target.value });

  const buttons = [
    {
      value: false,
      name: "Non Binding",
      Icon: LockOpen,
    },
    { value: true, name: "Binding", Icon: Lock, isDisabled: !bindingEstimateExists },
  ];

  useEffect(() => {
    if (estimateIsBinding === undefined)
      dispatch({
        field: "estimateIsBinding",
        value: false,
      });
  }, [estimateIsBinding, dispatch]);

  return (
    <>
      <SectionTitle title="Estimate" hidePlus={true} />
      <Radio onClick={onChange} name="estimateIsBinding" value={estimateIsBinding} options={buttons} row={true} />
      <SignButton label="initial" dispatch={dispatch} name="estimateInitial" value={estimateInitial} />
      {/* <div>
        <input
          name="agreedToEstimate"
          className="mr-5 ml-3"
          checked={agreedToEstimate}
          onChange={() => {
            dispatch({
              field: "agreedToEstimate",
              value: !agreedToEstimate,
            });
          }}
          placeholder="Total Valuation Cost"
          type="checkbox"
        />
        <label htmlFor="agreedToEstimate">Agreed to estimate?</label>
        {agreedToEstimate && (
          <Input
            name="estimateAgreedDate"
            value={estimateAgreedDate}
            onChange={onChange}
            Icon={EventAvailable}
            placeholder="Agreed Date"
          />
        )}
      </div> */}
    </>
  );
};

/* <pre>{JSON.stringify(client, 0, 2)}</pre> */
