import React, { useCallback, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

import IPage from "types/form/page";
import { useGetSurvey } from "call/actions/survey";
import { FormPage } from "./Form/FormPage";
import { NL } from "./nl";

// ---- TYPES

interface Props {
  surveyId: string
  participationId: string
}

export enum DIRECTION {
  Next,
  Previous,
}

// ---- COMPONENT

export const ParticipationForm: React.FC<Props> = ({
  surveyId,
  participationId,
}) => {
  const { data } = useGetSurvey(surveyId);
  const pages = data?.survey.pages;

  const {
    isFirstPage,
    isLastPage,
    selectedPage,
    nextPage,
    previousPage,
    selectIndex
  } = useNavigationHandlers(pages);
  
  // Missing data checks
  if (!data?.survey) return <Box mt="60">No data for this survey</Box>;
  if ((pages?.length ?? 0) < 1 || !selectedPage) return <Box mt="60">No pages to display ! Contact the administrator !</Box>;

  return (
    <Box>
      <Box mt="6" mb="6">{data.survey.title}</Box>

      <Flex direction="row">
        <Box>
          <PageMenu pages={data.survey.pages} selectIndex={selectIndex} />
        </Box>

        <Box flexGrow={1}>
          <FormPage
            pageId={selectedPage.id}
            participationId={participationId}
          />

          {/* Navigation */}
          <Flex justifyContent="flex-end" mr="60" mt="10">
            {!isFirstPage && <Button mr="4" variant="roundedTransparent" onClick={previousPage}>{NL.button.previous}</Button>}
            {!isLastPage && <Button variant="roundedBlue" onClick={nextPage}>{NL.button.next}</Button>}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

// ---- SUB COMPONENTS

// MENU

interface MenuProps {
  pages: IPage[],
  selectIndex: (index: number) => void,
}

const PageMenu: React.FC<MenuProps> = ({ pages, selectIndex }) => {
  return (
    <>
      <div>|</div>
      <div>|</div>
      <div>---</div>
      { pages.map((p, idx) => (
        <PageEntry
          key={p.id}
          page={p}
          index={idx}
          selectIndex={selectIndex}
        />
      ))}
    </>
  );
}

// ENTRY

interface EntryProps {
  page: IPage,
  index: number,
  selectIndex: (index: number) => void,
}

const PageEntry: React.FC<EntryProps> = ({
  page,
  index,
  selectIndex,
}) => {
  const goTo = useCallback(() => {
    selectIndex(index);
  },[index]);

  return (
    <div onClick={goTo}>| {page.short_name}</div>
  )
}

// ---- HOOKS

function useNavigationHandlers(pages: IPage[] | undefined) {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const selectedPage = pages?.[selectedIdx];
  
    const onNavigate = useCallback((direction: DIRECTION) => {
      let newIdx;
      const nbPages = pages?.length ?? 0;
  
      if (direction === DIRECTION.Next) {
        const up = selectedIdx + 1;
        newIdx = (up > nbPages) ? nbPages : up;
      } else {
        const down = selectedIdx - 1;
        newIdx = (down < 0) ? 0 : down;
      }
      console.log('new idx: ', newIdx);
  
      setSelectedIdx(newIdx);
    }, [pages?.length, selectedIdx]);
  
    const nextPage = useCallback(() => onNavigate(DIRECTION.Next), [onNavigate]);
    const previousPage = useCallback(() => onNavigate(DIRECTION.Previous), [onNavigate]);

    return {
      isFirstPage: selectedIdx === 0,
      isLastPage: (selectedIdx + 1) === pages?.length,
      selectedPage,
      selectIndex: setSelectedIdx,
      nextPage,
      previousPage,
    }
}