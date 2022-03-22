import React, { useCallback, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { PageParticipationRedux } from "redux/slices/participation/page";

import { useMediaQueries } from "utils/hooks/mediaqueries";
import { SummaryMobile } from "./SummaryMobile";
import { ArrowForwardIcon } from "@chakra-ui/icons";

// MENU

interface MenuProps {
  pages: PageParticipationRedux[];
  selectIndex: (index: number) => void;
  color: string;
  author: string | undefined;
  logo: string | null | undefined;
  selectedPage: PageParticipationRedux | undefined;
}

export const ParticipationMenu: React.FC<MenuProps> = ({ pages, selectIndex, color, logo, selectedPage }) => {
  const { isTablet } = useMediaQueries();

  const navigables = useMemo(() => {
    let isBlocked = false;

    return pages.map((p, idx) => {
      const prevIdx = idx === 0 ? 0 : idx - 1;
      // We can navigate to a page if:
      // first page (idx = 0) OR the previous page is submitable (= valid)
      // AND there is no unnavigable page already up the chain
      // |-> edge case like: P1 unvalid (accessible) P2 valid (not accessible) P3 (accessible)
      const isNavigable = ((pages[prevIdx].submitable ?? false) || idx === 0) && !isBlocked;

      if (!isNavigable) isBlocked = true;
      return isNavigable;
    });
  }, [pages]);

  return (
    <Box
      h={isTablet ? "60px" : "unset"}
      d="flex"
      alignItems="center"
      flexDirection={isTablet ? "row" : "column"}
      w="100%"
      p="0 20px"
    >
      <Box
        d="flex"
        flexDirection={isTablet ? "row" : "column"}
        justifyContent={logo?.length === 0 ? "flex-end" : "space-between"}
        alignItems="center"
        w="100%"
        mx="auto"
      >
        {isTablet && (
          <SummaryMobile
            pages={pages}
            navigables={navigables}
            color={color}
            selectedPage={selectedPage}
            selectIndex={selectIndex}
          />
        )}

        {!isTablet &&
          pages.map((p, idx) => {
            return (
              <PageEntry
                key={p.id}
                index={idx}
                page={p}
                color={color}
                isNavigable={navigables[idx]}
                selectedPageId={selectedPage?.id}
                selectIndex={selectIndex}
              />
            );
          })}
      </Box>
    </Box>
  );
};

// ENTRY

interface EntryProps {
  index: number;
  page: PageParticipationRedux;
  color: string;
  isNavigable: boolean;
  selectedPageId: string | undefined;
  selectIndex: (index: number) => void;
}

export const PageEntry: React.FC<EntryProps> = ({ index, page, isNavigable, selectedPageId, selectIndex }) => {
  const isSelected = selectedPageId === page.id;

  const goTo = useCallback(() => {
    if (!isNavigable) return;
    selectIndex(index);
  }, [index, isNavigable]);

  return (
    <Box
      _hover={{ cursor: isNavigable || isSelected ? "pointer" : "not-allowed" }}
      onClick={goTo}
      color="white"
      fontWeight={isSelected ? "bold" : "normal"}
      w="100%"
      textAlign="left"
      d="flex"
      alignItems="center"
      mb="5px"
    >
      {isSelected && <ArrowForwardIcon />}
      <Text variant="smallTitle" fontWeight={isSelected ? "bold" : "normal"} ml="5px">
        {page.attributes.name ?? "Short name missing 😣"}
      </Text>
    </Box>
  );
};
