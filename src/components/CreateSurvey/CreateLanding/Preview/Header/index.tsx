import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Color } from "types/landing";
import { useMediaQueries } from "utils/hooks/mediaqueries";

interface Props {
  title?: string;
  logo?: string;
  color_theme?: Color;
  onParticipate: () => void;
}

export const Header: React.FC<Props> = ({ title, logo, color_theme, onParticipate }) => {
  const { isTablet } = useMediaQueries();
  return (
    <Flex
      justifyContent="space-between"
      p={isTablet ? "2" : "5"}
      alignItems="center"
      position="sticky"
      top="0px"
      backgroundColor="white"
      borderBottom="1px solid #e6e6e6"
    >
      {!!logo && logo.length !== 0 && (
        <img
          src={logo}
          alt="Logo"
          style={{
            maxHeight: isTablet ? "25px" : "40px",
            marginRight: isTablet ? "15px" : "unset",
          }}
        />
      )}
      <Text
        variant={isTablet ? "smallTitle" : "currentLight"}
        textTransform={isTablet ? "initial" : "uppercase"}
        noOfLines={1}
        isTruncated={isTablet}
      >
        {title}
      </Text>
      {!isTablet && (
        <Button
          variant="rounded"
          backgroundColor={color_theme?.button || "brand.blue"}
          color="white"
          onClick={onParticipate}
        >
          Participer à l'étude
        </Button>
      )}
    </Flex>
  );
};
