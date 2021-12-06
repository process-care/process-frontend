import React from "react";

import { CommonFields } from "../index";
import { AssociatedSubfields } from "./AssociatedSubfields";

export const AssociatedClassification: React.FC = () => {
  return (
    <>
      <CommonFields noPlacehoder />
      <AssociatedSubfields name="options" />
    </>
  );
};
