import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { IColor } from "types/landing";

interface Props {
  title?: string;
  logo?: string;
  color_theme?: IColor;
  onParticipate: () => void;
}

export const Header: React.FC<Props> = ({
  title,
  logo,
  color_theme,
  onParticipate,
}) => {
  return (
    <Flex justifyContent="space-between" p="5" alignItems="center">
      {!!logo && logo.length !== 0 && (
        <img src={logo} alt="Logo" style={{ maxHeight: "40px" }} />
      )}
      <Text variant="currentLight" textTransform="uppercase">
        {title}
      </Text>
      <Button
        variant="rounded"
        backgroundColor={color_theme?.button || "brand.blue"}
        color="white"
        onClick={onParticipate}
      >
        Participer à l'étude
      </Button>
    </Flex>
  );
};
