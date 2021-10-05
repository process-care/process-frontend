import React, { useEffect } from "react";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { debounce } from "lodash";

import { Footer } from "./Template/Footer";
import { renderFormTemplate, renderFormValidationSchema } from "./utils";
import { fields } from "./Template/logic/initialValues";
import {
  setIsEditing,
  selectCondition,
  setIsRemoving,
} from "redux/slices/formBuilder";
import { actions } from "redux/slices/application";
import { Switch } from "components/Fields";
import { v4 as uuidv4 } from "uuid";
import { t } from "static/condition";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";
import {
  useGetQuestion,
  useUpdateQuestion,
} from "call/actions/formBuider/question";
import { useAddCondition } from "call/actions/formBuider/condition";
import ISurvey from "types/survey";
import { useQuestionChain } from "components/CreateSurvey/CreateForm/hooks";
import { selectors } from "redux/slices/formEditor/question-editor";

interface Props {
  survey: ISurvey | Record<string, any>;
}

const InputForm: React.FC<Props> = ({ survey }) => {
  const isEditing = useAppSelector((state) => state.formBuilder.is_editing);
  const selectedQuestion = useAppSelector(selectors.getSelectedQuestion);
  const selectedQuestionId = useAppSelector(selectors.getSelectedQuestionId);

  const { selected_input } = useAppSelector((state) => state.formBuilder);
  const type = selectedQuestion?.type;

  const dispatch = useAppDispatch();

  const { mutateAsync: updateQuestion } = useUpdateQuestion();
  const { mutateAsync: addCondition } = useAddCondition();
  const { deleteQuestionChain } = useQuestionChain(selectedQuestion, survey);
  const { data: currentQuestion } = useGetQuestion(selectedQuestionId);

  const handleDelete = async () => {
    if (!isEditing) {
      deleteQuestionChain();
    }
    dispatch(actions.toogleDrawer());
    dispatch(setIsEditing(false));
  };

  const autoSave = () => {
    dispatch(actions.setAutoSave());
    setTimeout(() => {
      dispatch(actions.setAutoSave());
    }, 2000);
  };
  const autoSaveDebounce = debounce(autoSave, 500);

  return (
    <Formik
      validationSchema={renderFormValidationSchema(selectedQuestion)}
      initialValues={selectedQuestion ? selectedQuestion : fields[type]}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        dispatch(actions.toogleDrawer());
      }}
    >
      {({ isValid, isSubmitting, values }) => {
        const onChange = (event: React.FormEvent<HTMLFormElement>) => {
          const target = event.target as HTMLFormElement;

          const is_repeated_fields = target.id.includes("options");

          if (is_repeated_fields) return false;

          if (target !== null) {
            updateQuestion({
              id: selectedQuestionId,
              data: {
                [target.id]: target.value,
              },
            });
          }
        };

        useEffect(() => {
          if (values.options) {
            updateQuestion({
              id: selectedQuestionId,
              data: {
                options: values.options,
              },
            });
          }
        }, [values.options]);

        return (
          <Form
            onChange={debounce((event) => onChange(event), 1000)}
            onBlur={autoSaveDebounce}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="30"
              flexDirection="column"
              px={10}
            >
              <Flex
                borderBottom="1px solid"
                borderColor="black"
                justifyContent="space-between"
                w="100%"
                pt={5}
                pb={1}
                mb={4}
                alignItems="start"
              >
                <Flex alignItems="center">
                  <InputIcon type={type} />
                  <Box ml={2}>
                    <Text variant="xsMedium">
                      {survey?.order?.findIndex(
                        (id: string) => id === selectedQuestionId
                      ) + 1}
                    </Text>
                    <Text variant="xs">Question {type}</Text>
                  </Box>
                </Flex>
                {type !== "wysiwyg" && (
                  <Flex flexDirection="column">
                    <Switch label="" id="required" size="sm" />
                    <Text variant="xsMedium">Réponse obligatoire</Text>
                  </Flex>
                )}
              </Flex>

              <Box mb={8}>{renderFormTemplate(selectedQuestion)}</Box>

              <Flex
                alignItems="center"
                w="100%"
                justifyContent="space-between"
                mt={5}
                pb="100px"
              >
                {currentQuestion?.question?.conditions?.length === 0 ? (
                  <Button
                    variant="link"
                    color="brand.blue"
                    onClick={() => {
                      addCondition({
                        type: "input",
                        referer_question: selected_input.id,
                        step: 1,
                        group: uuidv4(),
                        is_valid: false,
                      }).then((data: any) => {
                        dispatch(
                          selectCondition(data.createCondition.condition)
                        );
                        dispatch(actions.toogleDrawer());
                      });
                    }}
                  >
                    {t.add_condition}
                  </Button>
                ) : (
                  <Button
                    variant="link"
                    color="brand.blue"
                    onClick={() => {
                      dispatch(
                        selectCondition(
                          currentQuestion?.question?.conditions !== undefined
                            ? currentQuestion?.question?.conditions[0]
                            : {}
                        )
                      );
                      dispatch(actions.toogleDrawer());
                    }}
                  >
                    {t.edit_condition}
                  </Button>
                )}
              </Flex>

              <Footer
                onSubmit={() => console.log("submit")}
                disabled={!isValid || isSubmitting}
                onCancel={handleDelete}
                onDelete={() => {
                  dispatch(setIsRemoving(selected_input.id));
                  dispatch(actions.toogleDrawer());
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
