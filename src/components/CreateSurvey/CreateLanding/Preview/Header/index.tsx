import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { IColors } from "interfaces/landing";

interface Props {
  theme: IColors;
  logo: string;
}

export const Header: React.FC<Props> = ({ theme, logo }) => {
  console.log(logo.length);
  return (
    <Flex justifyContent="space-between" p="5" alignItems="center">
      {!!logo && logo.length !== 0 && (
        <img src={logo} alt="Logo" style={{ maxHeight: "40px" }} />
      )}
      <Text variant="currentLight" textTransform="uppercase">
        Recherche sur l'euphorie
      </Text>
      <Button variant="rounded" backgroundColor={theme?.button} color="white">
        Participer à l'étude
      </Button>
    </Flex>
  );
};
