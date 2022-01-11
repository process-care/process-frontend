import React, { useCallback, useEffect, useState } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";

import { ParticipationMenu } from "./ParticipationMenu";
import { Page } from "./Form/Page";
import IPage from "types/form/page";
import { useGetSurvey } from "call/actions/survey";
import { useFinishParticipation } from "call/actions/participation";
import { useHistory } from "react-router-dom";
import { finishParticipation } from "./localstorage-handlers";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { actions } from "redux/slices/participation/status";
import { selectors } from "redux/slices/participation/page";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";

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
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetSurvey(surveyId);
  const pages = useAppSelector(selectors.selectShown);

  useEffect(() => {
    dispatch(actions.initialize({ surveyId, participationId }));
  }, [surveyId, participationId]);

  const {
    isFirstPage,
    isLastPage,
    selectedPage,
    nextPage,
    previousPage,
    selectIndex,
  } = useNavigationHandlers(pages);

  const { onFinish } = useFinishHandler(participationId, data?.survey.slug);

  // Missing data checks

  if (isLoading || !selectedPage)
    return (
      <Center>
        <Loader />
      </Center>
    );
  if (isError || !data?.survey)
    return (
      <Center>
        <Error message="Il n'y a pas de donnée sur le formulaire." />
      </Center>
    );

  // if ((pages?.length ?? 0) < 1 || !selectedPage)
  //   return <Box mt="60">No pages to display ! Contact the administrator !</Box>;

  const currentColor = data.survey.landing?.color_theme?.base || "black";
  const { order } = data.survey;

  return (
    <Box>
      <Flex direction="row" h="100vh">
        <Box w="20%">
          <ParticipationMenu
            author={data.survey.author?.email}
            pages={pages}
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
          <Page
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            currentColor={currentColor}
            previousPage={previousPage}
            nextPage={nextPage}
            onFinish={onFinish}
            pageId={selectedPage.id}
            participationId={participationId}
            order={order}
          />
        </Box>
      </Flex>
    </Box>
  );
};

// ---- HOOKS

function useFinishHandler(participationId: string, slug: string | undefined) {
  const history = useHistory();
  const { mutateAsync: finishParticipationApi } = useFinishParticipation();

  const onFinish = useCallback(async () => {
    // TODO: improve this with a better UI ?
    const acknowledge = confirm(" Conclure votre participation au projet ?");
    if (!acknowledge) return;

    // Tell the API we're done and wait for it to be saved
    await finishParticipationApi(participationId);

    finishParticipation(slug);
    history.push("/");
  }, [slug, participationId]);

  return {
    onFinish,
  };
}

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
