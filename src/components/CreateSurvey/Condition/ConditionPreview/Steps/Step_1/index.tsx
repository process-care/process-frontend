import React from "react";

import { Container, Text } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  getInputsOrder,
  selectInputsInCurrentPage,
  updateCondition,
} from "redux/slices/formBuilder";
import IInput from "interfaces/form/input";
import ICondition from "interfaces/form/condition";
import { authorizedInputTypes } from "./utils";
import { t } from "static/input";
import { InputBox } from "components/CreateSurvey/InputsPreview/InputBox";
import { getInputIndex } from "utils/formBuilder/input";

interface Props {
  selectedCondition: ICondition;
}

export const Step_1: React.FC<Props> = ({ selectedCondition }) => {
  const { selected_page, selected_input } = useAppSelector(
    (state) => state.formBuilder
  );
  const inputsOrder = useAppSelector(getInputsOrder);
  const inputs = useAppSelector(selectInputsInCurrentPage);
  const dispatch = useAppDispatch();
  const currentInputIndex = getInputIndex(selectedCondition.referer_entity_id);
  const inputsBeforeCurrent = inputsOrder.slice(0, currentInputIndex);

  // Remove all types who can't be conditionable, remove the selected input, remove input after the selected one.
  const authorizedInputs = inputs
    .filter((i) => i.id && inputsBeforeCurrent.includes(i.id))
    .filter((i) => authorizedInputTypes.includes(i.input_type))
    .filter((i) => i.id !== selected_input.id);

  const isEmpty = authorizedInputs.length === 0;
  const renderCard = (input: IInput) => {
    const isSelected = input.id === selectedCondition.selected_question?.id;
    return (
      <InputBox
        isSelected={isSelected}
        input={input}
        onClick={() =>
          dispatch(
            updateCondition({
              id: selectedCondition.id,
              data: {
                selected_question: input,
              },
            })
          )
        }
      />
    );
  };

  return (
    <Container w="90%" maxW="unset">
      <Text fontSize="14px" mt={5} mb={10} textTransform="uppercase">
        {selected_page.name} - Condition vue
      </Text>
      {isEmpty && <Text variant="xs">{t.no_results}</Text>}
      <Text textAlign="left" variant="current" color="brand.gray.200">
        {t.help}
      </Text>

      {authorizedInputs.map((input) => renderCard(input))}
    </Container>
  );
};
