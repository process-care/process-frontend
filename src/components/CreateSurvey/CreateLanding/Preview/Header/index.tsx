import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { IColor } from "types/landing";
import { useMediaQueries } from "utils/hooks/mediaqueries";

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
  const { isMobile } = useMediaQueries();
  return (
    <Flex
      justifyContent="space-between"
      p={isMobile ? "2" : "5"}
      alignItems="center"
    >
      {!!logo && logo.length !== 0 && (
        <img
          src={logo}
          alt="Logo"
          style={{
            maxHeight: isMobile ? "25px" : "40px",
            marginRight: isMobile ? "15px" : "unset",
          }}
        />
      )}
      <Text
        variant={isMobile ? "smallTitle" : "currentLight"}
        textTransform={isMobile ? "initial" : "uppercase"}
        noOfLines={1}
        isTruncated={isMobile}
      >
        {title}
      </Text>
      {!isMobile && (
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
