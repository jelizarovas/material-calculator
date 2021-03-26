import React from "react";
import { SectionTitle } from "../Layout/SectionTitle";
import { SignButton } from "./SignButton";

export const Release = () => {
  return (
    <>
      <SectionTitle title="Release" hidePlus={true} />
      <p className="px-6 text-sm my-4">
        I have read and understand{" "}
        <a href="#" className="underline text-blue-600">
          this contract
        </a>
        , and release my household goods to the carrier subject to the terms and conditions of this contract.
      </p>
      <SignButton />
    </>
  );
};
