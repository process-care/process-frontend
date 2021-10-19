import React, { useCallback } from "react";
import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import { ReduxPage } from "redux/slices/participation/page";

import IPage from "types/form/page";

// MENU

interface MenuProps {
  pages: ReduxPage[];
  selectIndex: (index: number) => void;
  color: string;
  author: string | undefined;
  logo: string | undefined;
  selectedPage: IPage | undefined;
}

export const ParticipationMenu: React.FC<MenuProps> = ({
  pages,
  selectIndex,
  color,
  author,
  logo,
  selectedPage,
}) => {
  return (
    <Box pos="sticky" top="0">
      <Flex
        textAlign="right"
        py="19.5px"
        px="20px"
        borderBottom="1px solid"
        borderColor={color}
        alignItems="center"
        justifyContent="space-between"
      >
        {!!logo && logo.length !== 0 ? (
          <img src={logo} alt="Logo" style={{ maxHeight: "30px" }} />
        ) : (
          <Box minH="30px" />
        )}
        <Text textDecoration="underline" variant="xs">
          <a href={`mailto: ${author}`}>{author}</a>
        </Text>
      </Flex>
      <Box p="20px">
        {pages.map((p, idx) => {
          const prevIdx = (idx === 0) ? 0 : idx - 1;
          const isNavigable = (pages[prevIdx].submitable ?? false) || idx === 0;

          return (
            <PageEntry
              key={p.id}
              index={idx}
              page={p}
              color={color}
              isNavigable={isNavigable}
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
  page: ReduxPage;
  color: string;
  isNavigable: boolean;
  selectedPageId: string | undefined;
  selectIndex: (index: number) => void;
}

const PageEntry: React.FC<EntryProps> = ({
  index,
  page,
  color,
  isNavigable,
  selectedPageId,
  selectIndex,
}) => {
  const isSelected = selectedPageId === page.id;

  const goTo = useCallback(() => {
    if (!isNavigable) return;
    selectIndex(index);
  }, [index, isNavigable]);

  return (
    <Box
      _hover={{ cursor: (isNavigable || isSelected) ? "pointer" : "not-allowed" }}
      textAlign="left"
      fontSize="14px"
      onClick={goTo}
      mb="4"
      color={color}
      d="flex"
      alignItems="center"
      textDecoration={isSelected ? "underline" : "none"}
    >
      <Circle backgroundColor={color} w="10px" h="10px" mr="10px" />
      {page.short_name}
    </Box>
  );
};