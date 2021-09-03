import { Box, Button, Center, Collapse, Container } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import IRoute from "types/routes/route";
import { Menu } from "components/Menu/CreateForm";
import { ToolBox } from "components/CreateSurvey/CreateLanding/ToolBox";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { useAppSelector } from "redux/hooks";
import { useGetSurvey, useUpdateSurvey } from "call/actions/survey";
import { useAddLanding, useGetLanding } from "call/actions/landing";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";

export const CreateLanding: React.FC<IRoute> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug: surveyId } = useParams();
  const { preview_mode } = useAppSelector((state) => state.application);
  const { mutateAsync: addLanding } = useAddLanding();
  const { mutateAsync: updateSurvey } = useUpdateSurvey();

  const { data: survey } = useGetSurvey(surveyId);
  const {
    data: landing,
    isLoading,
    error,
  } = useGetLanding(survey?.survey?.landing?.id);

  const createLanding = async () => {
    const landing: Record<string, any> = await addLanding({
      title: survey?.survey.title,
      survey: surveyId,
    });

    // update survey with landing id.
    await updateSurvey({
      id: surveyId,
      data: { landing: landing.createLanding.landing.id },
    });
  };

  if (error) {
    return <Error error={error.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (landing?.landing === undefined) {
    return (
      <Center h="100vh">
        <Button onClick={createLanding} h="400px" w="30%">
          Create Landing
        </Button>
      </Center>
    );
  }
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
            <Menu isLanding surveyId={surveyId} />
          </Box>
          <Box
            mt={preview_mode !== "landing" ? "60px" : "0"}
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
                <Preview data={landing.landing} />
              </div>
            </Container>
          </Box>
        </Box>
        <Collapse in={preview_mode !== "landing"} style={{ width: "32%" }}>
          <ToolBox data={landing.landing} />
        </Collapse>
      </Box>
    </Box>
  );
};
