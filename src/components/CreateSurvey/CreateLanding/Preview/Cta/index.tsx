import React from "react";
import { Button } from "@chakra-ui/react";
import { ILanding } from "types/landing";
import { useMediaQueries } from "utils/hooks/mediaqueries";

interface Props {
  data?: Partial<ILanding>;
  onParticipate: () => void;
}

export const CtaMobil: React.FC<Props> = ({ data, onParticipate }) => {
  const { isTablet } = useMediaQueries();
  if (!isTablet) {
    return <></>;
  }
  return (
    <Button
      variant="rounded"
      backgroundColor={data?.color_theme?.button || "brand.blue"}
      color="white"
      onClick={onParticipate}
      position="fixed"
      w="100%"
      right="0"
      left="0"
      bottom="0"
      borderRadius="0"
      borderColor={data?.color_theme?.button || "brand.blue"}
    >
      Participer à l'étude
    </Button>
  );
};
