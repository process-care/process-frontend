import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

// import { fields } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/logic/initialValues";
import {
  selectCondition,
  selectInput,
  selectPage,
  setIsRemoving,
} from "redux/slices/formBuilder";
import { toogleDrawer } from "redux/slices/application";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";
import { Formik, Form } from "formik";
import { Switch, Textarea } from "components/Fields";
import IQuestion from "interfaces/form/question";
import { RemovingConfirmation } from "../../../RemovingConfirmation";
import { v4 as uuidv4 } from "uuid";
import { SvgHover } from "components/SvgHover";
import { ReactComponent as Trash } from "assets/trash.svg";
import { useDeletePage, useUpdatePage } from "api/actions/page";
import ISurvey from "interfaces/survey";
import { useAddQuestion, useUpdateQuestion } from "api/actions/question";
import { useAddCondition, useGetConditions } from "api/actions/condition";

interface Props {
  survey: ISurvey;
}

export const PageForm: React.FC<Props> = ({ survey }) => {
  const dispatch = useAppDispatch();
  const { selected_page, is_removing } = useAppSelector(
    (state) => state.formBuilder
  );
  const { mutate: deletePage } = useDeletePage("deletePage");
  const { mutate: updatePage } = useUpdatePage("updatePage");
  const { mutateAsync: addQuestion } = useAddQuestion("addQuestion");
  const { mutateAsync: updateQuestion } = useUpdateQuestion("updateQuestion");
  const { mutateAsync: addCondition } = useAddCondition("addCondition");
  const { data: conditions } = useGetConditions({
    id: selected_page?.id,
    type: "page",
  });

  const { pages } = survey;

  const isNotFirstPage =
    pages.findIndex((page) => page.id === selected_page.id) > 0;

  const isRemoving = is_removing === selected_page.id;

  const handleSelect = (
    type: IQuestion["type"],
    internal_title: string | undefined
  ) => {
    addQuestion({ type, internal_title, page: selected_page.id }).then(
      (data: any) => {
        const new_question = data.createQuestion.question;
        updateQuestion({
          id: new_question.id,
          data: {
            internal_title: `${new_question.type}-${new_question.id}`,
          },
        }).then((data: any) => {
          dispatch(selectInput(data.updateQuestion.question));
          dispatch(toogleDrawer());
        });
      }
    );
  };

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    if (target !== null) {
      updatePage({
        id: selected_page.id,
        data: {
          [target.id]:
            target.checked !== undefined ? target.checked : target.value,
        },
      });
    }
  };

  if (isRemoving) {
    return (
      <RemovingConfirmation
        height="100%"
        content={`${t.remove_page} ${selected_page.name} ?`}
        confirm={() => {
          deletePage(selected_page.id);
          dispatch(selectPage(pages[0]));
          dispatch(setIsRemoving(""));
        }}
        close={() => dispatch(setIsRemoving(""))}
      />
    );
  }

  return (
    <Box p={4}>
      <Formik
        validateOnBlur={false}
        initialValues={selected_page}
        enableReinitialize
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          dispatch(toogleDrawer());
        }}
      >
        {() => {
          return (
            <Form
              onChange={(event) => onChange(event)}
              style={{ width: "100%" }}
            >
              <Flex w="100%" justifyContent="space-between">
                {isNotFirstPage ? (
                  <Box
                    onClick={() => {
                      dispatch(setIsRemoving(selected_page.id));
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
                          referer_page: selected_page.id,
                          step: 1,
                          group: {
                            id: uuidv4(),
                            name: 1,
                          },
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
                        dispatch(selectCondition(conditions?.conditions[0]))
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
