import React from "react";

import { CommonFields, RepeatedFields } from "../index";

export const RadioboxFields: React.FC = () => {
  return (
    <>
      <CommonFields noPlacehoder />
      <RepeatedFields name="answers" />
    </>
  );
};
