'use client'

import { useEffect, useMemo } from "react";
import { Box, Collapse, Container } from "@chakra-ui/react";

import { client } from "@/api/gql-client.js"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import { actions, selectors } from "@/redux/slices/landing-editor.js"
import { useSurveyBySlugQuery } from "@/api/graphql/queries/survey.gql.generated.js"
import Menu from "@/components/Menu/CreateForm/index.tsx"
import ToolBox from "@/components/CreateSurvey/CreateLanding/ToolBox/index.tsx"
import Preview from "@/components/CreateSurvey/CreateLanding/Preview/index.tsx"
import Loader from "@/components/Spinner/index.tsx"
import Error from "@/components/Error/index.tsx"

// ---- TYPES

type Props = {
  params: {
    slug: string;
  };
};

// ---- COMPONENT

export default function CreateLanding({ params }: Props): JSX.Element {
  const { slug } = params
  const { isTablet } = useMediaQueries();
  const { previewMode } = useAppSelector((state) => state.application);

  const { data: survey } = useSurveyBySlugQuery(client, { slug });
  const landingId = survey?.surveys?.data[0]?.attributes?.landing?.data?.id;
  const surveyId = survey?.surveys?.data[0]?.id;

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectors.getLanding);
  const isLoading = useAppSelector(selectors.isLoading);
  const error = useAppSelector(selectors.error);

  // TODO: We could even do this effect when the user opens a side menu in the dashboard, so we "preload" the data
  useEffect(() => {
    if (!landingId) {
      console.warn("No landing ID to load.");
      return;
    }

    dispatch(actions.load(landingId));
  }, [dispatch, landingId]);

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!survey || !surveyId) return <Error error={"No survey found..."} />;

  return (
    <Box display="flex" justifyContent="space-between" w="100%">
      <Box w={previewMode === "landing" ? "100%" : "57%"} pos="relative" transition="all 400ms">
        <Box position="fixed" top="0" w="inherit" backgroundColor="white" zIndex="10">
          <Menu isLanding surveyId={surveyId} />
        </Box>

        <Box
          mt={previewMode !== "landing" ? "65px" : "0"}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          w="100%"
          p="0"
          transition="all 400ms"
        >
          <Preview data={data} isUserView={false} isPreview={Boolean(previewMode)} />
        </Box>
      </Box>

      <Collapse in={previewMode !== "landing"} style={{ width: "43%", transition: "all 400ms" }}>
        <ToolBox />
      </Collapse>
    </Box>
  );
};
