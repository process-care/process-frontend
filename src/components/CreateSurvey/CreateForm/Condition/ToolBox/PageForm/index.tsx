import { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { Box, Button, Tooltip, Text } from "@chakra-ui/react"
import { Trash2Icon } from "lucide-react"

import { t } from "@/static/survey.ts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { setIsRemoving } from "@/redux/slices/formBuilder/index.ts"
import { actions as appActions } from "@/redux/slices/application/index.js"
import { actions, selectors } from "@/redux/slices/scientistData.js"
import { QuestionRedux } from "@/redux/slices/types/index.js"
import { Enum_Question_Rows } from "@/api/graphql/types.generated.ts"
import { Textarea } from "@/components/Fields/index.ts"
import TitleDivider from "@/components/TitleDivider/index.tsx"
import RemovingConfirmation from "../../../RemovingConfirmation/index.tsx"
import ToolBox from "../InputsButton/index.tsx"
import ButtonIcon from "@/components/ButtonIcon.tsx"

export default function PageForm(): JSX.Element {
  const dispatch = useAppDispatch()
  const { entityToRemove } = useAppSelector((state) => state.editor.form)

  const selectedPageId = useAppSelector(selectors.pages.getSelectedPageId)
  const selectedPage = useAppSelector(selectors.pages.selectSelectedPage)
  const questionsOnSelectedPage = useAppSelector(selectors.questions.selectSelectedPageQuestions)
    .map((question) => question.id)

  const isRemoving = entityToRemove === selectedPageId

  const handleDelete = async () => {
    dispatch(actions.deletePage(selectedPageId));
    // Need to delete question with dispatch here to get the chain working well (update order etc ...)
    questionsOnSelectedPage.forEach((questionId) => {
      dispatch(actions.deleteQuestion(questionId));
    });
    dispatch(setIsRemoving(""));
  };

  if (isRemoving && Boolean(selectedPageId)) {
    return (
      <RemovingConfirmation
        height="100vh"
        content={`${t.remove_page} ${selectedPage?.attributes?.name} ?`}
        confirm={handleDelete}
        close={() => dispatch(setIsRemoving(""))}
      />
    );
  }

  if (!selectedPage || !selectedPageId) {
    return <></>
  }

  return (
    <Box p={4} className="h-[100vh] overflow-auto">
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
        {({ setFieldValue, values }) => 
          <FormDisplay
            selectedPageId={selectedPageId}
            questionsOnSelectedPage={questionsOnSelectedPage}
            values={values}
            setFieldValue={setFieldValue}
          />
        }
      </Formik>
    </Box>
  );
};

// ---- SUB COMPONENT

interface FormDisplayProps {
  selectedPageId: string
  questionsOnSelectedPage: string[]
  values: any
  setFieldValue: any
}

function FormDisplay({ selectedPageId, questionsOnSelectedPage, values, setFieldValue }: FormDisplayProps): JSX.Element {
  const dispatch = useAppDispatch()
  const firstRender = useRef(true)

  const pages = useAppSelector(selectors.pages.selectPages)

  // const conditionsOnSelectedPage = selectedPage?.attributes?.conditions?.data;
  const conditionsOnSelectedPage = useAppSelector(selectors.conditions.selectAllPagesConditions)
    .filter((c) => c?.attributes?.referer_page?.data?.id === selectedPageId)

  // Auto update the page when the user change the name
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    const { short_name, name, is_locked } = values
    dispatch(
      actions.updatePage({
        id: selectedPageId,
        changes: {
          attributes: { short_name, name, is_locked },
        },
      })
    )
  // In this case, we don't want to update the page when we change the selected page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, values])

  const handleSelect = (type: QuestionRedux["attributes"]["type"]) => {
    dispatch(actions.setSelectedQuestion(""));
    dispatch(actions.createQuestion({ type }));
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

  const isNotFirstPage = pages.findIndex((page) => page.id === selectedPageId) > 0
  const isLocked = values.is_locked

  return (
    <Form>
      <div className="flex flex-row justify-between items-center">
        <Text variant="baseline" fontWeight="bold" textAlign="left" _hover={{ cursor: "pointer" }}>
          Edition d&apos;une page
        </Text>

        {isNotFirstPage && (
          <Tooltip
            label="Cliquer ici pour supprimer la page séléctionnée"
            placement="right"
            shouldWrapChildren
          >
            <ButtonIcon
              type="plain"
              icon={Trash2Icon}
              onClick={() => dispatch(setIsRemoving(selectedPageId))}
            />
          </Tooltip>
        )}
      </div>
      
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

        <Box display="flex" justifyContent="space-between" mt="5">
          {isNotFirstPage ? (
            conditionsOnSelectedPage?.length === 0 ? (
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
                  size="sm"
                  onClick={() => createCondition()}
                >
                  {t.add_condition_page}
                </Button>
              </Tooltip>
            ) : (
              <Button
                variant="roundedTransparent"
                size="sm"
                onClick={() =>
                  editCondition((conditionsOnSelectedPage && conditionsOnSelectedPage[0]?.id) ?? "")
                }
              >
                {t.edit_condition}
              </Button>
            )
          ) : (
            <></>
          )}
          <Tooltip
            label={"Si la page est bloquée, l'utilisateur ne peut plus modifier le contenu enregistré"}
            placement="right"
          >
            <Button
              ml={isNotFirstPage ? "5" : "0"}
              size="sm"
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
        <ToolBox onSelect={handleSelect} />
      </Box>
    </Form>
  )
}