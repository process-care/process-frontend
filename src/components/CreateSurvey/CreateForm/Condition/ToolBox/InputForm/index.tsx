import React from "react";

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
import { toogleDrawer } from "redux/slices/application";
import { Switch } from "components/Fields";
import { v4 as uuidv4 } from "uuid";
import { t } from "static/condition";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";
import {
  useDeleteQuestion,
  useGetQuestion,
  useUpdateQuestion,
} from "call/actions/formBuider/question";
import { useAddCondition } from "call/actions/formBuider/condition";
import ISurvey from "types/survey";
import { useUpdateOrder } from "call/actions/survey";

interface Props {
  survey: ISurvey;
}

const InputForm: React.FC<Props> = ({ survey }) => {
  const { selected_input } = useAppSelector((state) => state.formBuilder);
  const { mutate: updateQuestion } = useUpdateQuestion();
  const { mutate: deleteQuestion } = useDeleteQuestion();
  const { mutateAsync: addCondition } = useAddCondition();
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const { data: currentQuestion } = useGetQuestion(selected_input.id);

  const { type } = selected_input;

  const isEditing = useAppSelector((state) => state.formBuilder.is_editing);
  const dispatch = useAppDispatch();

  const onCancel = () => {
    if (!isEditing) {
      deleteQuestion(selected_input.id);
      updateOrder({
        id: survey.id,
        new_order: survey?.order.filter(
          (id: string) => id !== selected_input.id
        ),
      });
    }

    dispatch(toogleDrawer());
    dispatch(setIsEditing(false));
  };

  return (
    <Formik
      validateOnBlur={false}
      validationSchema={renderFormValidationSchema(selected_input)}
      initialValues={selected_input ? selected_input : fields[type]}
      onSubmit={(data, { setSubmitting, validateForm }) => {
        validateForm(data);
        setSubmitting(true);
        dispatch(toogleDrawer());
      }}
    >
      {({ isValid, isSubmitting, values }) => {
        const onChange = (event: React.FormEvent<HTMLFormElement>) => {
          const target = event.target as HTMLFormElement;

          const is_repeated_fields = target.id.includes("option");

          if (is_repeated_fields) return false;

          if (target !== null) {
            updateQuestion({
              id: selected_input.id,
              data: {
                [target.id]: target.value,
              },
            });
          }
        };

        // Handle repeated fields change
        React.useEffect(() => {
          updateQuestion({
            id: selected_input.id,
            data: {
              answers: values.option,
            },
          });
        }, [values.option]);

        // Handle wysiwyg change
        React.useEffect(() => {
          updateQuestion({
            id: selected_input.id,
            data: {
              wysiwyg: values.wysiwyg,
            },
          });
        }, [values.wysiwyg]);

        // Handle select change
        React.useEffect(() => {
          updateQuestion({
            id: selected_input.id,
            data: {
              freeclassification_responses_count:
                values.freeclassification_responses_count,
            },
          });
        }, [values.freeclassification_responses_count]);

        return (
          <Form onChange={debounce((event) => onChange(event), 1000)}>
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
                  <InputIcon type={selected_input.type} />
                  <Box ml={2}>
                    <Text variant="xsMedium">
                      {survey?.order?.findIndex(
                        (id: string) => id === selected_input.id
                      ) + 1}
                    </Text>
                    <Text variant="xs">Question {selected_input.type}</Text>
                  </Box>
                </Flex>
                {selected_input.type !== "wysiwyg" && (
                  <Flex flexDirection="column">
                    <Switch label="" id="required" size="sm" />
                    <Text variant="xsMedium">Réponse obligatoire</Text>
                  </Flex>
                )}
              </Flex>

              <Box mb={8}>{renderFormTemplate(selected_input)}</Box>

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
                        dispatch(toogleDrawer());
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
                      dispatch(toogleDrawer());
                    }}
                  >
                    {t.edit_condition}
                  </Button>
                )}
              </Flex>

              <Footer
                onSubmit={() => console.log("submit")}
                disabled={!isValid || isSubmitting}
                onCancel={() => onCancel()}
                onDelete={() => {
                  dispatch(setIsRemoving(selected_input.id));
                  dispatch(toogleDrawer());
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
