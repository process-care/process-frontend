import React from "react";

import { Container, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import IQuestion from "types/form/question";
import ICondition from "types/form/condition";
import { authorizedInputTypes } from "./utils";
import { t } from "static/input";
import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { useGetQuestions } from "call/actions/formBuider/question";
import { useUpdateCondition } from "call/actions/formBuider/condition";
import { useGetSurvey } from "call/actions/survey";
import { selectPage } from "redux/slices/formBuilder";
import { useParams } from "react-router-dom";

interface Props {
  currentCondition: ICondition | undefined;
}

export const Step_1: React.FC<Props> = ({ currentCondition }) => {
  const dispatch = useAppDispatch();
  // FIXME: Yup, these ignore are bad, need to be removed
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { slug: surveyId } = useParams();
  const { mutateAsync: updateCondition } = useUpdateCondition();
  const { selected_input, selected_page } = useAppSelector(
    (state) => state.formBuilder
  );
  const { data } = useGetQuestions(selected_page.id);

  const { data: survey } = useGetSurvey(surveyId);

  React.useEffect(() => {
    // Select first page if we make a condition on page.
    if (currentCondition?.type === "page" && survey?.survey.pages[0]) {
      dispatch(selectPage(survey?.survey.pages[0]));
    }
  }, [currentCondition?.type]);

  // Si currentCondition.type === "page" alors on affiche les inputs des pages précédantes.
  // Si currentCondition.type === "input" alors on affiche les inputs précédants l'input referent
  const inputOrder = survey?.survey?.order;
  const currentInputIndex = inputOrder?.findIndex(
    (id: string) => id === currentCondition?.referer_question?.id
  );
  const inputsBeforeCurrent = inputOrder?.slice(0, currentInputIndex);
  // Remove all types who can't be conditionable, remove the selected input, remove input after the selected one.
  const authorizedInputs = data?.questions
    .filter((q: IQuestion) => authorizedInputTypes.includes(q.type))
    .filter((q: IQuestion) => q.id !== selected_input.id);

  if (currentCondition?.type === "question") {
    authorizedInputs?.filter((q: IQuestion) =>
      inputsBeforeCurrent?.includes(q.id)
    );
    authorizedInputs;
  }

  const isEmpty = authorizedInputs?.length === 0;

  const renderCard = (input: IQuestion) => {
    const isSelected = input.id === currentCondition?.target?.id;
    return (
      <InputBox
        key={input.id}
        isSelected={isSelected}
        input={input}
        onClick={() =>
          updateCondition({
            id: currentCondition?.id,
            data: {
              target: input.id,
            },
          })
        }
      />
    );
  };

  return (
    <Container w="100%" maxW="unset" p={0}>
      {!isEmpty && (
        <Text textAlign="center" variant="xs" mt={5} color="brand.gray.200">
          {t.help}
        </Text>
      )}
      {isEmpty && (
        <Text mt={10} variant="xs">
          {t.no_results}
        </Text>
      )}

      {inputOrder?.map((inputId: string) => {
        const current = authorizedInputs?.find(
          (c: IQuestion) => c.id === inputId
        );
        if (current !== undefined) {
          return renderCard(current);
        } else return;
      })}
    </Container>
  );
};
