import { useMemo } from "react"
import { Box, useMediaQuery } from "@chakra-ui/react"

import { PageParticipationRedux } from "@/redux/slices/participation/page"
import SummaryMobile from "./SummaryMobile"
import PageEntry from "./PageEntry"

// ---- TYPES

type MenuProps = {
  pages: PageParticipationRedux[];
  selectIndex: (index: number) => void;
  color: string;
  author: string | undefined;
  selectedPage: PageParticipationRedux | undefined;
}

// ---- COMPONENT

export default function ParticipationMenu({ pages, selectIndex, color, selectedPage }: MenuProps): JSX.Element {
  const [isTablet] = useMediaQuery('(max-width: 1024px)')

  const navigables = useMemo(() => {
    let isBlocked = false;

    return pages.map((_p, idx) => {
      const prevIdx = idx === 0 ? 0 : idx - 1;
      // We can navigate to a page if:
      // first page (idx = 0) OR the previous page is submitable (= valid)
      // AND there is no unnavigable page already up the chain
      // |-> edge case like: P1 unvalid (accessible) P2 valid (not accessible) P3 (accessible).
      const isNavigable = ((pages[prevIdx].submitable ?? false) || idx === 0) && !isBlocked;

      if (!isNavigable) isBlocked = true;
      return isNavigable;
    });
  }, [pages])

  return (
    <Box
      display="flex"
      flexDirection={isTablet ? "row" : "column"}
      justifyContent="flex-end"
      alignItems="center"
      w="100%"
      mx="auto"
      paddingTop={isTablet ? "0" : "20px"}
      pos={isTablet ? "absolute" : "relative"}
      pr={isTablet ? "40px" : "unset"}
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
              color={'white'}
              isNavigable={navigables[idx]}
              selectedPageId={selectedPage?.id}
              selectIndex={selectIndex}
            />
          );
        })}
    </Box>
  )
}
