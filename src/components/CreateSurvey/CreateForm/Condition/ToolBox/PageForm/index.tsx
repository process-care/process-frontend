import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { setIsRemoving } from "redux/slices/formBuilder";
import { actions as appActions } from "redux/slices/application";
import { actions, selectors } from "redux/slices/scientistData";

import { Box, Button, Flex, Tooltip, Text } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";
import { Formik, Form } from "formik";
import { Textarea } from "components/Fields";
import { QuestionRedux } from "redux/slices/types";
import { RemovingConfirmation } from "../../../RemovingConfirmation";
import { SvgHover } from "components/SvgHover";
import { ReactComponent as Trash } from "assets/trash.svg";
import { TitleDivider } from "components/TitleDivider";
import { Enum_Question_Rows } from "api/graphql/types.generated";

export const PageForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { entityToRemove } = useAppSelector((state) => state.editor.form);
  const firstRender = useRef(true);

  const selectedPageId = useAppSelector(selectors.pages.getSelectedPageId);
  const selectedPage = useAppSelector(selectors.pages.getSelectedPage);
  const pages = useAppSelector(selectors.pages.getPages);
  const questionsOnSelectedPage = useAppSelector(selectors.questions.getSelectedPageQuestions).map(
    (question) => question.id
  );
  const conditionsOnSelectedPage = useAppSelector(selectors.conditions.getSelectedPageConditions);

  const isNotFirstPage = pages.findIndex((page) => page.id === selectedPageId) > 0;

  const isRemoving = entityToRemove === selectedPageId;

  const handleSelect = (type: QuestionRedux["attributes"]["type"]) => {
    dispatch(actions.setSelectedQuestion(""));
    dispatch(actions.createQuestion({ type }));
  };

  const handleDelete = async () => {
    dispatch(actions.deletePage(selectedPageId));
    // Need to delete question with dispatch here to get the chain working well (update order etc ...)
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
        content={`${t.remove_page} ${selectedPage?.attributes?.name} ?`}
        confirm={handleDelete}
        close={() => dispatch(setIsRemoving(""))}
      />
    );
  }

  if (!selectedPage || !selectedPageId) {
    return <></>;
  }

  return (
    <Box p={4}>
      <Formik
        validateOnBlur={false}
        initialValues={selectedPage["attributes"]}
        enableReinitialize
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          dispatch(appActions.toogleDrawer());
        }}
      >
        {({ setFieldValue, values }) => {
          useEffect(() => {
            if (firstRender.current) {
              firstRender.current = false;
              return;
            }
            dispatch(
              actions.updatePage({
                id: selectedPageId,
                changes: {
                  id: selectedPageId,
                  attributes: {
                    short_name: values.short_name,
                    name: values.name,
                    is_locked: values.is_locked,
                  },
                },
              })
            );
          }, [values]);

          const isLocked = values.is_locked;

          return (
            <Form>
              <Flex w="100%" justifyContent="flex-end">
                {isNotFirstPage ? (
                  <Box
                    onClick={() => {
                      dispatch(setIsRemoving(selectedPageId));
                    }}
                  >
                    <Tooltip
                      label="Cliquer ici pour supprimer la page séléctionnée"
                      placement="right"
                      shouldWrapChildren
                    >
                      <SvgHover>
                        <Trash />
                      </SvgHover>
                    </Tooltip>
                  </Box>
                ) : (
                  <Box mt={5} />
                )}
              </Flex>

              <Text variant="baseline" fontWeight="bold" textAlign="left" _hover={{ cursor: "pointer" }}>
                Edition d'une page
              </Text>
              <TitleDivider title="Informations de la page" mt="5" />
              <Box w="100%" m="0 auto" border="1px solid #F7F7F7F7" backgroundColor="#fdfdfdf1" p="5">
                <Textarea
                  id="name"
                  label="Nom de la page"
                  rows={Enum_Question_Rows.Small}
                  placeholder="Page 1"
                  helpText="100 signes maximum"
                  isRequired
                />
                <Textarea
                  id="short_name"
                  label="Nom court pour la navigation rapide"
                  rows={Enum_Question_Rows.Small}
                  placeholder="Page 1"
                  helpText="40 signes maximum"
                  isRequired
                />

                <Box d="flex" justifyContent="space-between" mt="5">
                  {isNotFirstPage &&
                    (conditionsOnSelectedPage.length === 0 ? (
                      <Tooltip
                        label={
                          questionsOnSelectedPage.length === 0
                            ? "Merci d'ajouter une question pour conditionner la page"
                            : "Cliquer pour ajouter une condtion sur la page courante"
                        }
                        placement="right"
                        shouldWrapChildren
                      >
                        <Button
                          disabled={questionsOnSelectedPage.length === 0}
                          variant="roundedTransparent"
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore: Pb with props in theme ...
                          isSmall
                          onClick={() => createCondition()}
                        >
                          {t.add_condition_page}
                        </Button>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="roundedTransparent"
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore: Pb with props in theme ...
                        isSmall
                        onClick={() => editCondition(conditionsOnSelectedPage?.[0].id)}
                      >
                        {t.edit_condition}
                      </Button>
                    ))}
                  <Tooltip
                    label={"Si la page est bloquée, l'utilisateur ne peut plus modifier le contenu enregistré"}
                    placement="right"
                  >
                    <Button
                      ml={isNotFirstPage ? "5" : "0"}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore: Pb with props in theme ...
                      isSmall
                      variant={isLocked ? "rounded" : "roundedTransparent"}
                      onClick={() => setFieldValue("is_locked", !values.is_locked)}
                    >
                      {isLocked
                        ? "Autoriser la modification après validation"
                        : "Interdire la modification après validation"}
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
              <TitleDivider title="Contenu de la page" />
              <Box w="100%" m="0 auto" border="1px solid #F7F7F7F7" p="5" backgroundColor="#fdfdfdf1">
                <ToolBox onSelect={(type) => handleSelect(type)} />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
