import { Flex, Button, ButtonGroup, Text } from "@chakra-ui/react";

interface Props {
  confirm: () => void;
  close: () => void;
  content: string;
}

export default function RemovingConfirmation({
  confirm,
  close,
  content,
}: Props): JSX.Element {
  return (
    <Flex
      backgroundColor="black"
      h="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Text fontSize="25px" color="white" mb={10}>
        {content}
      </Text>

      <ButtonGroup
        color="white"
        w="100%"
        display="flex"
        justifyContent="space-around"
        pos="absolute"
        bottom="30px"
      >
        <Button variant="link" color="white" onClick={() => close()}>
          Annuler
        </Button>
        
        <Button variant="roundedBlue" onClick={() => confirm()}>
          Oui
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
