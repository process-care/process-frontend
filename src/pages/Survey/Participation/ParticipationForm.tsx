import React, { useCallback, useEffect, useState } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";

import { ParticipationMenu } from "./ParticipationMenu";
import { Page } from "./Form/Page";
import { useHistory } from "react-router-dom";
import { finishParticipation } from "./localstorage-handlers";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { actions } from "redux/slices/participation/status";
import {
  PageParticipationRedux,
  selectors,
} from "redux/slices/participation/page";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { client } from "api/gql-client";
import { useSurveyQuery } from "api/graphql/queries/survey.gql.generated";
import { useFinishParticipationMutation } from "api/graphql/queries/participation.gql.generated";
import { useMediaQueries } from "utils/hooks/mediaqueries";

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

  const { data, isLoading, isError } = useSurveyQuery(client, { id: surveyId });
  const pages = useAppSelector(selectors.selectShown);
  const attributes = data?.survey?.data?.attributes;
  const { isTablet } = useMediaQueries();
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

  const { onFinish } = useFinishHandler(participationId, attributes?.slug);

  // Missing data checks

  if (isLoading || !selectedPage)
    return (
      <Center>
        <Loader />
      </Center>
    );
  if (isError || !data)
    return (
      <Center>
        <Error message="Il n'y a pas de donnée sur le formulaire." />
      </Center>
    );

  const currentColor =
    attributes?.landing?.data?.attributes?.color_theme?.base || "black";
  const order = attributes?.order;

  const Title = () => {
    return (
      <Box
        pos="sticky"
        top="0"
        zIndex="10"
        backgroundColor={currentColor}
        p="20px"
        color="white"
        textAlign="left"
      >
        {attributes?.title}
      </Box>
    );
  };

  return (
    <Box>
      <Flex direction={isTablet ? "column" : "row"} h="100vh">
        {isTablet && <Title />}
        <Box w={isTablet ? "100%" : "20%"}>
          <ParticipationMenu
            author={attributes?.author?.data?.attributes?.email}
            pages={pages}
            selectIndex={selectIndex}
            color={currentColor}
            logo={attributes?.landing?.data?.attributes?.logo}
            selectedPage={selectedPage}
          />
        </Box>

        <Box
          flexGrow={1}
          backgroundColor="brand.gray.100"
          h="fit-content"
          minH="fit-content"
        >
          {!isTablet && <Title />}
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
  const { mutateAsync: finishParticipationApi } =
    useFinishParticipationMutation(client);

  const onFinish = useCallback(async () => {
    // TODO: improve this with a better UI ?
    const acknowledge = confirm(" Conclure votre participation au projet ?");
    if (!acknowledge) return;

    // Tell the API we're done and wait for it to be saved
    await finishParticipationApi({ id: participationId });

    finishParticipation(slug);
    history.push("/");
  }, [slug, participationId]);

  return {
    onFinish,
  };
}

function useNavigationHandlers(pages: PageParticipationRedux[] | undefined) {
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
