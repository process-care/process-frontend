import { Box, Collapse, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import IRoute from "types/routes/route";
import { Menu } from "components/Menu/CreateForm";
import { ToolBox } from "components/CreateSurvey/CreateLanding/ToolBox";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useGetSurveyBySlug } from "call/actions/survey";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { actions, selectors } from "redux/slices/landing-editor";

export const CreateLanding: React.FC<IRoute> = () => {
  const { slug } = useParams<{ slug: string }>();
  const { previewMode } = useAppSelector((state) => state.application);

  const { data: survey } = useGetSurveyBySlug(slug);
  console.log(survey);
  const landingId = survey?.landing?.id;

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectors.landing);
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

  if (!survey) return <Error error={"No survey found..."} />;

  return (
    <Box overflow="auto">
      <Box
        d="flex"
        justifyContent="space-around"
        w="100%"
        overflow="hidden"
        h="100%"
      >
        <Box w="100%" pos="relative">
          <Box
            position="fixed"
            top="0"
            w="75.8%"
            backgroundColor="white"
            zIndex="10"
          >
            <Menu isLanding surveyId={survey.id} />
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
                <Preview data={data} />
              </div>
            </Container>
          </Box>
        </Box>
        <Collapse in={previewMode !== "landing"} style={{ width: "32%" }}>
          <ToolBox />
        </Collapse>
      </Box>
    </Box>
  );
};
