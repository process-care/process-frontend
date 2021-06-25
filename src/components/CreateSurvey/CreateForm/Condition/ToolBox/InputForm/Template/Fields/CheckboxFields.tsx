import React from "react";

import { CommonFields, RepeatedFields } from "../index";

export const CheckboxFields: React.FC = () => {
  return (
    <>
      <CommonFields noPlacehoder />
      <RepeatedFields name="options" />
    </>
  );
};
