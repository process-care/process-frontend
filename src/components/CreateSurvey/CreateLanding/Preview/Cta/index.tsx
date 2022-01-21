import React from "react";
import { Button } from "@chakra-ui/react";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { LandingRedux } from "redux/slices/types";

interface Props {
  data?: LandingRedux;
  onParticipate: () => void;
}

export const CtaMobil: React.FC<Props> = ({ data, onParticipate }) => {
  const { isMobile } = useMediaQueries();
  if (!isMobile) {
    return <></>;
  }
  return (
    <Button
      variant="rounded"
      backgroundColor={data?.attributes?.color_theme?.button || "brand.blue"}
      color="white"
      onClick={onParticipate}
      position="fixed"
      w="100%"
      right="0"
      left="0"
      bottom="0"
      borderRadius="0"
    >
      Participer à l'étude
    </Button>
  );
};
