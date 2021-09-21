import React, { useCallback, useState } from "react";
import { Box, Button, Flex, Text, Circle } from "@chakra-ui/react";

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
  const currentColor = data.survey.landing?.color_theme?.base || "black";
  return (
    <Box>
      <Flex direction="row" h="100vh">
        <Box w="20%">
          <PageMenu
            author={data.survey.author?.email}
            pages={data.survey.pages}
            selectIndex={selectIndex}
            color={currentColor}
            logo={data.survey.landing?.logo}
            selectedPage={selectedPage}
          />
        </Box>

        <Box
          flexGrow={1}
          backgroundColor="brand.gray.100"
          h="fit-content"
          minH="100vh"
        >
          <Box
            pos="sticky"
            top="0"
            zIndex="10"
            backgroundColor={currentColor}
            p="20px"
            color="white"
            textAlign="left"
          >
            {data.survey.title}
          </Box>
          <FormPage
            pageId={selectedPage.id}
            participationId={participationId}
          />

          {/* Navigation */}
          <Flex justifyContent="flex-end" mt="10" mb="10" pr="10%">
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
              <Button
                variant="roundedBlue"
                backgroundColor={currentColor}
                onClick={nextPage}
              >
                {NL.button.next}
              </Button>
            )}
            {isLastPage && (
              <Button
                variant="roundedBlue"
                backgroundColor={currentColor}
                onClick={onFinish}
              >
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
  color: string;
  author: string | undefined;
  logo: string | undefined;
  selectedPage: IPage | undefined;
}

const PageMenu: React.FC<MenuProps> = ({
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
        {pages.map((p, idx) => (
          <PageEntry
            selectedPage={selectedPage}
            key={p.id}
            page={p}
            index={idx}
            selectIndex={selectIndex}
            color={color}
          />
        ))}
      </Box>
    </Box>
  );
};

// ENTRY

interface EntryProps {
  page: IPage;
  index: number;
  selectIndex: (index: number) => void;
  color: string;
  selectedPage: IPage | undefined;
}

const PageEntry: React.FC<EntryProps> = ({
  page,
  index,
  selectIndex,
  color,
  selectedPage,
}) => {
  const goTo = useCallback(() => {
    selectIndex(index);
  }, [index]);

  return (
    <Box
      _hover={{ cursor: "pointer" }}
      textAlign="left"
      fontSize="14px"
      onClick={goTo}
      mb="4"
      color={color}
      d="flex"
      alignItems="center"
      textDecoration={selectedPage?.id === page.id ? "underline" : "none"}
    >
      <Circle backgroundColor={color} w="10px" h="10px" mr="10px" />
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
