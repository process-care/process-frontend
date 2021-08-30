import { Box, Collapse, Container } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import IRoute from "interfaces/routes/route";
import { Menu } from "components/Menu/CreateForm";
import { ToolBox } from "components/CreateSurvey/CreateLanding/ToolBox";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { useAppSelector } from "redux/hooks";
import { useGetSurvey } from "api/actions/formBuider/survey";
import { useGetLanding } from "api/actions/Landing";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";

export const CreateLanding: React.FC<IRoute> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { id: surveyId } = useParams();
  const { preview_mode } = useAppSelector((state) => state.application);

  const { data: survey } = useGetSurvey(surveyId);
  const { data, isLoading, error } = useGetLanding(survey?.survey?.landing?.id);
  
  if (error) {
    return <Error error={error.message} />;
  }

  if (isLoading || data?.landing === undefined) {
    return <Loader />;
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
            <Menu isLanding />
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
                <Preview data={data.landing} />
              </div>
            </Container>
          </Box>
        </Box>
        <Collapse in={preview_mode !== "landing"} style={{ width: "32%" }}>
          <ToolBox data={data.landing} />
        </Collapse>
      </Box>
    </Box>
  );
};
