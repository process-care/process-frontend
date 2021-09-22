import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/landing-editor";

interface Props {
  onParticipate: () => void
}

export const Header: React.FC<Props> = ({ onParticipate }) => {
  const data = useAppSelector(selectors.headerData);
  
  if (!data) return <div>Something went wrong with the state of the app...</div>

  const { title, logo, color_theme } = data;

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
