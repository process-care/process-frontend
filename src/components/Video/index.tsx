import ReactPlayer from "react-player"

interface Props {
  url: string;
}

export default function Video({ url }: Props): JSX.Element {
  return <ReactPlayer url={url} width="100%" />;
};
