import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { setIsRemoving } from "redux/slices/formBuilder";
import { actions as appActions } from "redux/slices/application";
import { actions, selectors } from "redux/slices/scientistData";

import { Box, Button, Flex } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";
import { Formik, Form } from "formik";
import { Textarea } from "components/Fields";
import IQuestion from "types/form/question";
import { RemovingConfirmation } from "../../../RemovingConfirmation";
import { SvgHover } from "components/SvgHover";
import { ReactComponent as Trash } from "assets/trash.svg";
import { TitleDivider } from "components/TitleDivider";

export const PageForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { entityToRemove } = useAppSelector((state) => state.editor.form);

  const selectedPageId = useAppSelector(selectors.pages.getSelectedPageId);
  const selectedPage = useAppSelector(selectors.pages.getSelectedPage);
  const pages = useAppSelector(selectors.pages.getAllPages);
  const questionsOnSelectedPage = useAppSelector(
    selectors.questions.getSelectedPageQuestions
  ).map((question) => question.id);
  const conditionsOnSelectedPage = useAppSelector(
    selectors.conditions.getSelectedPageConditions
  );

  const isNotFirstPage =
    pages.findIndex((page) => page.id === selectedPageId) > 0;

  const isRemoving = entityToRemove === selectedPageId;

  const handleSelect = (type: IQuestion["type"]) => {
    dispatch(actions.setSelectedQuestion(""));
    dispatch(actions.createQuestion({ type }));
  };

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    dispatch(
      actions.updatePage({
        id: selectedPageId,
        changes: {
          [target.id]:
            target.checked !== undefined ? target.checked : target.value,
        },
      })
    );
  };

  const handleDelete = async () => {
    dispatch(actions.deletePage(selectedPageId));
    // Need to delete question with dispatch here to get the chain working well (update order etc ...)
    // TODO: Maybe i can create an epic to dispatch all actions at once
    questionsOnSelectedPage.forEach((questionId) => {
      dispatch(actions.deleteQuestion(questionId));
    });
    dispatch(setIsRemoving(""));
  };

  const createCondition = () => {
    dispatch(actions.setSelectedQuestion(""));
    dispatch(
      actions.createCondition({
        type: "page",
        refererId: selectedPageId,
      })
    );
  };

  const editCondition = (id: string) => {
    dispatch(actions.setSelectedCondition(id));
    dispatch(actions.setValidityCondition(true));
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
          dispatch(appActions.toogleDrawer());
        }}
      >
        {() => {
          return (
            <Form onChange={(event) => onChange(event)}>
              <Flex w="100%" justifyContent="flex-end">
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
                  <Box mt={5} />
                )}
                {/* <Box
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
                </Box> */}
              </Flex>
              <TitleDivider title="Informations de la page" mt="5" />
              <Box w="90%" m="0 auto" backgroundColor="brand.gray" p="5">
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

                <Box d="flex" justifyContent="flex-end" mt="5">
                  {isNotFirstPage &&
                    (conditionsOnSelectedPage.length === 0 ? (
                      <Button
                        variant="roundedTransparent"
                        onClick={() => createCondition()}
                      >
                        {t.add_condition_page}
                      </Button>
                    ) : (
                      <Button
                        variant="roundedTransparent"
                        onClick={() =>
                          editCondition(conditionsOnSelectedPage?.[0].id)
                        }
                      >
                        {t.edit_condition}
                      </Button>
                    ))}
                  {/* TODO: Implement logic from line 131 */}

                  <Button ml="5" variant="roundedTransparent">
                    Bloquer la page
                  </Button>
                </Box>
              </Box>
              <TitleDivider title="Contenu de la page" />
              <Box w="90%" m="0 auto" backgroundColor="brand.gray" p="5">
                <ToolBox onSelect={(type) => handleSelect(type)} />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
