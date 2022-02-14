import React from "react";

import { Container, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { QuestionRedux } from "redux/slices/types";
import { ConditionRedux } from "redux/slices/types";
import { authorizedQuestionTypes } from "./utils";
import { t } from "static/input";
import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { selectors, actions } from "redux/slices/scientistData";

interface Props {
  selectedCondition: ConditionRedux;
  updateStep: (d: any) => void;
}

export const Step_1: React.FC<Props> = ({ selectedCondition, updateStep }) => {
  const dispatch = useAppDispatch();
  const selectedQuestion = useAppSelector(selectors.questions.getSelectedQuestion);
  const questions = useAppSelector(selectors.questions.getSelectedPageQuestions);
  const pages = useAppSelector(selectors.pages.getPages);
  const order = useAppSelector(selectors.survey.getOrder);
  const isTypePage = selectedCondition?.attributes?.type === "page";

  React.useEffect(() => {
    // Select first page if we make a condition on page.
    if (isTypePage && pages.length > 0) {
      dispatch(actions.setSelectedPage(pages[0].id));
    }
  }, [isTypePage]);

  const referId = isTypePage
    ? selectedCondition?.attributes?.referer_page?.data?.id
    : selectedCondition?.attributes.referer_question?.data?.id;
  const currentInputIndex = order.findIndex((id: string) => id === referId);

  const questionsBeforeCurrent = order.slice(0, currentInputIndex);

  // Remove all types who can't be conditionable,
  const conditionableQuestions = questions
    .filter((q: QuestionRedux) => {
      const type = q?.attributes?.type;
      if (type) authorizedQuestionTypes.includes(type);
    })
    .filter((q: QuestionRedux) => q.id !== selectedQuestion?.id);

  if (!isTypePage) {
    // Si selectedCondition.type === "page" alors on affiche les inputs des pages précédantes.
    // Si selectedCondition.type === "input" alors on affiche les inputs précédants l'input referent
    conditionableQuestions
      .filter((q: QuestionRedux) => questionsBeforeCurrent?.includes(q.id))
      .filter((q: QuestionRedux) => q.id !== selectedQuestion?.id);
    conditionableQuestions;
  }

  const isEmpty = conditionableQuestions?.length === 0;
  const renderCard = (question: QuestionRedux) => {
    const isSelected = question.id === selectedCondition?.attributes.target?.data?.id;

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
        const current = conditionableQuestions?.find((c: QuestionRedux) => c.id === inputId);
        if (current !== undefined) {
          return renderCard(current);
        } else return;
      })}
    </Container>
  );
};
