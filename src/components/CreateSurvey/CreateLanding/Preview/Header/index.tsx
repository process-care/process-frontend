import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { IColors, ILanding } from "interfaces/landing";

interface Props {
  theme: IColors;
  logo: ILanding["logo"];
}

export const Header: React.FC<Props> = ({ theme, logo }) => {
  console.log(logo);
  return (
    <Flex justifyContent="space-between" p="5" alignItems="center">
      {/* {logo !== undefined && (
        <img src={logo?.base64} alt="Logo" style={{ maxHeight: "40px" }} />
      )} */}
      <Text variant="currentLight" textTransform="uppercase">
        Recherche sur l'euphorie
      </Text>
      <Button variant="rounded" backgroundColor={theme?.button} color="white">
        Participer à l'étude
      </Button>
    </Flex>
  );
};
