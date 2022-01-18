import React from "react";

import { Container, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import IQuestion from "types/form/question";
import ICondition from "types/form/condition";
import { authorizedQuestionTypes } from "./utils";
import { t } from "static/input";
import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { selectors, actions } from "redux/slices/scientistData";

interface Props {
  selectedCondition: ICondition;
  updateStep: (d: any) => void;
}

export const Step_1: React.FC<Props> = ({ selectedCondition, updateStep }) => {
  const dispatch = useAppDispatch();
  const selectedQuestion = useAppSelector(
    selectors.questions.getSelectedQuestion
  );
  const questions = useAppSelector(
    selectors.questions.getSelectedPageQuestions
  );
  const pages = useAppSelector(selectors.pages.getAllPages);
  const order = useAppSelector(selectors.survey.getOrder);
  const isTypePage = selectedCondition.type === "page";

  React.useEffect(() => {
    // Select first page if we make a condition on page.
    if (isTypePage && pages.length > 0) {
      dispatch(actions.setSelectedPage(pages[0].id));
    }
  }, [isTypePage]);

  const referId = isTypePage
    ? selectedCondition.referer_page?.id
    : selectedCondition.referer_question?.id;
  const currentInputIndex = order.findIndex((id: string) => id === referId);

  const questionsBeforeCurrent = order.slice(0, currentInputIndex);

  // Remove all types who can't be conditionable,
  const conditionableQuestions = questions
    .filter((q: IQuestion) => authorizedQuestionTypes.includes(q.type))
    .filter((q: IQuestion) => q.id !== selectedQuestion?.id);

  if (!isTypePage) {
    // Si selectedCondition.type === "page" alors on affiche les inputs des pages précédantes.
    // Si selectedCondition.type === "input" alors on affiche les inputs précédants l'input referent
    conditionableQuestions
      .filter((q: IQuestion) => questionsBeforeCurrent?.includes(q.id))
      .filter((q: IQuestion) => q.id !== selectedQuestion?.id);
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
