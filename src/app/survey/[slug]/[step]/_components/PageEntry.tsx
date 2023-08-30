import { useCallback } from "react";
import { Box, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { PageParticipationRedux } from "@/redux/slices/participation/page";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";

// ---- TYPES

type Props = {
  index: number;
  page: PageParticipationRedux;
  color: string;
  isNavigable: boolean;
  selectedPageId: string | undefined;
  selectIndex: (index: number) => void;
}

// ---- COMPONENT

export default function PageEntry({
  index,
  page,
  isNavigable,
  selectedPageId,
  selectIndex,
  color
}: Props): JSX.Element {
  const isSelected = selectedPageId === page.id;
  const { isTablet } = useMediaQueries();

  const goTo = useCallback(() => {
    if (!isNavigable) return;
    selectIndex(index);
  }, [index, isNavigable, selectIndex]);

  return (
    <Box
      _hover={{ cursor: isNavigable || isSelected ? "pointer" : "not-allowed" }}
      onClick={goTo}
      color={isTablet ? color : "white"}
      fontWeight={isSelected ? "bold" : "normal"}
      w="100%"
      textAlign="left"
      display="flex"
      alignItems="center"
      mb="5px"
    >
      {isSelected && <ArrowForwardIcon />}
      <Text variant={isTablet ? "current" : "smallTitle"} fontWeight={isSelected ? "bold" : "normal"} ml="5px">
        {page.attributes.name ?? "Short name missing 😣"}
      </Text>
    </Box>
  );
};