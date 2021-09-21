import React from "react";
import { Textarea } from ".";

interface Props {
  id: string;
  simpleMode?: boolean;
}

export const Wysiwyg: React.FC<Props> = ({ id }) => {
  return <Textarea label="" id={id} placeholder="" rows="large" />;
};
