import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

// import { fields } from "components/CreateSurvey/CreateForm/Condition/ToolBox/InputForm/Template/logic/initialValues";
import {
  addCondition,
  selectCondition,
  selectConditonInCurrentPage,
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
import { getConditionsByRefererId } from "utils/formBuilder/condition";
import { SvgHover } from "components/SvgHover";
import { ReactComponent as Trash } from "assets/trash.svg";
import { useDeletePage, useUpdatePage } from "api/actions/page";
import ISurvey from "interfaces/survey";
import { useAddQuestion } from "api/actions/question";

interface Props {
  survey: ISurvey;
}

export const PageForm: React.FC<Props> = ({ survey }) => {
  const dispatch = useAppDispatch();
  const { mutate: deletePage } = useDeletePage("deletePage");
  const { mutate: updatePage } = useUpdatePage("updatePage");
  const { mutate: addQuestion, data } = useAddQuestion("addQuestion");
  const new_question_id = data?.createQuestion.question.id;

  const { pages } = survey;
  const { selected_page, is_removing } = useAppSelector(
    (state) => state.formBuilder
  );

  // Wait for create id to select input.
  React.useEffect(() => {
    if (new_question_id !== undefined) {
      dispatch(selectInput(new_question_id));
    }
  }, [new_question_id]);

  // TO REFACTO
  const conditions = useAppSelector(selectConditonInCurrentPage);

  const isNotFirstPage =
    pages.findIndex((page) => page.id === selected_page.id) > 0;

  const isRemoving = is_removing === selected_page.id;

  const condition_id = uuidv4();

  const handleSelect = (
    type: IQuestion["type"],
    name: string,
    id: string,
    internal_title: string | undefined
  ) => {
    if (id) {
      // const datas = {
      //   ...fields[type],
      //   type,
      //   name,
      //   id,
      //   internal_title,
      //   page: selected_page.id,
      // };

      addQuestion({ type, internal_title, page: selected_page.id });
      dispatch(toogleDrawer());
    }
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
                <ToolBox
                  onSelect={(type, name, id, internal_title) =>
                    handleSelect(type, name, id, internal_title)
                  }
                />
              </Box>

              {isNotFirstPage && (
                <Flex
                  alignItems="center"
                  w="100%"
                  justifyContent="space-between"
                  mt={5}
                >
                  {conditions.length === 0 ? (
                    <Button
                      variant="link"
                      color="brand.blue"
                      onClick={() => {
                        dispatch(
                          addCondition({
                            id: condition_id,
                            type: "page",
                            referer_id: selected_page.id,
                            step: 1,
                            group: {
                              id: uuidv4(),
                              name: 1,
                            },
                            is_valid: false,
                          })
                        );
                        dispatch(
                          selectCondition({
                            id: condition_id,
                          })
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
                          selectCondition({
                            id: getConditionsByRefererId(selected_page.id)[0]
                              .id,
                          })
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
