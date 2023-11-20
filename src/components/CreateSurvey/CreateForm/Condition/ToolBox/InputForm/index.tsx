import { useEffect, useState, useCallback } from "react"
import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react"
import { InfoIcon } from "@chakra-ui/icons"
import { Formik, Form, useFormikContext } from "formik"

import { t } from "@/static/condition.ts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { getDiff, removeEmpty, renderFormTemplate, renderFormValidationSchema } from "./utils/index.tsx"
import { fields } from "./Template/logic/initialValues.ts"
import { setIsRemoving } from "@/redux/slices/formBuilder/index.ts"
import { selectors, actions } from "@/redux/slices/scientistData.js"
import { actions as appActions } from "@/redux/slices/application/index.js"
import { selectors as formBuilderSelectors, actions as formBuilderAction } from "@/redux/slices/formBuilder/index.ts"
import { getQuestionInfo, getQuestionName } from "@/constants/inputs.ts"
import { QuestionRedux } from "@/redux/slices/types/index.js"
import { Input, Textarea } from "@/components/Fields/index.ts"
import { Enum_Question_Rows, Enum_Question_Type, Question } from "@/api/graphql/types.generated.ts"
import Footer from "./Template/Footer/index.tsx"
import InputIcon from "@/components/CreateSurvey/CreateForm/InputIcon/index.tsx"
import TitleDivider from "@/components/TitleDivider/index.tsx"
import { noop } from "@/utils/commons.ts"

interface Props {
  order: string[]
}

export default function InputForm({ order }: Props): JSX.Element {
  const selectedQuestion = useAppSelector(selectors.questions.selectSelectedQuestion)
  const selectedQuestionId = useAppSelector(selectors.questions.getSelectedQuestionId)
  const isEditing = useAppSelector(formBuilderSelectors.isEditing)
  const type = selectedQuestion?.attributes?.type

  const { handleSubmit, handleCancel } = useEventHandlers(selectedQuestion, selectedQuestionId, isEditing)
  
  if (!selectedQuestion || !type) {
    return <></>
  }

  return (
    <Formik
      validationSchema={renderFormValidationSchema(selectedQuestion)}
      initialValues={{ ...fields[type], ...removeEmpty(selectedQuestion) }}
      onSubmit={handleSubmit}
    >
      <FormDisplay
        selectedQuestion={selectedQuestion}
        selectedQuestionId={selectedQuestionId}
        type={type}
        order={order}
        isEditing={isEditing}
        handleCancel={handleCancel}
      />
    </Formik>
  );
};

// ---- SUB COMPONENTS

interface FormDisplayProps {
  selectedQuestion: QuestionRedux
  selectedQuestionId: string
  type: Enum_Question_Type
  order: string[]
  isEditing: boolean
  handleCancel: () => void
}

