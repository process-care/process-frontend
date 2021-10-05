import { Box, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import InputsPreview from "components/CreateSurvey/CreateForm/InputsPreview";
import IRoute from "types/routes/route";
import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/CreateForm/PageBuilder";
import { Menu } from "components/Menu/CreateForm";

import { useAppSelector } from "redux/hooks";

import { ConditionPreview } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview";
import { RightPart } from "components/Layout/RightPart";
import { Error } from "components/Error";
import { Banner } from "components/Banner";
import { useDispatch } from "react-redux";
import { actions as actionsPage } from "redux/slices/formEditor/page-editor";
import { selectors as selectorsMySurveys } from "redux/slices/my-surveys";
import {
  selectors as selectorSurvey,
  actions as actionsSurvey,
} from "redux/slices/formEditor/selected-survey";

export const CreateForm: React.FC<IRoute> = () => {
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug }: { slug: string } = useParams();
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.application.drawerIsOpen);
  const selectedSurvey = useAppSelector(selectorSurvey.getSelectedSurvey);
  const error = useAppSelector(selectorsMySurveys.error);
  const { selected_condition } = useAppSelector((state) => state.formBuilder);

  useEffect(() => {
    Boolean(selectedSurvey) && dispatch(actionsSurvey.initialize(slug));

    dispatch(actionsPage.initialize(slug));
  }, [slug]);

  if (error) {
    return <Error error={error} />;
  }

  if (!selectedSurvey) {
    return <div>No Survey</div>;
  }

  return (
    <Box h="100vh" overflow="hidden">
      <Drawer
        isOpen={isOpen}
        size="md"
        content={<InputForm survey={selectedSurvey} />}
      />
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box w="100%">
          <Menu surveyId={selectedSurvey.id} />
          <Banner />
          <Box
            d="flex"
            justifyContent="space-around"
            overflow="hidden"
            w="100%"
          >
            <Container
              variant="createformColumn"
              w="6%"
              minW="100px"
              borderRight="1px"
              borderColor="gray.200"
            >
              <PageBuilder survey={selectedSurvey} />
            </Container>

            <Container
              variant="createformColumn"
              w="94%"
              alignItems="center"
              p="0"
            >
              <div className="background__grid">
                {selected_condition?.id !== undefined ? (
                  <ConditionPreview />
                ) : (
                  <InputsPreview
                    order={selectedSurvey.order}
                    surveyId={selectedSurvey.id}
                  />
                )}
              </div>
            </Container>
          </Box>
        </Box>
        <RightPart selected_condition={selected_condition} />
      </Box>
    </Box>
  );
};
