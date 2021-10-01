import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

// import { fields } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/logic/initialValues";
import {
  selectCondition,
  selectInput,
  setIsRemoving,
} from "redux/slices/formBuilder";
import { actions as actionsApplication } from "redux/slices/application";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";
import { Formik, Form } from "formik";
import { Switch, Textarea } from "components/Fields";
import IQuestion from "types/form/question";
import { RemovingConfirmation } from "../../../RemovingConfirmation";
import { v4 as uuidv4 } from "uuid";
import { SvgHover } from "components/SvgHover";
import { ReactComponent as Trash } from "assets/trash.svg";
import ISurvey from "types/survey";
import {
  useAddQuestion,
  useUpdateQuestion,
} from "call/actions/formBuider/question";
import {
  useAddCondition,
  useGetConditions,
} from "call/actions/formBuider/condition";
import { useUpdateOrder } from "call/actions/survey";
import { getNewOrder } from "./utils";
import { debounce } from "lodash";
import { actions, selectors } from "redux/slices/page-editor";

interface Props {
  survey: ISurvey;
}

export const PageForm: React.FC<Props> = ({ survey }) => {
  const dispatch = useAppDispatch();
  const { is_removing } = useAppSelector((state) => state.formBuilder);

  const selectedPageId = useAppSelector(selectors.getSelectedPageId);
  const selectedPage = useAppSelector(selectors.getSelectedPage);

  const { mutateAsync: addQuestion } = useAddQuestion();
  const { mutateAsync: updateQuestion } = useUpdateQuestion();
  const { mutateAsync: addCondition } = useAddCondition();
  const { mutateAsync: updateOrder } = useUpdateOrder();
  const { data: conditions } = useGetConditions({
    id: selectedPageId,
    type: "page",
  });

  const { pages } = survey;

  const isNotFirstPage =
    pages.findIndex((page) => page.id === selectedPageId) > 0;

  const isRemoving = is_removing === selectedPageId;

  const handleSelect = (
    type: IQuestion["type"],
    internal_title: string | undefined
  ) => {
    addQuestion({ type, internal_title, page: selectedPageId }).then(
      (data: any) => {
        const new_question: IQuestion = data.createQuestion.question;
        updateOrder({
          id: survey.id,
          new_order: getNewOrder(survey, selectedPageId, new_question.id),
        });
        updateQuestion({
          id: new_question.id,
          data: {
            internal_title: `${new_question.type}-${new_question.id}`,
          },
        }).then((data: any) => {
          dispatch(selectInput(data.updateQuestion.question));
          dispatch(actionsApplication.toogleDrawer());
        });
      }
    );
  };

  const autoSave = () => {
    dispatch(actionsApplication.setAutoSave());
    setTimeout(() => {
      dispatch(actionsApplication.setAutoSave());
    }, 2000);
  };
  const autoSaveDebounce = debounce(autoSave, 500);

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    dispatch(
      actions.update({
        id: selectedPageId,
        changes: {
          [target.id]:
            target.checked !== undefined ? target.checked : target.value,
        },
      })
    );
  };

  const handleDelete = async () => {
    dispatch(actions.delete(selectedPageId));
    dispatch(setIsRemoving(""));
  };

  if (isRemoving && Boolean(selectedPageId)) {
    return (
      <RemovingConfirmation
        height="100%"
        content={`${t.remove_page} ${selectedPage?.name} ?`}
        confirm={handleDelete}
        close={() => dispatch(setIsRemoving(""))}
      />
    );
  }

  return (
    <Box p={4}>
      <Formik
        validateOnBlur={false}
        initialValues={selectedPage ? selectedPage : {}}
        enableReinitialize
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          dispatch(actionsApplication.toogleDrawer());
        }}
      >
        {() => {
          return (
            <Form
              onBlur={autoSaveDebounce}
              onChange={(event) => onChange(event)}
              style={{ width: "100%" }}
            >
              <Flex w="100%" justifyContent="space-between">
                {isNotFirstPage ? (
                  <Box
                    onClick={() => {
                      dispatch(setIsRemoving(selectedPageId));
                    }}
                  >
                    <SvgHover>
                      <Trash />
                    </SvgHover>
                  </Box>
                ) : (
                  <Box mt={10} />
                )}
                <Box
                  d="flex"
                  flexDirection="column"
                  pt="14px"
                  justifyContent="flex-end"
                >
                  <Box position="absolute" right="-10px" top="30px">
                    <Switch size="sm" id="is_locked" label="" />
                  </Box>

                  <Text variant="xxs" mt="1">
                    Page non modifiable
                  </Text>
                </Box>
              </Flex>

              <Box pt={10}>
                <Textarea
                  id="name"
                  label="Nom de la page"
                  rows="small"
                  placeholder="Page 1"
                  helpText="100 signes maximum"
                />
                <Textarea
                  id="short_name"
                  label="Nom court pour la navigation rapide"
                  rows="small"
                  placeholder="Page 1"
                  helpText="40 signes maximum"
                />
                <ToolBox onSelect={(type, name) => handleSelect(type, name)} />
              </Box>

              {isNotFirstPage && (
                <Flex
                  alignItems="center"
                  w="100%"
                  justifyContent="space-between"
                  mt={5}
                >
                  {conditions?.conditions?.length === 0 ? (
                    <Button
                      variant="link"
                      color="brand.blue"
                      onClick={() => {
                        addCondition({
                          type: "page",
                          referer_page: selectedPageId,
                          step: 1,
                          group: uuidv4(),
                          is_valid: false,
                        }).then((data: any) =>
                          dispatch(
                            selectCondition(data.createCondition.condition)
                          )
                        );
                      }}
                    >
                      {t.add_condition_page}
                    </Button>
                  ) : (
                    <Button
                      variant="link"
                      color="brand.blue"
                      onClick={() =>
                        dispatch(
                          selectCondition(
                            conditions?.conditions !== undefined
                              ? conditions?.conditions[0]
                              : {}
                          )
                        )
                      }
                    >
                      {t.edit_condition}
                    </Button>
                  )}
                </Flex>
              )}
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
