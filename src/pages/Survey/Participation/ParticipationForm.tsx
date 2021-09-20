import React, { useCallback, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

import IPage from "types/form/page";
import { useGetSurvey } from "call/actions/survey";
import { FormPage } from "./Form/FormPage";
import { NL } from "./nl";
import { useFinishParticipation } from "call/actions/participation";
import { useHistory } from "react-router-dom";

// ---- TYPES

interface Props {
  surveyId: string;
  participationId: string;
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
    selectIndex,
  } = useNavigationHandlers(pages);

  // TODO: we use the survey Id, but should we use the slug ?
  const { onFinish } = useFinishHandler(participationId, surveyId);

  // Missing data checks
  if (!data?.survey) return <Box mt="60">No data for this survey</Box>;
  if ((pages?.length ?? 0) < 1 || !selectedPage)
    return <Box mt="60">No pages to display ! Contact the administrator !</Box>;

  console.log(data);
  return (
    <Box>
      <Box
        backgroundColor={data.survey.landing?.color_theme?.base || "black"}
        p="20px"
        color="white"
        textAlign="left"
      >
        {data.survey.title}
      </Box>

      <Flex direction="row">
        <Box w="20%" p="40px">
          <PageMenu pages={data.survey.pages} selectIndex={selectIndex} />
        </Box>

        <Box pt="6" flexGrow={1} backgroundColor="brand.gray.100">
          <FormPage
            pageId={selectedPage.id}
            participationId={participationId}
          />

          {/* Navigation */}
          <Flex justifyContent="flex-end" mr="60" mt="10">
            {!isFirstPage && (
              <Button
                mr="4"
                variant="roundedTransparent"
                onClick={previousPage}
              >
                {NL.button.previous}
              </Button>
            )}
            {!isLastPage && (
              <Button variant="roundedBlue" onClick={nextPage}>
                {NL.button.next}
              </Button>
            )}
            {isLastPage && (
              <Button variant="roundedBlue" onClick={onFinish}>
                {NL.button.finish}
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

// ---- SUB COMPONENTS

// MENU

interface MenuProps {
  pages: IPage[];
  selectIndex: (index: number) => void;
}

const PageMenu: React.FC<MenuProps> = ({ pages, selectIndex }) => {
  return (
    <>
      {pages.map((p, idx) => (
        <PageEntry key={p.id} page={p} index={idx} selectIndex={selectIndex} />
      ))}
    </>
  );
};

// ENTRY

interface EntryProps {
  page: IPage;
  index: number;
  selectIndex: (index: number) => void;
}

const PageEntry: React.FC<EntryProps> = ({ page, index, selectIndex }) => {
  const goTo = useCallback(() => {
    selectIndex(index);
  }, [index]);

  return (
    <Box textAlign="left" fontSize="14px" onClick={goTo} mb="4">
      {page.short_name}
    </Box>
  );
};

// ---- HOOKS

function useNavigationHandlers(pages: IPage[] | undefined) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedPage = pages?.[selectedIdx];

  const onNavigate = useCallback(
    (direction: DIRECTION) => {
      let newIdx;
      const nbPages = pages?.length ?? 0;

      if (direction === DIRECTION.Next) {
        const up = selectedIdx + 1;
        newIdx = up > nbPages ? nbPages : up;
      } else {
        const down = selectedIdx - 1;
        newIdx = down < 0 ? 0 : down;
      }

      setSelectedIdx(newIdx);
    },
    [pages?.length, selectedIdx]
  );

  const nextPage = useCallback(() => onNavigate(DIRECTION.Next), [onNavigate]);
  const previousPage = useCallback(
    () => onNavigate(DIRECTION.Previous),
    [onNavigate]
  );

  return {
    isFirstPage: selectedIdx === 0,
    isLastPage: selectedIdx + 1 === pages?.length,
    selectedPage,
    selectIndex: setSelectedIdx,
    nextPage,
    previousPage,
  };
}

function useFinishHandler(participationId: string, slug: string) {
  const history = useHistory();
  const { mutateAsync: finishParticipation } = useFinishParticipation();

  const onFinish = useCallback(async () => {
    const acknowledge = confirm(" Conclure votre participation à l'enquête ?");
    if (!acknowledge) return;

    const res = await finishParticipation(participationId);
    console.log("response for finish call: ", res);

    finishParticipation(slug);
    history.push("/");
  }, [slug, participationId]);

  return {
    onFinish,
  };
}
