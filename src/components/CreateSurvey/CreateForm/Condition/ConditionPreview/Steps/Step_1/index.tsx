import React from "react";

import { Container, Text } from "@chakra-ui/react";
import { useAppSelector } from "redux/hooks";

import IQuestion from "types/form/question";
import ICondition from "types/form/condition";
import { authorizedQuestionTypes } from "./utils";
import { t } from "static/input";
import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { selectors as selectorsQuestion } from "redux/slices/formEditor/question-editor";
import { selectors as selectorsSurvey } from "redux/slices/formEditor/selected-survey";

interface Props {
  selectedCondition: ICondition;
  updateStep: (d: any) => void;
}

export const Step_1: React.FC<Props> = ({ selectedCondition, updateStep }) => {
  const selectedQuestion = useAppSelector(
    selectorsQuestion.getSelectedQuestion
  );
  const questions = useAppSelector(selectorsQuestion.getSelectedPageQuestions);
  const order = useAppSelector(selectorsSurvey.getOrder);

  // TODO: check this logic

  // React.useEffect(() => {
  //   // Select first page if we make a condition on page.
  //   if (selectedCondition.type === "page" && survey?.survey.pages[0]) {
  //     dispatch(selectPage(survey?.survey.pages[0]));
  //   }
  // }, [selectedCondition.type]);

  // Si selectedCondition.type === "page" alors on affiche les inputs des pages précédantes.
  // Si selectedCondition.type === "input" alors on affiche les inputs précédants l'input referent

  const currentInputIndex = order.findIndex(
    (id: string) => id === selectedCondition.referer_question?.id
  );
  const questionsBeforeCurrent = order.slice(0, currentInputIndex);
  // Remove all types who can't be conditionable, remove the selected input, remove input after the selected one.
  const conditionableQuestions = questions
    .filter((q: IQuestion) => authorizedQuestionTypes.includes(q.type))
    .filter((q: IQuestion) => q.id !== selectedQuestion.id);

  if (selectedCondition?.type === "question") {
    conditionableQuestions?.filter((q: IQuestion) =>
      questionsBeforeCurrent?.includes(q.id)
    );
    conditionableQuestions;
  }

  const isEmpty = conditionableQuestions?.length === 0;

  const renderCard = (question: IQuestion) => {
    const isSelected = question.id === selectedCondition.target?.id;
    return (
      <InputBox
        key={question.id}
        isSelected={isSelected}
        input={question}
        onClick={() => updateStep({ target: question })}
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

      {order.map((inputId: string) => {
        const current = conditionableQuestions?.find(
          (c: IQuestion) => c.id === inputId
        );
        if (current !== undefined) {
          return renderCard(current);
        } else return;
      })}
    </Container>
  );
};