function FormDisplay({
  selectedQuestion,
  selectedQuestionId,
  type,
  order,
  isEditing,
  handleCancel,
}: FormDisplayProps): JSX.Element {
  const dispatch = useAppDispatch()
  const currentConditions = useAppSelector(selectors.conditions.selectSelectedQuestionsConditions)
  const {
    setFieldValue,
    values,
    isSubmitting,
    isValid,
    errors
  } = useFormikContext<Question | Record<string, unknown>>()

  if (Object.keys(errors).length > 0) console.error('The form contains errors', errors)

  const { createCondition, editCondition } = useConditionActions(selectedQuestionId)

  const handleDelete = useCallback(() => {
    dispatch(setIsRemoving(selectedQuestionId));
    dispatch(appActions.toogleDrawer());
  }, [dispatch, selectedQuestionId])

  useEffect(() => {
    const newChanges = getDiff(values, selectedQuestion)
    if (values) {
      dispatch(actions.updateQuestion({
        id: selectedQuestionId,
        changes: {
          id: selectedQuestionId,
          attributes: { ...newChanges },
        },
      }))
    }
  // `selectedQuestion` is updated by the dispatch, so we can't have it in the deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedQuestionId, values])

  return (
    <Form className="h-[100vh] flex flex-col">
      <div className="flex-grow overflow-auto text-3xl px-5">
        <Flex alignItems="center" justifyContent="space-between" w="100%" mt="5">
          <Tooltip placement="bottom" label={getQuestionInfo(type)}>
            <Box display="flex" alignItems="center">
              <Text variant="baseline" fontWeight="bold" textAlign="left" _hover={{ cursor: "pointer" }}>
                {isEditing ? "Edition" : "Création"} d&apos;une {getQuestionName(type)}
              </Text>
              <InfoIcon color="gray.300" ml="4" mt="-2" w="3" h="3" _hover={{ cursor: "pointer" }} />
            </Box>
          </Tooltip>

          <Flex ml={2} alignItems="center">
            <InputIcon type={type} />

            <Text variant="xsMedium" ml="3">
              {order?.findIndex((id: string) => id === selectedQuestionId) + 1}
            </Text>
          </Flex>
        </Flex>

        <TitleDivider title="Paramètres de la question" mt="3" />

        {type !== "wysiwyg" && (
          <Box w="100%" m="0 auto" border="1px solid #F7F7F7F7" p="5" backgroundColor="#fdfdfdf1">
            <>
              <Textarea
                isCollapsed={false}
                rows={Enum_Question_Rows.Medium}
                label="Label"
                placeholder="Renseigner le label de votre question"
                id="label"
                isRequired
              />

              <Input
                isCollapsed={false}
                label="Id dans la base de donnée"
                placeholder="Renseigner le nom interne de votre question"
                name="internal_title"
                helpText="Ce champ vous permet de donner un titre à la question, il n'est pas visible par les utilisateurs."
                isRequired="false"
                isAccordion
              />
            </>

            <Flex mb="4" mt="4" w="100%" justifyContent="space-between">
              {currentConditions.length === 0 ? (
                <Button
                  variant="roundedTransparent"
                  size="sm"
                  onClick={createCondition}
                >
                  {t.add_condition}
                </Button>
              ) : (
                <Button
                  variant="roundedTransparent"
                  size="sm"
                  onClick={() => editCondition(currentConditions[0].id)}
                >
                  {t.edit_condition}
                </Button>
              )}

              <Button
                ml="5"
                size="sm"
                variant={values?.required ? "rounded" : "roundedTransparent"}
                onClick={() => setFieldValue("required", !values.required)}
              >
                {values?.required ? "Rendre la réponse facultative" : "Rendre la réponse obligatoire"}
              </Button>
            </Flex>
          </Box>
        )}

        <Box w="100%" mb="50px">
          {renderFormTemplate(selectedQuestion)}
        </Box>
      </div>

      <Footer
        onSubmit={noop}
        disabled={!isValid || isSubmitting}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </Form>
  );
}

// ---- HOOKS

/**
 * Build the callbacks to handle form submission and cancel
 * @returns Functions to handle form submission and cancel
 */
// TODO: Not sure how the selectedQuestionId is guaranteed from the selector and not from the question itself...
// So we keep them both as parameters for now
function useEventHandlers(selectedQuestion: QuestionRedux | undefined, selectedQuestionId: string, isEditing: boolean) {
  const dispatch = useAppDispatch()
  const [prevState, setPrevState] = useState<QuestionRedux | undefined>(selectedQuestion)

  // Effect to save state to get diff
  useEffect(() => {
    setPrevState(prevState)
  // We ignore prevState to avoid infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuestionId])

  // Submit callback
  const handleSubmit = useCallback((data: any, { setSubmitting, validateForm }: any) => {
    validateForm(data)
    setSubmitting(true)
    dispatch(actions.saveQuestion({ changes: data }))
    setSubmitting(false)
  }, [dispatch])

  // Cancel callback
  const handleCancel = useCallback(async () => {
    if (!isEditing) {
      dispatch(actions.deleteQuestion(selectedQuestionId));
    } else {
      dispatch(appActions.toogleDrawer());
      if (prevState)
        dispatch(
          actions.updateQuestion({
            id: selectedQuestionId,
            changes: {
              ...prevState,
            },
          })
        );
    }
    dispatch(formBuilderAction.setIsEditing(false));
    dispatch(actions.setSelectedQuestion(""));
  }, [dispatch, isEditing, prevState, selectedQuestionId])

  return {
    handleSubmit,
    handleCancel,
  }
}

/**
 * Build the callbacks to create and edit conditions
 * @returns Functions to create and edit conditions
 */
function useConditionActions(selectedQuestionId: string) {
  const dispatch = useAppDispatch()

  const createCondition = useCallback(() => {
    dispatch(
      actions.createCondition({
        type: "question",
        refererId: selectedQuestionId,
      })
    );
    dispatch(appActions.toogleDrawer());
  }, [dispatch, selectedQuestionId])

  const editCondition = useCallback((id: string) => {
    dispatch(actions.setSelectedCondition(id));
    dispatch(actions.setValidityCondition(true));
    dispatch(appActions.toogleDrawer());
  }, [dispatch])

  return {
    createCondition,
    editCondition,
  }
}