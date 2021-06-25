import React from "react";
import ReactPlayer from "react-player";

interface Props {
  url: string;
}

export const Video: React.FC<Props> = ({ url }) => {
  return <ReactPlayer url={url} width="100%" />;
};
