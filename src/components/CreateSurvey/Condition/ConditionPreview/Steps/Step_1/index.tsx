import React from "react";

import { Container, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  selectInputsInCurrentPage,
  updateCondition,
} from "redux/slices/formBuilder";
import IQuestion from "interfaces/form/question";
import ICondition from "interfaces/form/condition";
import { authorizedInputTypes } from "./utils";
import { t } from "static/input";
import { InputBox } from "components/CreateSurvey/InputsPreview/InputBox";
import { getInputById, getInputIndex } from "utils/formBuilder/input";

interface Props {
  selectedCondition: ICondition;
}

export const Step_1: React.FC<Props> = ({ selectedCondition }) => {
  const { selected_input, input_order } = useAppSelector(
    (state) => state.formBuilder
  );

  const inputs = useAppSelector(selectInputsInCurrentPage);
  const dispatch = useAppDispatch();
  const currentInputIndex = getInputIndex(selectedCondition.referer_id);
  const inputsBeforeCurrent = input_order.slice(0, currentInputIndex);


  // Remove all types who can't be conditionable, remove the selected input, remove input after the selected one.
  const authorizedInputs = inputs
    .filter((i) => authorizedInputTypes.includes(i.input_type))
    .filter((i) => i.id !== selected_input.id)
    .filter((i) => i.id && inputsBeforeCurrent.includes(i.id))



  const isEmpty = authorizedInputs.length === 0;
  const renderCard = (input: IQuestion) => {
    const target_question = getInputById(selectedCondition.target_id)
    const isSelected = input.id === target_question?.id;
    return (
      <InputBox
        isSelected={isSelected}
        input={input}
        onClick={() =>
          dispatch(
            updateCondition({
              id: selectedCondition.id,
              data: {
                target_id: input.id,
              },
            })
          )
        }
      />
    );
  };

  return (
    <Container w="100%" maxW="unset" p={0}>

      {isEmpty && <Text variant="xs">{t.no_results}</Text>}
      <Text textAlign="left" variant="xs" mt={-5} color="brand.gray.200">
        {t.help}
      </Text>
      {input_order.map((inputId) => {
        const current = authorizedInputs.find(c => c.id === inputId)
        if (current !== undefined) {
          return renderCard(current)
        } else return

      })}

    </Container>
  );
};
