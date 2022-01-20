import React, { useEffect, useState, useCallback } from "react";

import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { Footer } from "./Template/Footer";
import {
  getDiff,
  removeEmpty,
  renderFormTemplate,
  renderFormValidationSchema,
} from "./utils";
import { fields } from "./Template/logic/initialValues";
import { setIsRemoving } from "redux/slices/formBuilder";

import { t } from "static/condition";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";
import { selectors, actions } from "redux/slices/scientistData";
import { actions as appActions } from "redux/slices/application";

import {
  selectors as formBuilderSelectors,
  actions as formBuilderAction,
} from "redux/slices/formBuilder";
import { TitleDivider } from "components/TitleDivider";
import { getQuestionName } from "constants/inputs";
import { InfoIcon } from "@chakra-ui/icons";

import { Input, Textarea } from "components/Fields";

interface Props {
  order: string[];
}

const InputForm: React.FC<Props> = ({ order }) => {
  const dispatch = useAppDispatch();
  const currentConditions = useAppSelector(
    selectors.conditions.getSelectedQuestionsConditions
  );
  const isEditing = useAppSelector(formBuilderSelectors.isEditing);
  const selectedQuestion = useAppSelector(
    selectors.questions.getSelectedQuestion
  );
  const selectedQuestionId = useAppSelector(
    selectors.questions.getSelectedQuestionId
  );
  const [prevState, setPrevState] =
    useState<Record<string, any>>(selectedQuestion);

  const type = selectedQuestion?.type;

  const handleCancel = async () => {
    if (!isEditing) {
      dispatch(actions.deleteQuestion(selectedQuestionId));
    } else {
      dispatch(appActions.toogleDrawer());
      dispatch(
        actions.updateQuestion({
          id: selectedQuestionId,
          changes: prevState,
        })
      );
    }
    dispatch(formBuilderAction.setIsEditing(false));
    dispatch(actions.setSelectedQuestion(""));
  };

  // Save state to get diff
  useEffect(() => {
    setPrevState(prevState);
  }, [selectedQuestionId]);

  const handleSubmit = useCallback((data, { setSubmitting, validateForm }) => {
    validateForm(data);
    setSubmitting(true);
    dispatch(actions.saveQuestion({ changes: data }));
    setSubmitting(false);
  }, []);

  const createCondition = () => {
    dispatch(
      actions.createCondition({
        type: "question",
        refererId: selectedQuestionId,
      })
    );
    dispatch(appActions.toogleDrawer());
  };

  const editCondition = (id: string) => {
    dispatch(actions.setSelectedCondition(id));
    dispatch(actions.setValidityCondition(true));
    dispatch(appActions.toogleDrawer());
  };

  if (!selectedQuestion) {
    return <> </>;
  }

  console.log(removeEmpty(selectedQuestion));
  return (
    <Formik
      validateOnBlur
      validationSchema={renderFormValidationSchema(selectedQuestion)}
      initialValues={
        selectedQuestion ? removeEmpty(selectedQuestion) : fields[type]
      }
      onSubmit={handleSubmit}
    >
      {({ isValid, isSubmitting, values, setFieldValue }) => {
        useEffect(() => {
          const newChanges = getDiff(values, selectedQuestion);
          if (values) {
            dispatch(
              actions.updateQuestion({
                id: selectedQuestionId,
                changes: {
                  ...newChanges,
                },
              })
            );
          }
        }, [values]);

        return (
          <Form>
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="30"
              flexDirection="column"
              px={5}
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                mt="5"
              >
                <Tooltip
                  placement="right"
                  label={`Description du champs ${getQuestionName(
                    type
                  )} lorem dsqdsqdqsdqsdqsdqsdqsdqsd`}
                >
                  <Box d="flex" alignItems="center">
                    <Text
                      variant="baseline"
                      fontWeight="bold"
                      textAlign="left"
                      _hover={{ cursor: "pointer" }}
                    >
                      {isEditing ? "Edition" : "Création"} d'une{" "}
                      {getQuestionName(type)}
                    </Text>
                    <InfoIcon color="gray.300" ml="4" mt="-2" w="3" h="3" />
                  </Box>
                </Tooltip>

                <Flex ml={2} alignItems="center">
                  <InputIcon type={type} />

                  <Text variant="xsMedium" ml="3">
                    {order?.findIndex(
                      (id: string) => id === selectedQuestionId
                    ) + 1}
                  </Text>
                </Flex>
              </Flex>
              <TitleDivider title="Paramètres de la question" mt="3" />
              <Box
                w="100%"
                m="0 auto"
                border="1px solid #F7F7F7F7"
                p="5"
                backgroundColor="#fdfdfdf1"
              >
                <Textarea
                  isCollapsed={false}
                  rows="medium"
                  label="Label"
                  placeholder="Renseigner le label de votre question"
                  id="label"
                  isRequired="true"
                />
                <Input
                  isCollapsed={false}
                  label="Id dans la base de donnée"
                  placeholder="Renseigner le nom interne de votre question"
                  name="internal_title"
                  helpText="Ce champ vous permet de donner un titre à la question,il n'est pas visible par les utilisateurs."
                  isRequired="false"
                  isAccordion
                />
                <Flex mb="4" mt="4" w="100%" justifyContent="space-between">
                  {currentConditions.length === 0 ? (
                    <Button
                      variant="roundedTransparent"
                      onClick={() => createCondition()}
                    >
                      {t.add_condition}
                    </Button>
                  ) : (
                    <Button
                      variant="roundedTransparent"
                      onClick={() => editCondition(currentConditions[0].id)}
                    >
                      {t.edit_condition}
                    </Button>
                  )}
                  {type !== "wysiwyg" && (
                    <Button
                      ml="5"
                      variant={
                        values?.required ? "rounded" : "roundedTransparent"
                      }
                      onClick={() =>
                        setFieldValue("required", !values.required)
                      }
                    >
                      {values?.required
                        ? "Rendre la réponse obligatoire"
                        : "Rendre la réponse facultative"}
                    </Button>
                  )}
                </Flex>
              </Box>
              <Box w="100%" mb="100px">
                {renderFormTemplate(selectedQuestion)}
              </Box>

              <Footer
                w="100%"
                onSubmit={() => console.log("submit")}
                disabled={!isValid || isSubmitting}
                onCancel={handleCancel}
                onDelete={() => {
                  dispatch(setIsRemoving(selectedQuestionId));
                  dispatch(appActions.toogleDrawer());
                }}
              />
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputForm;
