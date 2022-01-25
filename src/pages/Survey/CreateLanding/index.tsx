import { Box, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import IRoute from "types/routes/route";
import { Menu } from "components/Menu/CreateForm";
import { ToolBox } from "components/CreateSurvey/CreateLanding/ToolBox";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { actions, selectors } from "redux/slices/landing-editor";
import { client } from "api/gql-client";
import { useSurveyBySlugQuery } from "api/graphql/queries/survey.gql.generated";

export const CreateLanding: React.FC<IRoute> = () => {
  const { slug } = useParams<{ slug: string }>();
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
  }, [landingId]);

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!survey || !surveyId) return <Error error={"No survey found..."} />;

  return (
    <Box overflow="auto">
      <Box
        d="flex"
        justifyContent="space-between"
        w="100%"
        overflow="hidden"
        h="100%"
      >
        <Box w="57%" pos="relative">
          <Box
            position="fixed"
            top="0"
            w="inherit"
            backgroundColor="white"
            zIndex="10"
          >
            <Menu isLanding surveyId={surveyId} />
          </Box>
          <Box
            mt={previewMode !== "landing" ? "60px" : "0"}
            d="flex"
            justifyContent="space-around"
            overflow="hidden"
            w="100%"
            h="100%"
          >
            <Container
              variant="createformColumn"
              w="100%"
              h="100%"
              alignItems="center"
              p="0"
              d="flex"
            >
              <div className="background__grid--black">
                <Preview data={data} isUserView={false} />
              </div>
            </Container>
          </Box>
        </Box>
        {/* <Collapse in={previewMode !== "landing"} style={{ width: "32%" }}> */}
        <ToolBox />
        {/* </Collapse> */}
      </Box>
    </Box>
  );
};
