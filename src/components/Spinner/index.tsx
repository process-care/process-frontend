import { Spinner, Center } from "@chakra-ui/react";

export default function Loader(): JSX.Element {
  return (
    <Center h="40vh">
      <Spinner size="xs" />
    </Center>
  );
};
